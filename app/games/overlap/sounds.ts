/**
 * Synthesised sound effects for Overlap and Overlap Hard, built with the Web
 * Audio API so there are no audio files to load. The mute setting is shared by
 * both games and saved in localStorage; read it with `useMuted()`.
 */

import { useCallback, useSyncExternalStore } from 'react';

const MUTE_KEY = 'overlap-muted-v1';

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // Browsers start the context suspended until a user gesture; every sound
  // here is triggered by a click, so resuming is allowed
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface Note {
  freq: number;
  /** Seconds after the sound starts */
  at?: number;
  duration?: number;
  type?: OscillatorType;
  volume?: number;
  /** Glide to this frequency over the note (for the wrong-guess "bwomp") */
  slideTo?: number;
}

function play(notes: Note[]) {
  if (isMuted()) return;
  const ac = audio();
  if (!ac) return;
  const start = ac.currentTime + 0.01;
  for (const { freq, at = 0, duration = 0.15, type = 'sine', volume = 0.18, slideTo } of notes) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const t = start + at;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
    // Quick attack, smooth exponential decay — avoids clicks
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }
}

// C major pentatonic, from C5 — each extra selected word steps up a note
const SELECT_SCALE = [523.25, 587.33, 659.25, 783.99, 880.0];

export const sounds = {
  /** Selecting the nth word (1-based); pitch rises with each selection */
  select(count: number) {
    const freq = SELECT_SCALE[Math.min(Math.max(count, 1), SELECT_SCALE.length) - 1];
    play([{ freq, duration: 0.12, type: 'triangle', volume: 0.16 }]);
  },
  /** Found a category: bright rising major arpeggio */
  correct() {
    play([
      { freq: 659.25, at: 0, duration: 0.14, type: 'triangle' },
      { freq: 783.99, at: 0.08, duration: 0.14, type: 'triangle' },
      { freq: 1046.5, at: 0.16, duration: 0.28, type: 'triangle' },
    ]);
  },
  /** Wrong guess: low, falling, slightly buzzy */
  wrong() {
    play([
      { freq: 220, at: 0, duration: 0.18, type: 'square', volume: 0.06, slideTo: 196 },
      { freq: 185, at: 0.16, duration: 0.3, type: 'square', volume: 0.06, slideTo: 146.83 },
    ]);
  },
  /** Guessed a red herring: two bubbly "blub"s gliding upward — fishy, not buzzy */
  herring() {
    play([
      { freq: 260, at: 0, duration: 0.11, type: 'sine', volume: 0.22, slideTo: 520 },
      { freq: 330, at: 0.12, duration: 0.13, type: 'sine', volume: 0.22, slideTo: 700 },
    ]);
  },
  /** Puzzle complete: short fanfare finishing on a held chord */
  win() {
    play([
      { freq: 523.25, at: 0, duration: 0.14, type: 'triangle' },
      { freq: 659.25, at: 0.1, duration: 0.14, type: 'triangle' },
      { freq: 783.99, at: 0.2, duration: 0.14, type: 'triangle' },
      { freq: 1046.5, at: 0.3, duration: 0.7, type: 'triangle', volume: 0.16 },
      { freq: 783.99, at: 0.3, duration: 0.7, type: 'sine', volume: 0.1 },
      { freq: 1318.51, at: 0.3, duration: 0.7, type: 'sine', volume: 0.08 },
    ]);
  },
};

/* ---------- Mute setting ---------- */

const muteListeners = new Set<() => void>();
// Fallback when localStorage is unavailable, so muting still works this visit
let memoryMuted = false;

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return memoryMuted;
  }
}

function isMuted(): boolean {
  return typeof window === 'undefined' ? true : readMuted();
}

function subscribeMuted(cb: () => void) {
  muteListeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    muteListeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

export function useMuted(): [boolean, () => void] {
  const muted = useSyncExternalStore(subscribeMuted, readMuted, () => false);
  const toggle = useCallback(() => {
    const next = !readMuted();
    memoryMuted = next;
    try {
      localStorage.setItem(MUTE_KEY, next ? '1' : '0');
    } catch {
      // Storage unavailable — memoryMuted covers this visit
    }
    muteListeners.forEach(l => l());
  }, []);
  return [muted, toggle];
}
