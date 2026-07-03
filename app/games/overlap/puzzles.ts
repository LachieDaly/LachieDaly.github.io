export interface OverlapCategory {
  name: string;
  /** The two words unique to this category — the puzzle's wildcard completes it */
  words: [string, string];
}

export interface OverlapPuzzle {
  id: number;
  /** The one word that belongs to all four categories */
  wildcard: string;
  categories: [OverlapCategory, OverlapCategory, OverlapCategory, OverlapCategory];
}

export const PUZZLES: OverlapPuzzle[] = [
  {
    id: 1,
    wildcard: 'BAT',
    categories: [
      { name: 'Nocturnal animals', words: ['OWL', 'POSSUM'] },
      { name: 'Cricket equipment', words: ['STUMPS', 'PADS'] },
      { name: '___MAN superheroes', words: ['AQUA', 'SUPER'] },
      { name: 'Things you swing', words: ['RACKET', 'CLUB'] },
    ],
  },
  {
    id: 2,
    wildcard: 'SPRING',
    categories: [
      { name: 'Seasons', words: ['SUMMER', 'AUTUMN'] },
      { name: 'Ways to jump', words: ['LEAP', 'VAULT'] },
      { name: 'Water sources', words: ['WELL', 'GEYSER'] },
      { name: 'Trampoline parts', words: ['FRAME', 'MAT'] },
    ],
  },
  {
    id: 3,
    wildcard: 'KEY',
    categories: [
      { name: 'Piano parts', words: ['PEDAL', 'STRING'] },
      { name: 'Small low islands', words: ['ATOLL', 'ISLET'] },
      { name: 'Synonyms for essential', words: ['VITAL', 'CRUCIAL'] },
      { name: 'Music theory terms', words: ['CLEF', 'CHORD'] },
    ],
  },
  {
    id: 4,
    wildcard: 'PITCH',
    categories: [
      { name: 'Sports playing surfaces', words: ['COURT', 'RINK'] },
      { name: 'Properties of sound', words: ['VOLUME', 'TIMBRE'] },
      { name: 'Sales presentation words', words: ['DEMO', 'PROPOSAL'] },
      { name: 'Dark sticky substances', words: ['TAR', 'ASPHALT'] },
    ],
  },
  {
    id: 5,
    wildcard: 'RING',
    categories: [
      { name: 'Jewellery', words: ['NECKLACE', 'BRACELET'] },
      { name: 'Circus sights', words: ['TRAPEZE', 'CLOWN'] },
      { name: 'Phone alerts', words: ['BUZZ', 'CHIME'] },
      { name: 'Combat sport venues', words: ['OCTAGON', 'ARENA'] },
    ],
  },
  {
    id: 6,
    wildcard: 'STAR',
    categories: [
      { name: 'Objects in space', words: ['COMET', 'NEBULA'] },
      { name: 'Words for a celebrity', words: ['ICON', 'CELEB'] },
      { name: 'Shapes', words: ['HEXAGON', 'OVAL'] },
      { name: '___FISH', words: ['JELLY', 'SWORD'] },
    ],
  },
  {
    id: 7,
    wildcard: 'JACK',
    categories: [
      { name: 'Playing cards', words: ['ACE', 'TEN'] },
      { name: 'Tyre-change equipment', words: ['WRENCH', 'SPARE'] },
      { name: '___POT', words: ['TEA', 'CRACK'] },
      { name: 'Nursery rhyme characters', words: ['JILL', 'HUMPTY'] },
    ],
  },
  {
    id: 8,
    wildcard: 'BOLT',
    categories: [
      { name: 'Hardware fasteners', words: ['SCREW', 'NUT'] },
      { name: 'Storm phenomena', words: ['THUNDER', 'HAIL'] },
      { name: 'Disney animated dogs', words: ['PLUTO', 'LADY'] },
      { name: 'Words meaning to run away', words: ['FLEE', 'DASH'] },
    ],
  },
  {
    id: 9,
    wildcard: 'CROWN',
    categories: [
      { name: 'Royal regalia', words: ['SCEPTRE', 'THRONE'] },
      { name: 'Parts of a tooth', words: ['ENAMEL', 'DENTIN'] },
      { name: 'Parts of a tree', words: ['TRUNK', 'BRANCH'] },
      { name: 'Old British coins', words: ['SHILLING', 'FARTHING'] },
    ],
  },
  {
    id: 10,
    wildcard: 'PALM',
    categories: [
      { name: 'Trees', words: ['WILLOW', 'BIRCH'] },
      { name: 'Parts of the hand', words: ['THUMB', 'KNUCKLE'] },
      { name: 'Things fortune tellers read', words: ['TAROT', 'RUNES'] },
      { name: '___ OIL', words: ['CRUDE', 'CASTOR'] },
    ],
  },
  {
    id: 11,
    wildcard: 'MATCH',
    categories: [
      { name: 'Fire starters', words: ['FLINT', 'LIGHTER'] },
      { name: 'Tennis scoring units', words: ['SET', 'GAME'] },
      { name: '___BOX', words: ['SAND', 'LUNCH'] },
      { name: 'Words for an equal', words: ['PEER', 'RIVAL'] },
    ],
  },
  {
    id: 12,
    wildcard: 'SEAL',
    categories: [
      { name: 'Marine mammals', words: ['WALRUS', 'OTTER'] },
      { name: 'Marks of authenticity', words: ['STAMP', 'SIGNATURE'] },
      { name: 'One-name singers', words: ['ADELE', 'PRINCE'] },
      { name: 'Words meaning to close tightly', words: ['SHUT', 'PLUG'] },
    ],
  },
  {
    id: 13,
    wildcard: 'DATE',
    categories: [
      { name: 'Calendar units', words: ['MONTH', 'YEAR'] },
      { name: 'Dried fruits', words: ['FIG', 'RAISIN'] },
      { name: '___ NIGHT', words: ['MOVIE', 'TRIVIA'] },
      { name: 'Passport details', words: ['PHOTO', 'VISA'] },
    ],
  },
  {
    id: 14,
    wildcard: 'BARK',
    categories: [
      { name: 'Dog vocalisations', words: ['WOOF', 'HOWL'] },
      { name: 'Parts of a tree', words: ['ROOT', 'TWIG'] },
      { name: 'Old sailing vessels', words: ['SLOOP', 'SCHOONER'] },
      { name: 'Ways to shout', words: ['YELL', 'HOLLER'] },
    ],
  },
  {
    id: 15,
    wildcard: 'LIGHT',
    categories: [
      { name: 'Synonyms for not heavy', words: ['AIRY', 'WEIGHTLESS'] },
      { name: 'Beer styles', words: ['LAGER', 'STOUT'] },
      { name: '___HOUSE', words: ['FARM', 'GREEN'] },
      { name: '___ YEAR', words: ['LEAP', 'GAP'] },
    ],
  },
  {
    id: 16,
    wildcard: 'MOUSE',
    categories: [
      { name: 'Computer peripherals', words: ['KEYBOARD', 'MONITOR'] },
      { name: 'Pet rodents', words: ['HAMSTER', 'GERBIL'] },
      { name: '___TRAP', words: ['BOOBY', 'TOURIST'] },
      { name: '___PAD', words: ['LAUNCH', 'LILY'] },
    ],
  },
  {
    id: 17,
    wildcard: 'CHECK',
    categories: [
      { name: 'Chess terms', words: ['CASTLE', 'GAMBIT'] },
      { name: 'Words for a restaurant bill', words: ['TAB', 'INVOICE'] },
      { name: 'Fabric patterns', words: ['STRIPE', 'PAISLEY'] },
      { name: 'Words meaning to verify', words: ['INSPECT', 'AUDIT'] },
    ],
  },
  {
    id: 18,
    wildcard: 'SCALE',
    categories: [
      { name: 'Parts of a fish', words: ['FIN', 'GILL'] },
      { name: 'Measuring instruments', words: ['RULER', 'THERMOMETER'] },
      { name: "Musician's practice exercises", words: ['ARPEGGIO', 'ETUDE'] },
      { name: 'Words meaning to climb', words: ['ASCEND', 'CLAMBER'] },
    ],
  },
  {
    id: 19,
    wildcard: 'BASS',
    categories: [
      { name: 'Freshwater fish', words: ['TROUT', 'PERCH'] },
      { name: 'String instruments', words: ['CELLO', 'VIOLA'] },
      { name: 'Choir voice parts', words: ['TENOR', 'ALTO'] },
      { name: 'Drum kit components', words: ['SNARE', 'CYMBAL'] },
    ],
  },
  {
    id: 20,
    wildcard: 'POUND',
    categories: [
      { name: 'Currencies', words: ['EURO', 'YEN'] },
      { name: 'Units of weight', words: ['OUNCE', 'TON'] },
      { name: 'Words meaning to hit hard', words: ['THUMP', 'BASH'] },
      { name: 'Where stray dogs are kept', words: ['KENNEL', 'SHELTER'] },
    ],
  },
];
