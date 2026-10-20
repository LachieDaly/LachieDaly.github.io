'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#f43f5e', '#facc15'];
const PIECES = 160;
const DURATION_MS = 3500;

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  wobble: number;
}

/**
 * A one-shot burst of confetti from both bottom corners. Mount it when the
 * puzzle is won; it draws on a fixed, click-through canvas and clears itself.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const g = canvas.getContext('2d');
    if (!g) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const pieces: Piece[] = Array.from({ length: PIECES }, (_, i) => {
      const fromLeft = i % 2 === 0;
      // Fire up and inwards from each bottom corner
      const angle = (fromLeft ? -60 : -120) * (Math.PI / 180) + (Math.random() - 0.5) * 0.7;
      const speed = (0.9 + Math.random() * 0.7) * Math.min(h, 900) * 0.022;
      return {
        x: fromLeft ? 0 : w,
        y: h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        wobble: Math.random() * Math.PI * 2,
      };
    });

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      g.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // Fade everything out over the last second
      g.globalAlpha = Math.max(0, Math.min(1, (DURATION_MS - elapsed) / 1000));
      for (const p of pieces) {
        p.vy += 0.25; // gravity
        p.vx *= 0.99; // air drag
        p.vy *= 0.99;
        p.wobble += 0.1;
        p.x += p.vx + Math.sin(p.wobble) * 0.6;
        p.y += p.vy;
        p.rotation += p.spin;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.rotation);
        g.fillStyle = p.color;
        // Squash the height with the wobble so pieces look like they're flipping
        g.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.wobble)));
        g.restore();
      }
      if (elapsed < DURATION_MS) frame = requestAnimationFrame(tick);
      else g.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
    />
  );
}
