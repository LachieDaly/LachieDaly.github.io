import type { Difficulty } from './scoring';

export interface OverlapCategory {
  name: string;
  /** 1 (easiest, yellow) to 4 (hardest, purple) — each puzzle uses each level once */
  difficulty: Difficulty;
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
      { name: 'Nocturnal animals', difficulty: 2, words: ['OWL', 'POSSUM'] },
      { name: 'Cricket equipment', difficulty: 1, words: ['STUMPS', 'PADS'] },
      { name: '___MAN superheroes', difficulty: 4, words: ['AQUA', 'SUPER'] },
      { name: 'Things you swing', difficulty: 3, words: ['RACKET', 'CLUB'] },
    ],
  },
  {
    id: 2,
    wildcard: 'SPRING',
    categories: [
      { name: 'Seasons', difficulty: 1, words: ['SUMMER', 'AUTUMN'] },
      { name: 'Ways to jump', difficulty: 2, words: ['LEAP', 'VAULT'] },
      { name: 'Water sources', difficulty: 3, words: ['WELL', 'GEYSER'] },
      { name: 'Trampoline parts', difficulty: 4, words: ['FRAME', 'MAT'] },
    ],
  },
  {
    id: 3,
    wildcard: 'KEY',
    categories: [
      { name: 'Piano parts', difficulty: 1, words: ['PEDAL', 'STRING'] },
      { name: 'Small low islands', difficulty: 4, words: ['ATOLL', 'ISLET'] },
      { name: 'Synonyms for essential', difficulty: 2, words: ['VITAL', 'CRUCIAL'] },
      { name: 'Music theory terms', difficulty: 3, words: ['CLEF', 'CHORD'] },
    ],
  },
  {
    id: 4,
    wildcard: 'PITCH',
    categories: [
      { name: 'Sports playing surfaces', difficulty: 1, words: ['COURT', 'RINK'] },
      { name: 'Properties of sound', difficulty: 3, words: ['VOLUME', 'TIMBRE'] },
      { name: 'Sales presentation words', difficulty: 4, words: ['DEMO', 'PROPOSAL'] },
      { name: 'Dark sticky substances', difficulty: 2, words: ['TAR', 'ASPHALT'] },
    ],
  },
  {
    id: 5,
    wildcard: 'RING',
    categories: [
      { name: 'Jewellery', difficulty: 1, words: ['NECKLACE', 'BRACELET'] },
      { name: 'Circus sights', difficulty: 2, words: ['TRAPEZE', 'CLOWN'] },
      { name: 'Phone alerts', difficulty: 3, words: ['BUZZ', 'CHIME'] },
      { name: 'Combat sport venues', difficulty: 4, words: ['OCTAGON', 'ARENA'] },
    ],
  },
  {
    id: 6,
    wildcard: 'STAR',
    categories: [
      { name: 'Objects in space', difficulty: 1, words: ['COMET', 'NEBULA'] },
      { name: 'Words for a celebrity', difficulty: 2, words: ['ICON', 'CELEB'] },
      { name: 'Shapes', difficulty: 3, words: ['HEXAGON', 'OVAL'] },
      { name: '___FISH', difficulty: 4, words: ['JELLY', 'SWORD'] },
    ],
  },
  {
    id: 7,
    wildcard: 'JACK',
    categories: [
      { name: 'Playing cards', difficulty: 1, words: ['ACE', 'TEN'] },
      { name: 'Tyre-change equipment', difficulty: 2, words: ['WRENCH', 'SPARE'] },
      { name: '___POT', difficulty: 4, words: ['TEA', 'CRACK'] },
      { name: 'Nursery rhyme characters', difficulty: 3, words: ['JILL', 'HUMPTY'] },
    ],
  },
  {
    id: 8,
    wildcard: 'BOLT',
    categories: [
      { name: 'Hardware fasteners', difficulty: 1, words: ['SCREW', 'NUT'] },
      { name: 'Storm phenomena', difficulty: 2, words: ['THUNDER', 'HAIL'] },
      { name: 'Disney animated dogs', difficulty: 4, words: ['PLUTO', 'LADY'] },
      { name: 'Words meaning to run away', difficulty: 3, words: ['FLEE', 'DASH'] },
    ],
  },
  {
    id: 9,
    wildcard: 'CROWN',
    categories: [
      { name: 'Royal regalia', difficulty: 1, words: ['SCEPTRE', 'THRONE'] },
      { name: 'Parts of a tooth', difficulty: 3, words: ['ENAMEL', 'DENTIN'] },
      { name: 'Parts of a tree', difficulty: 2, words: ['TRUNK', 'BRANCH'] },
      { name: 'Old British coins', difficulty: 4, words: ['SHILLING', 'FARTHING'] },
    ],
  },
  {
    id: 10,
    wildcard: 'PALM',
    categories: [
      { name: 'Trees', difficulty: 1, words: ['WILLOW', 'BIRCH'] },
      { name: 'Parts of the hand', difficulty: 2, words: ['THUMB', 'KNUCKLE'] },
      { name: 'Things fortune tellers read', difficulty: 3, words: ['TAROT', 'RUNES'] },
      { name: '___ OIL', difficulty: 4, words: ['CRUDE', 'CASTOR'] },
    ],
  },
  {
    id: 11,
    wildcard: 'MATCH',
    categories: [
      { name: 'Fire starters', difficulty: 1, words: ['FLINT', 'LIGHTER'] },
      { name: 'Tennis scoring units', difficulty: 2, words: ['SET', 'GAME'] },
      { name: '___BOX', difficulty: 4, words: ['SAND', 'LUNCH'] },
      { name: 'Words for an equal', difficulty: 3, words: ['PEER', 'RIVAL'] },
    ],
  },
  {
    id: 12,
    wildcard: 'SEAL',
    categories: [
      { name: 'Marine mammals', difficulty: 1, words: ['WALRUS', 'OTTER'] },
      { name: 'Marks of authenticity', difficulty: 3, words: ['STAMP', 'SIGNATURE'] },
      { name: 'One-name singers', difficulty: 4, words: ['ADELE', 'PRINCE'] },
      { name: 'Words meaning to close tightly', difficulty: 2, words: ['SHUT', 'PLUG'] },
    ],
  },
  {
    id: 13,
    wildcard: 'DATE',
    categories: [
      { name: 'Calendar units', difficulty: 1, words: ['MONTH', 'YEAR'] },
      { name: 'Dried fruits', difficulty: 2, words: ['FIG', 'RAISIN'] },
      { name: '___ NIGHT', difficulty: 4, words: ['MOVIE', 'TRIVIA'] },
      { name: 'Passport details', difficulty: 3, words: ['PHOTO', 'VISA'] },
    ],
  },
  {
    id: 14,
    wildcard: 'BARK',
    categories: [
      { name: 'Dog vocalisations', difficulty: 1, words: ['WOOF', 'HOWL'] },
      { name: 'Parts of a tree', difficulty: 2, words: ['ROOT', 'TWIG'] },
      { name: 'Old sailing vessels', difficulty: 4, words: ['SLOOP', 'SCHOONER'] },
      { name: 'Ways to shout', difficulty: 3, words: ['YELL', 'HOLLER'] },
    ],
  },
  {
    id: 15,
    wildcard: 'LIGHT',
    categories: [
      { name: 'Synonyms for not heavy', difficulty: 1, words: ['AIRY', 'WEIGHTLESS'] },
      { name: 'Beer styles', difficulty: 2, words: ['LAGER', 'STOUT'] },
      { name: '___HOUSE', difficulty: 3, words: ['FARM', 'GREEN'] },
      { name: '___ YEAR', difficulty: 4, words: ['LEAP', 'GAP'] },
    ],
  },
  {
    id: 16,
    wildcard: 'MOUSE',
    categories: [
      { name: 'Computer peripherals', difficulty: 1, words: ['KEYBOARD', 'MONITOR'] },
      { name: 'Pet rodents', difficulty: 2, words: ['HAMSTER', 'GERBIL'] },
      { name: '___TRAP', difficulty: 3, words: ['BOOBY', 'TOURIST'] },
      { name: '___PAD', difficulty: 4, words: ['LAUNCH', 'LILY'] },
    ],
  },
  {
    id: 17,
    wildcard: 'CHECK',
    categories: [
      { name: 'Chess terms', difficulty: 1, words: ['CASTLE', 'GAMBIT'] },
      { name: 'Words for a restaurant bill', difficulty: 4, words: ['TAB', 'INVOICE'] },
      { name: 'Fabric patterns', difficulty: 2, words: ['STRIPE', 'PAISLEY'] },
      { name: 'Words meaning to verify', difficulty: 3, words: ['INSPECT', 'AUDIT'] },
    ],
  },
  {
    id: 18,
    wildcard: 'SCALE',
    categories: [
      { name: 'Parts of a fish', difficulty: 1, words: ['FIN', 'GILL'] },
      { name: 'Measuring instruments', difficulty: 2, words: ['RULER', 'THERMOMETER'] },
      { name: "Musician's practice exercises", difficulty: 4, words: ['ARPEGGIO', 'ETUDE'] },
      { name: 'Words meaning to climb', difficulty: 3, words: ['ASCEND', 'CLAMBER'] },
    ],
  },
  {
    id: 19,
    wildcard: 'BASS',
    categories: [
      { name: 'Freshwater fish', difficulty: 1, words: ['TROUT', 'PERCH'] },
      { name: 'String instruments', difficulty: 2, words: ['CELLO', 'VIOLA'] },
      { name: 'Choir voice parts', difficulty: 3, words: ['TENOR', 'ALTO'] },
      { name: 'Drum kit components', difficulty: 4, words: ['SNARE', 'CYMBAL'] },
    ],
  },
  {
    id: 20,
    wildcard: 'POUND',
    categories: [
      { name: 'Currencies', difficulty: 1, words: ['EURO', 'YEN'] },
      { name: 'Units of weight', difficulty: 2, words: ['OUNCE', 'TON'] },
      { name: 'Words meaning to hit hard', difficulty: 3, words: ['THUMP', 'BASH'] },
      { name: 'Where stray dogs are kept', difficulty: 4, words: ['KENNEL', 'SHELTER'] },
    ],
  },
  {
    id: 21,
    wildcard: 'FAN',
    categories: [
      { name: 'Supporters', difficulty: 2, words: ['ADMIRER', 'DEVOTEE'] },
      { name: 'Things with spinning blades', difficulty: 1, words: ['BLENDER', 'PROPELLER'] },
      { name: '___ CLUB', difficulty: 4, words: ['GOLF', 'BOOK'] },
      { name: 'Ceiling fixtures', difficulty: 3, words: ['CHANDELIER', 'SKYLIGHT'] },
    ],
  },
  {
    id: 22,
    wildcard: 'SHELL',
    categories: [
      { name: 'Beach finds', difficulty: 1, words: ['DRIFTWOOD', 'SEAWEED'] },
      { name: 'Petrol station brands', difficulty: 4, words: ['CALTEX', 'AMPOL'] },
      { name: 'Pasta shapes', difficulty: 2, words: ['PENNE', 'FUSILLI'] },
      { name: 'Protective outer layers', difficulty: 3, words: ['HUSK', 'RIND'] },
    ],
  },
  {
    id: 23,
    wildcard: 'BRIDGE',
    categories: [
      { name: 'Card games', difficulty: 2, words: ['POKER', 'RUMMY'] },
      { name: 'Parts of the nose', difficulty: 3, words: ['NOSTRIL', 'SEPTUM'] },
      { name: 'Ways to cross a river', difficulty: 4, words: ['FERRY', 'FORD'] },
      { name: 'Parts of a ship', difficulty: 1, words: ['HULL', 'KEEL'] },
    ],
  },
  {
    id: 24,
    wildcard: 'BOX',
    categories: [
      { name: 'Olympic combat sports, as verbs', difficulty: 4, words: ['WRESTLE', 'FENCE'] },
      { name: 'Containers', difficulty: 1, words: ['CRATE', 'CARTON'] },
      { name: '___ OFFICE', difficulty: 3, words: ['POST', 'HEAD'] },
      { name: 'Theatre seating areas', difficulty: 2, words: ['STALLS', 'BALCONY'] },
    ],
  },
  {
    id: 25,
    wildcard: 'CAP',
    categories: [
      { name: 'Hats', difficulty: 1, words: ['BERET', 'FEDORA'] },
      { name: 'Things that close a bottle', difficulty: 2, words: ['CORK', 'STOPPER'] },
      { name: 'Upper limits', difficulty: 3, words: ['CEILING', 'MAXIMUM'] },
      { name: 'Parts of a mushroom', difficulty: 4, words: ['STEM', 'GILL'] },
    ],
  },
  {
    id: 26,
    wildcard: 'CRANE',
    categories: [
      { name: 'Wading birds', difficulty: 1, words: ['HERON', 'STORK'] },
      { name: 'Construction machinery', difficulty: 2, words: ['BULLDOZER', 'EXCAVATOR'] },
      { name: 'Ways to strain to see', difficulty: 3, words: ['PEER', 'SQUINT'] },
      { name: 'Frasier characters', difficulty: 4, words: ['NILES', 'DAPHNE'] },
    ],
  },
  {
    id: 27,
    wildcard: 'DECK',
    categories: [
      { name: 'Parts of a ship', difficulty: 1, words: ['MAST', 'HULL'] },
      { name: 'Words meaning to knock down', difficulty: 3, words: ['FLOOR', 'TOPPLE'] },
      { name: 'Backyard features', difficulty: 2, words: ['PATIO', 'PERGOLA'] },
      { name: 'Things you shuffle', difficulty: 4, words: ['PLAYLIST', 'FEET'] },
    ],
  },
  {
    id: 28,
    wildcard: 'DIAMOND',
    categories: [
      { name: 'Gemstones', difficulty: 1, words: ['RUBY', 'EMERALD'] },
      { name: 'Card suits', difficulty: 2, words: ['CLUB', 'SPADE'] },
      { name: 'Four-sided shapes', difficulty: 3, words: ['SQUARE', 'TRAPEZIUM'] },
      { name: 'Baseball terms', difficulty: 4, words: ['BUNT', 'INNING'] },
    ],
  },
  {
    id: 29,
    wildcard: 'DRILL',
    categories: [
      { name: 'Power tools', difficulty: 1, words: ['SANDER', 'JIGSAW'] },
      { name: 'Rap subgenres', difficulty: 4, words: ['TRAP', 'GRIME'] },
      { name: "Dentist's tools", difficulty: 2, words: ['MIRROR', 'PROBE'] },
      { name: 'Parade-ground routines', difficulty: 3, words: ['MARCH', 'SALUTE'] },
    ],
  },
  {
    id: 30,
    wildcard: 'FLY',
    categories: [
      { name: 'Insects', difficulty: 1, words: ['GNAT', 'WASP'] },
      { name: 'Ways to travel', difficulty: 2, words: ['SAIL', 'DRIVE'] },
      { name: 'Fishing gear', difficulty: 3, words: ['REEL', 'SINKER'] },
      { name: 'Parts of trousers', difficulty: 4, words: ['POCKET', 'CUFF'] },
    ],
  },
  {
    id: 31,
    wildcard: 'FORK',
    categories: [
      { name: 'Cutlery', difficulty: 1, words: ['SPOON', 'KNIFE'] },
      { name: 'Road features', difficulty: 3, words: ['ROUNDABOUT', 'OVERPASS'] },
      { name: 'Garden tools', difficulty: 2, words: ['RAKE', 'HOE'] },
      { name: 'Bicycle parts', difficulty: 4, words: ['PEDAL', 'CHAIN'] },
    ],
  },
  {
    id: 32,
    wildcard: 'FRAME',
    categories: [
      { name: 'Snooker terms', difficulty: 4, words: ['CUE', 'CUSHION'] },
      { name: 'Parts of glasses', difficulty: 1, words: ['LENS', 'HINGE'] },
      { name: 'Words for body shape', difficulty: 2, words: ['BUILD', 'FIGURE'] },
      { name: 'Units of film', difficulty: 3, words: ['SCENE', 'TAKE'] },
    ],
  },
  {
    id: 33,
    wildcard: 'GRILL',
    categories: [
      { name: 'Cooking methods', difficulty: 1, words: ['ROAST', 'STEAM'] },
      { name: 'Words meaning to interrogate', difficulty: 2, words: ['QUESTION', 'QUIZ'] },
      { name: 'MIXED ___', difficulty: 4, words: ['BAG', 'DOUBLES'] },
      { name: 'Types of eatery', difficulty: 3, words: ['BISTRO', 'DINER'] },
    ],
  },
  {
    id: 34,
    wildcard: 'HAND',
    categories: [
      { name: 'Parts of a clock', difficulty: 1, words: ['FACE', 'PENDULUM'] },
      { name: 'Card game terms', difficulty: 3, words: ['TRUMP', 'TRICK'] },
      { name: 'Old units of length', difficulty: 4, words: ['FATHOM', 'FURLONG'] },
      { name: 'Words for a worker', difficulty: 2, words: ['LABOURER', 'STAFFER'] },
    ],
  },
  {
    id: 35,
    wildcard: 'HEART',
    categories: [
      { name: 'Organs', difficulty: 1, words: ['LIVER', 'KIDNEY'] },
      { name: 'Words for courage', difficulty: 4, words: ['VALOUR', 'PLUCK'] },
      { name: "Valentine's Day symbols", difficulty: 2, words: ['ROSE', 'CUPID'] },
      { name: 'Words for the centre', difficulty: 3, words: ['CORE', 'HUB'] },
    ],
  },
  {
    id: 36,
    wildcard: 'IRON',
    categories: [
      { name: 'Metals', difficulty: 1, words: ['COPPER', 'ZINC'] },
      { name: 'Golf clubs', difficulty: 2, words: ['DRIVER', 'PUTTER'] },
      { name: 'Laundry items', difficulty: 3, words: ['PEG', 'HAMPER'] },
      { name: '___ AGE', difficulty: 4, words: ['STONE', 'ICE'] },
    ],
  },
  {
    id: 37,
    wildcard: 'JAM',
    categories: [
      { name: 'Toast toppings', difficulty: 1, words: ['VEGEMITE', 'HONEY'] },
      { name: 'Traffic problems', difficulty: 2, words: ['GRIDLOCK', 'CONGESTION'] },
      { name: 'Things bands do', difficulty: 3, words: ['REHEARSE', 'TOUR'] },
      { name: 'Words for a tricky situation', difficulty: 4, words: ['FIX', 'BIND'] },
    ],
  },
  {
    id: 38,
    wildcard: 'LEAD',
    categories: [
      { name: 'Dog-walking gear', difficulty: 1, words: ['COLLAR', 'HARNESS'] },
      { name: 'Toxic elements', difficulty: 2, words: ['ARSENIC', 'MERCURY'] },
      { name: 'Words meaning to guide', difficulty: 3, words: ['STEER', 'DIRECT'] },
      { name: 'Types of acting role', difficulty: 4, words: ['EXTRA', 'CAMEO'] },
    ],
  },
  {
    id: 39,
    wildcard: 'LOG',
    categories: [
      { name: 'Campfire words', difficulty: 1, words: ['KINDLING', 'EMBER'] },
      { name: 'Records you keep', difficulty: 2, words: ['DIARY', 'JOURNAL'] },
      { name: 'Maths functions', difficulty: 3, words: ['SINE', 'TANGENT'] },
      { name: '___ IN', difficulty: 4, words: ['SIGN', 'CHECK'] },
    ],
  },
  {
    id: 40,
    wildcard: 'MOLE',
    categories: [
      { name: 'Burrowing animals', difficulty: 1, words: ['WOMBAT', 'BADGER'] },
      { name: 'Marks on the skin', difficulty: 2, words: ['FRECKLE', 'BIRTHMARK'] },
      { name: 'Words for a spy', difficulty: 3, words: ['AGENT', 'SPOOK'] },
      { name: 'SI base units', difficulty: 4, words: ['KELVIN', 'AMPERE'] },
    ],
  },
  {
    id: 41,
    wildcard: 'NAIL',
    categories: [
      { name: 'Things you hammer', difficulty: 1, words: ['TACK', 'STAKE'] },
      { name: 'Parts of a finger', difficulty: 2, words: ['KNUCKLE', 'CUTICLE'] },
      { name: 'Words meaning to do perfectly', difficulty: 4, words: ['ACE', 'CRUSH'] },
      { name: '___ POLISH', difficulty: 3, words: ['FRENCH', 'SHOE'] },
    ],
  },
  {
    id: 42,
    wildcard: 'PAGE',
    categories: [
      { name: 'Parts of a book', difficulty: 1, words: ['SPINE', 'CHAPTER'] },
      { name: 'Medieval ranks', difficulty: 2, words: ['KNIGHT', 'SQUIRE'] },
      { name: 'Ways to contact someone', difficulty: 3, words: ['CALL', 'TEXT'] },
      { name: 'Led Zeppelin surnames', difficulty: 4, words: ['PLANT', 'BONHAM'] },
    ],
  },
  {
    id: 43,
    wildcard: 'PAN',
    categories: [
      { name: 'Cookware', difficulty: 1, words: ['WOK', 'STOCKPOT'] },
      { name: 'Camera moves', difficulty: 3, words: ['ZOOM', 'TILT'] },
      { name: 'PETER ___', difficulty: 2, words: ['RABBIT', 'PARKER'] },
      { name: 'Words meaning to criticise harshly', difficulty: 4, words: ['SLAM', 'ROAST'] },
    ],
  },
  {
    id: 44,
    wildcard: 'PEN',
    categories: [
      { name: 'Writing tools', difficulty: 1, words: ['QUILL', 'MARKER'] },
      { name: 'Animal enclosures', difficulty: 2, words: ['STY', 'PADDOCK'] },
      { name: 'Female animals', difficulty: 4, words: ['MARE', 'VIXEN'] },
      { name: 'Words meaning to write', difficulty: 3, words: ['COMPOSE', 'SCRIBBLE'] },
    ],
  },
  {
    id: 45,
    wildcard: 'PIPE',
    categories: [
      { name: 'Plumbing parts', difficulty: 1, words: ['TAP', 'VALVE'] },
      { name: 'Things you smoke', difficulty: 2, words: ['CIGAR', 'HOOKAH'] },
      { name: 'Wind instruments', difficulty: 3, words: ['FLUTE', 'OBOE'] },
      { name: 'Keyboard symbols', difficulty: 4, words: ['TILDE', 'CARET'] },
    ],
  },
  {
    id: 46,
    wildcard: 'PLATE',
    categories: [
      { name: 'Crockery', difficulty: 1, words: ['BOWL', 'SAUCER'] },
      { name: 'Earth science terms', difficulty: 3, words: ['FAULT', 'MAGMA'] },
      { name: 'HOME ___', difficulty: 4, words: ['RUN', 'WORK'] },
      { name: 'Things on the back of a car', difficulty: 2, words: ['BUMPER', 'TOWBAR'] },
    ],
  },
  {
    id: 47,
    wildcard: 'POOL',
    categories: [
      { name: 'Cue sports', difficulty: 1, words: ['SNOOKER', 'BILLIARDS'] },
      { name: 'Bodies of water', difficulty: 2, words: ['POND', 'LAGOON'] },
      { name: 'Words meaning to combine', difficulty: 3, words: ['MERGE', 'BLEND'] },
      { name: '___ PARTY', difficulty: 4, words: ['HEN', 'BLOCK'] },
    ],
  },
  {
    id: 48,
    wildcard: 'POP',
    categories: [
      { name: 'Music genres', difficulty: 1, words: ['JAZZ', 'FOLK'] },
      { name: 'Fizzy drinks', difficulty: 2, words: ['SODA', 'COLA'] },
      { name: 'Words for Dad', difficulty: 3, words: ['PAPA', 'DADDY'] },
      { name: 'Rice Bubbles mascots', difficulty: 4, words: ['SNAP', 'CRACKLE'] },
    ],
  },
  {
    id: 49,
    wildcard: 'PUNCH',
    categories: [
      { name: 'Party drinks', difficulty: 2, words: ['SANGRIA', 'EGGNOG'] },
      { name: 'Boxing moves', difficulty: 1, words: ['JAB', 'UPPERCUT'] },
      { name: 'Office equipment', difficulty: 3, words: ['STAPLER', 'GUILLOTINE'] },
      { name: '___LINE', difficulty: 4, words: ['DEAD', 'HEAD'] },
    ],
  },
  {
    id: 50,
    wildcard: 'QUEEN',
    categories: [
      { name: 'Chess pieces', difficulty: 1, words: ['ROOK', 'BISHOP'] },
      { name: 'British rock bands', difficulty: 2, words: ['OASIS', 'BLUR'] },
      { name: 'Roles in a bee colony', difficulty: 3, words: ['DRONE', 'WORKER'] },
      { name: 'Bed sizes', difficulty: 4, words: ['SINGLE', 'DOUBLE'] },
    ],
  },
  {
    id: 51,
    wildcard: 'ROCK',
    categories: [
      { name: 'Words meaning to sway', difficulty: 4, words: ['SWAY', 'WOBBLE'] },
      { name: 'Stones', difficulty: 1, words: ['PEBBLE', 'BOULDER'] },
      { name: 'Hand game choices', difficulty: 2, words: ['PAPER', 'SCISSORS'] },
      { name: 'Music genres', difficulty: 3, words: ['REGGAE', 'GRUNGE'] },
    ],
  },
  {
    id: 52,
    wildcard: 'ROOT',
    categories: [
      { name: 'Parts of a plant', difficulty: 1, words: ['STEM', 'LEAF'] },
      { name: 'Maths terms', difficulty: 2, words: ['POWER', 'FACTOR'] },
      { name: 'Words meaning to support a team', difficulty: 4, words: ['CHEER', 'BARRACK'] },
      { name: 'Words for an origin', difficulty: 3, words: ['SOURCE', 'GENESIS'] },
    ],
  },
  {
    id: 53,
    wildcard: 'SHOT',
    categories: [
      { name: 'Drink measures', difficulty: 1, words: ['PINT', 'NIP'] },
      { name: 'Words for an attempt', difficulty: 4, words: ['STAB', 'CRACK'] },
      { name: 'Words for a photo', difficulty: 2, words: ['SNAP', 'PIC'] },
      { name: 'Words for an injection', difficulty: 3, words: ['JAB', 'BOOSTER'] },
    ],
  },
  {
    id: 54,
    wildcard: 'SINK',
    categories: [
      { name: 'Bathroom fixtures', difficulty: 1, words: ['TOILET', 'BATHTUB'] },
      { name: 'Ways to score in basketball', difficulty: 2, words: ['DUNK', 'LAYUP'] },
      { name: 'HEAT ___', difficulty: 4, words: ['WAVE', 'STROKE'] },
      { name: 'Words meaning to fall', difficulty: 3, words: ['PLUMMET', 'SLUMP'] },
    ],
  },
  {
    id: 55,
    wildcard: 'SOLE',
    categories: [
      { name: 'Flatfish', difficulty: 3, words: ['FLOUNDER', 'HALIBUT'] },
      { name: 'Parts of a shoe', difficulty: 1, words: ['LACE', 'TONGUE'] },
      { name: 'Words meaning only one', difficulty: 4, words: ['LONE', 'SINGLE'] },
      { name: 'Parts of the foot', difficulty: 2, words: ['ARCH', 'ANKLE'] },
    ],
  },
  {
    id: 56,
    wildcard: 'STAMP',
    categories: [
      { name: 'Things on an envelope', difficulty: 1, words: ['ADDRESS', 'POSTCODE'] },
      { name: 'Ways to walk heavily', difficulty: 2, words: ['STOMP', 'TRUDGE'] },
      { name: 'RUBBER ___', difficulty: 4, words: ['BAND', 'GLOVE'] },
      { name: 'Ways to put out a fire', difficulty: 3, words: ['DOUSE', 'SMOTHER'] },
    ],
  },
  {
    id: 57,
    wildcard: 'STRIKE',
    categories: [
      { name: 'Bowling terms', difficulty: 1, words: ['SPARE', 'GUTTER'] },
      { name: 'Forms of protest', difficulty: 2, words: ['PICKET', 'BOYCOTT'] },
      { name: 'Words meaning to hit', difficulty: 3, words: ['SWAT', 'CLOBBER'] },
      { name: 'LUCKY ___', difficulty: 4, words: ['DIP', 'CHARM'] },
    ],
  },
  {
    id: 58,
    wildcard: 'SUIT',
    categories: [
      { name: 'Formal wear', difficulty: 1, words: ['TUXEDO', 'BLAZER'] },
      { name: 'Court proceedings', difficulty: 2, words: ['TRIAL', 'APPEAL'] },
      { name: 'Words meaning to look good on', difficulty: 4, words: ['BEFIT', 'FLATTER'] },
      { name: 'SPACE ___', difficulty: 3, words: ['SHUTTLE', 'STATION'] },
    ],
  },
  {
    id: 59,
    wildcard: 'TABLE',
    categories: [
      { name: 'Furniture', difficulty: 1, words: ['DESK', 'SOFA'] },
      { name: 'Ways to present data', difficulty: 2, words: ['CHART', 'GRAPH'] },
      { name: 'ROUND ___', difficulty: 4, words: ['TRIP', 'ROBIN'] },
      { name: 'Flat-topped landforms', difficulty: 3, words: ['PLATEAU', 'MESA'] },
    ],
  },
  {
    id: 60,
    wildcard: 'TANK',
    categories: [
      { name: 'Military vehicles', difficulty: 1, words: ['JEEP', 'HUMVEE'] },
      { name: 'Water containers', difficulty: 2, words: ['CISTERN', 'BARREL'] },
      { name: 'Words meaning to fail', difficulty: 3, words: ['FLOP', 'FIZZLE'] },
      { name: '___TOP', difficulty: 4, words: ['LAP', 'ROOF'] },
    ],
  },
  {
    id: 61,
    wildcard: 'TIE',
    categories: [
      { name: 'Neckwear', difficulty: 1, words: ['SCARF', 'CRAVAT'] },
      { name: 'Words for a draw', difficulty: 2, words: ['STALEMATE', 'DEADLOCK'] },
      { name: 'Ways to fasten', difficulty: 3, words: ['BUCKLE', 'ZIP'] },
      { name: 'Words for a connection', difficulty: 4, words: ['BOND', 'LINK'] },
    ],
  },
  {
    id: 62,
    wildcard: 'TRACK',
    categories: [
      { name: 'Words for a song', difficulty: 2, words: ['TUNE', 'DITTY'] },
      { name: 'Racing venues', difficulty: 1, words: ['CIRCUIT', 'VELODROME'] },
      { name: 'Words meaning to follow', difficulty: 3, words: ['TRAIL', 'STALK'] },
      { name: 'Parts of a railway', difficulty: 4, words: ['SLEEPER', 'SIGNAL'] },
    ],
  },
  {
    id: 63,
    wildcard: 'TURKEY',
    categories: [
      { name: 'Poultry', difficulty: 1, words: ['DUCK', 'GOOSE'] },
      { name: 'Countries on the Black Sea', difficulty: 2, words: ['GEORGIA', 'ROMANIA'] },
      { name: 'Ten-pin bowling terms', difficulty: 4, words: ['LANE', 'SPLIT'] },
      { name: 'Words for a flop', difficulty: 3, words: ['DUD', 'LEMON'] },
    ],
  },
  {
    id: 64,
    wildcard: 'WAVE',
    categories: [
      { name: 'Ocean movements', difficulty: 1, words: ['TIDE', 'CURRENT'] },
      { name: 'Greetings', difficulty: 2, words: ['NOD', 'HANDSHAKE'] },
      { name: 'Hairstyles', difficulty: 3, words: ['BOB', 'PERM'] },
      { name: 'Things a stadium crowd does', difficulty: 4, words: ['CHANT', 'HECKLE'] },
    ],
  },
  {
    id: 65,
    wildcard: 'WING',
    categories: [
      { name: 'Parts of a bird', difficulty: 1, words: ['BEAK', 'TALON'] },
      { name: 'Parts of an aeroplane', difficulty: 2, words: ['FUSELAGE', 'RUDDER'] },
      { name: 'Parts of a hospital', difficulty: 3, words: ['WARD', 'THEATRE'] },
      { name: 'Rugby positions', difficulty: 4, words: ['HOOKER', 'FULLBACK'] },
    ],
  },
  {
    id: 66,
    wildcard: 'YARD',
    categories: [
      { name: 'Units of length', difficulty: 1, words: ['INCH', 'MILE'] },
      { name: 'Outdoor spaces at home', difficulty: 2, words: ['LAWN', 'PATIO'] },
      { name: 'SHIP___', difficulty: 4, words: ['WRECK', 'MATE'] },
      { name: 'JUNK ___', difficulty: 3, words: ['FOOD', 'MAIL'] },
    ],
  },
  {
    id: 67,
    wildcard: 'CHIP',
    categories: [
      { name: 'Potato sides', difficulty: 1, words: ['MASH', 'WEDGE'] },
      { name: 'Computer components', difficulty: 2, words: ['MOTHERBOARD', 'SSD'] },
      { name: 'Golf shots', difficulty: 3, words: ['DRIVE', 'PUTT'] },
      { name: 'Minor damage', difficulty: 4, words: ['DENT', 'SCRATCH'] },
    ],
  },
  {
    id: 68,
    wildcard: 'DUCK',
    categories: [
      { name: 'Water birds', difficulty: 1, words: ['SWAN', 'PELICAN'] },
      { name: 'Cricket terms', difficulty: 3, words: ['WICKET', 'OVER'] },
      { name: 'Words meaning to avoid', difficulty: 2, words: ['DODGE', 'EVADE'] },
      { name: 'Chinese restaurant dishes', difficulty: 4, words: ['CHOW MEIN', 'WONTON'] },
    ],
  },
  {
    id: 69,
    wildcard: 'DRUM',
    categories: [
      { name: 'Percussion instruments', difficulty: 1, words: ['TAMBOURINE', 'XYLOPHONE'] },
      { name: 'Large containers', difficulty: 2, words: ['KEG', 'VAT'] },
      { name: 'Parts of the ear', difficulty: 3, words: ['COCHLEA', 'LOBE'] },
      { name: '___ ROLL', difficulty: 4, words: ['EGG', 'SAUSAGE'] },
    ],
  },
  {
    id: 70,
    wildcard: 'FIRE',
    categories: [
      { name: 'Classical elements', difficulty: 1, words: ['WATER', 'EARTH'] },
      { name: 'Words meaning to sack', difficulty: 2, words: ['AXE', 'DISMISS'] },
      { name: '___PLACE', difficulty: 4, words: ['MARKET', 'WORK'] },
      { name: 'Things at a campsite', difficulty: 3, words: ['TENT', 'SWAG'] },
    ],
  },
  {
    id: 71,
    wildcard: 'GOLD',
    categories: [
      { name: 'Olympic medals', difficulty: 1, words: ['SILVER', 'BRONZE'] },
      { name: '___ COAST', difficulty: 4, words: ['SUNSHINE', 'IVORY'] },
      { name: 'Shades of yellow', difficulty: 2, words: ['LEMON', 'MUSTARD'] },
      { name: 'Things that glitter', difficulty: 3, words: ['SEQUIN', 'TINSEL'] },
    ],
  },
  {
    id: 72,
    wildcard: 'GRAVE',
    categories: [
      { name: 'Burial places', difficulty: 1, words: ['TOMB', 'CRYPT'] },
      { name: 'Words meaning serious', difficulty: 2, words: ['SOLEMN', 'SOMBRE'] },
      { name: 'Accent marks', difficulty: 3, words: ['ACUTE', 'UMLAUT'] },
      { name: '___ DIGGER', difficulty: 4, words: ['GOLD', 'TRENCH'] },
    ],
  },
  {
    id: 73,
    wildcard: 'JET',
    categories: [
      { name: 'Aircraft', difficulty: 1, words: ['GLIDER', 'BIPLANE'] },
      { name: 'Shades of black', difficulty: 3, words: ['EBONY', 'RAVEN'] },
      { name: 'Spurts of liquid', difficulty: 2, words: ['SQUIRT', 'GUSH'] },
      { name: '___SET', difficulty: 4, words: ['SUN', 'MIND'] },
    ],
  },
  {
    id: 74,
    wildcard: 'KIT',
    categories: [
      { name: 'Words for a sports uniform', difficulty: 2, words: ['STRIP', 'JERSEY'] },
      { name: 'Baby animals', difficulty: 3, words: ['CUB', 'JOEY'] },
      { name: 'Words for equipment', difficulty: 1, words: ['GEAR', 'TACKLE'] },
      { name: 'TOOL___', difficulty: 4, words: ['BOX', 'BELT'] },
    ],
  },
  {
    id: 75,
    wildcard: 'LINE',
    categories: [
      { name: 'Words for a queue', difficulty: 2, words: ['ROW', 'FILE'] },
      { name: 'Fishing gear', difficulty: 1, words: ['ROD', 'HOOK'] },
      { name: 'Parts of a poem', difficulty: 3, words: ['STANZA', 'VERSE'] },
      { name: 'Words for a wrinkle', difficulty: 4, words: ['CREASE', 'FURROW'] },
    ],
  },
  {
    id: 76,
    wildcard: 'MINT',
    categories: [
      { name: 'Herbs', difficulty: 1, words: ['BASIL', 'OREGANO'] },
      { name: 'Words for flawless', difficulty: 3, words: ['PRISTINE', 'IMMACULATE'] },
      { name: 'Places that handle money', difficulty: 4, words: ['BANK', 'TREASURY'] },
      { name: 'Shades of green', difficulty: 2, words: ['OLIVE', 'JADE'] },
    ],
  },
  {
    id: 77,
    wildcard: 'NOTE',
    categories: [
      { name: 'Things on sheet music', difficulty: 1, words: ['REST', 'STAVE'] },
      { name: 'Forms of payment', difficulty: 2, words: ['COIN', 'CHEQUE'] },
      { name: 'Short messages', difficulty: 3, words: ['MEMO', 'POSTCARD'] },
      { name: 'Words meaning to notice', difficulty: 4, words: ['SPOT', 'CLOCK'] },
    ],
  },
  {
    id: 78,
    wildcard: 'ORGAN',
    categories: [
      { name: 'Keyboard instruments', difficulty: 1, words: ['PIANO', 'HARPSICHORD'] },
      { name: 'Things that can be transplanted', difficulty: 2, words: ['CORNEA', 'KIDNEY'] },
      { name: 'Things in a church', difficulty: 3, words: ['PEW', 'PULPIT'] },
      { name: 'MOUTH ___', difficulty: 4, words: ['WASH', 'GUARD'] },
    ],
  },
  {
    id: 79,
    wildcard: 'PARK',
    categories: [
      { name: 'Green spaces', difficulty: 1, words: ['GARDEN', 'RESERVE'] },
      { name: 'Automatic gear positions', difficulty: 2, words: ['DRIVE', 'NEUTRAL'] },
      { name: 'NATIONAL ___', difficulty: 3, words: ['ANTHEM', 'TREASURE'] },
      { name: 'CAR ___', difficulty: 4, words: ['POOL', 'WASH'] },
    ],
  },
  {
    id: 80,
    wildcard: 'PLANE',
    categories: [
      { name: 'Flying machines', difficulty: 1, words: ['HELICOPTER', 'AIRSHIP'] },
      { name: 'Woodworking tools', difficulty: 2, words: ['CHISEL', 'LATHE'] },
      { name: 'Trees', difficulty: 3, words: ['OAK', 'ELM'] },
      { name: 'Geometry terms', difficulty: 4, words: ['AXIS', 'VERTEX'] },
    ],
  },
  {
    id: 81,
    wildcard: 'BANK',
    categories: [
      { name: 'River features', difficulty: 1, words: ['DELTA', 'MOUTH'] },
      { name: 'Places to store valuables', difficulty: 2, words: ['VAULT', 'SAFE'] },
      { name: 'Aircraft manoeuvres', difficulty: 4, words: ['ROLL', 'LOOP'] },
      { name: '___NOTE', difficulty: 3, words: ['FOOT', 'KEY'] },
    ],
  },
  {
    id: 82,
    wildcard: 'BOW',
    categories: [
      { name: 'Archery equipment', difficulty: 1, words: ['ARROW', 'QUIVER'] },
      { name: 'Respectful gestures', difficulty: 2, words: ['CURTSY', 'SALUTE'] },
      { name: 'Hair accessories', difficulty: 3, words: ['CLIP', 'SCRUNCHIE'] },
      { name: 'Parts of a ship', difficulty: 4, words: ['STERN', 'KEEL'] },
    ],
  },
  {
    id: 83,
    wildcard: 'CLUB',
    categories: [
      { name: 'Card suits', difficulty: 1, words: ['SPADE', 'HEART'] },
      { name: 'Nightlife venues', difficulty: 2, words: ['BAR', 'LOUNGE'] },
      { name: 'Medieval weapons', difficulty: 3, words: ['MACE', 'FLAIL'] },
      { name: 'Sandwiches', difficulty: 4, words: ['REUBEN', 'CUBAN'] },
    ],
  },
  {
    id: 84,
    wildcard: 'COLD',
    categories: [
      { name: 'Illnesses', difficulty: 1, words: ['FLU', 'MUMPS'] },
      { name: 'Wintry adjectives', difficulty: 2, words: ['FROSTY', 'ICY'] },
      { name: 'Unfriendly', difficulty: 3, words: ['ALOOF', 'DISTANT'] },
      { name: '___ CASE', difficulty: 4, words: ['BRIEF', 'BOOK'] },
    ],
  },
  {
    id: 85,
    wildcard: 'COURT',
    categories: [
      { name: 'Win someone over romantically', difficulty: 3, words: ['WOO', 'ROMANCE'] },
      { name: 'Where judgements are made', difficulty: 2, words: ['TRIBUNAL', 'BENCH'] },
      { name: 'FOOD ___', difficulty: 4, words: ['CHAIN', 'TRUCK'] },
      { name: 'Basketball terms', difficulty: 1, words: ['DUNK', 'REBOUND'] },
    ],
  },
  {
    id: 86,
    wildcard: 'CRASH',
    categories: [
      { name: 'Computer problems', difficulty: 1, words: ['FREEZE', 'GLITCH'] },
      { name: 'Collective nouns for animals', difficulty: 4, words: ['PRIDE', 'MURDER'] },
      { name: 'Cymbals', difficulty: 3, words: ['RIDE', 'SPLASH'] },
      { name: 'Stock market falls', difficulty: 2, words: ['SLUMP', 'PLUNGE'] },
    ],
  },
  {
    id: 87,
    wildcard: 'CROSS',
    categories: [
      { name: 'Angry', difficulty: 2, words: ['IRATE', 'MAD'] },
      { name: 'Religious symbols', difficulty: 1, words: ['CRESCENT', 'ANKH'] },
      { name: 'Ways to get over a river', difficulty: 3, words: ['FORD', 'WADE'] },
      { name: 'Soccer deliveries', difficulty: 4, words: ['LOB', 'CHIP'] },
    ],
  },
  {
    id: 88,
    wildcard: 'FAIR',
    categories: [
      { name: 'Even-handed', difficulty: 2, words: ['JUST', 'IMPARTIAL'] },
      { name: 'Events with rides', difficulty: 1, words: ['CARNIVAL', 'FETE'] },
      { name: 'Fine weather', difficulty: 3, words: ['SUNNY', 'CLEAR'] },
      { name: 'Hair colours', difficulty: 4, words: ['BLONDE', 'AUBURN'] },
    ],
  },
  {
    id: 89,
    wildcard: 'FILE',
    categories: [
      { name: 'Smoothing tools', difficulty: 3, words: ['RASP', 'SANDPAPER'] },
      { name: 'Menu bar items', difficulty: 4, words: ['EDIT', 'VIEW'] },
      { name: 'Office organisers', difficulty: 1, words: ['FOLDER', 'BINDER'] },
      { name: 'Ways to submit paperwork', difficulty: 2, words: ['LODGE', 'SUBMIT'] },
    ],
  },
  {
    id: 90,
    wildcard: 'FOOT',
    categories: [
      { name: 'Imperial lengths', difficulty: 1, words: ['INCH', 'MILE'] },
      { name: 'Below the knee', difficulty: 2, words: ['SHIN', 'ANKLE'] },
      { name: '___BALL', difficulty: 3, words: ['BASE', 'NET'] },
      { name: 'Poetry terms', difficulty: 4, words: ['RHYME', 'STANZA'] },
    ],
  },
  {
    id: 91,
    wildcard: 'GLASS',
    categories: [
      { name: 'Drinking vessels', difficulty: 1, words: ['MUG', 'TUMBLER'] },
      { name: '___HOUSE', difficulty: 3, words: ['GREEN', 'LIGHT'] },
      { name: 'Things in a recycling bin', difficulty: 2, words: ['PAPER', 'PLASTIC'] },
      { name: 'Window parts', difficulty: 4, words: ['SILL', 'SASH'] },
    ],
  },
  {
    id: 92,
    wildcard: 'HOOD',
    categories: [
      { name: 'Car body parts', difficulty: 2, words: ['BUMPER', 'FENDER'] },
      { name: 'Head coverings', difficulty: 1, words: ['BEANIE', 'BERET'] },
      { name: 'Jacket features', difficulty: 3, words: ['ZIP', 'CUFF'] },
      { name: 'Your local area', difficulty: 4, words: ['SUBURB', 'BLOCK'] },
    ],
  },
  {
    id: 93,
    wildcard: 'HORN',
    categories: [
      { name: 'Brass instruments', difficulty: 1, words: ['TUBA', 'TRUMPET'] },
      { name: 'Pointy animal features', difficulty: 2, words: ['ANTLER', 'TUSK'] },
      { name: 'Warning sounds', difficulty: 3, words: ['SIREN', 'ALARM'] },
      { name: 'SHOE___', difficulty: 4, words: ['LACE', 'STRING'] },
    ],
  },
  {
    id: 94,
    wildcard: 'IRIS',
    categories: [
      { name: 'Flowers', difficulty: 1, words: ['TULIP', 'DAHLIA'] },
      { name: 'Parts of the eye', difficulty: 2, words: ['PUPIL', 'RETINA'] },
      { name: 'Greek goddesses', difficulty: 3, words: ['HERA', 'ATHENA'] },
      { name: 'Camera parts', difficulty: 4, words: ['SHUTTER', 'FLASH'] },
    ],
  },
  {
    id: 95,
    wildcard: 'KITE',
    categories: [
      { name: 'Birds of prey', difficulty: 1, words: ['HAWK', 'FALCON'] },
      { name: 'Quadrilaterals', difficulty: 2, words: ['RHOMBUS', 'TRAPEZIUM'] },
      { name: '___SURFING', difficulty: 4, words: ['WIND', 'BODY'] },
      { name: 'Things on a string', difficulty: 3, words: ['YOYO', 'PUPPET'] },
    ],
  },
  {
    id: 96,
    wildcard: 'LAP',
    categories: [
      { name: 'Race segments', difficulty: 1, words: ['LEG', 'STAGE'] },
      { name: 'Ways to drink', difficulty: 2, words: ['SIP', 'SLURP'] },
      { name: '___DOG', difficulty: 4, words: ['HOT', 'SEA'] },
      { name: 'What water does at the shore', difficulty: 3, words: ['SPLASH', 'RIPPLE'] },
    ],
  },
  {
    id: 97,
    wildcard: 'LEAF',
    categories: [
      { name: 'Plant parts', difficulty: 1, words: ['STEM', 'ROOT'] },
      { name: 'A piece of paper', difficulty: 3, words: ['FOLIO', 'SHEET'] },
      { name: 'GOLD ___', difficulty: 4, words: ['RUSH', 'MEDAL'] },
      { name: 'Ways to look through a book', difficulty: 2, words: ['BROWSE', 'SKIM'] },
    ],
  },
  {
    id: 98,
    wildcard: 'LOCK',
    categories: [
      { name: 'Strands of hair', difficulty: 3, words: ['CURL', 'TRESS'] },
      { name: 'Rugby positions', difficulty: 4, words: ['PROP', 'HOOKER'] },
      { name: 'Door hardware', difficulty: 1, words: ['HINGE', 'HANDLE'] },
      { name: 'Wrestling holds', difficulty: 2, words: ['NELSON', 'ARMBAR'] },
    ],
  },
  {
    id: 99,
    wildcard: 'MARCH',
    categories: [
      { name: 'Months', difficulty: 1, words: ['APRIL', 'MAY'] },
      { name: 'Ways to walk', difficulty: 2, words: ['STRIDE', 'TRUDGE'] },
      { name: 'Protests', difficulty: 3, words: ['RALLY', 'DEMO'] },
      { name: 'Musical forms', difficulty: 4, words: ['WALTZ', 'NOCTURNE'] },
    ],
  },
  {
    id: 100,
    wildcard: 'MASK',
    categories: [
      { name: 'Diving gear', difficulty: 1, words: ['SNORKEL', 'FLIPPERS'] },
      { name: 'Surgical attire', difficulty: 2, words: ['GOWN', 'GLOVES'] },
      { name: 'Ways to conceal', difficulty: 3, words: ['CLOAK', 'DISGUISE'] },
      { name: 'Skincare products', difficulty: 4, words: ['TONER', 'SERUM'] },
    ],
  },
  {
    id: 101,
    wildcard: 'MERCURY',
    categories: [
      { name: 'Planets', difficulty: 1, words: ['VENUS', 'SATURN'] },
      { name: 'Chemical elements', difficulty: 2, words: ['COBALT', 'ARGON'] },
      { name: 'Roman gods', difficulty: 3, words: ['BACCHUS', 'CUPID'] },
      { name: 'Queen band members', difficulty: 4, words: ['MAY', 'TAYLOR'] },
    ],
  },
  {
    id: 102,
    wildcard: 'MOUTH',
    categories: [
      { name: 'River parts', difficulty: 2, words: ['SOURCE', 'DELTA'] },
      { name: 'Facial features', difficulty: 1, words: ['NOSE', 'CHIN'] },
      { name: 'Openings', difficulty: 3, words: ['HATCH', 'PORTAL'] },
      { name: '___ ORGAN', difficulty: 4, words: ['PIPE', 'BARREL'] },
    ],
  },
  {
    id: 103,
    wildcard: 'NET',
    categories: [
      { name: 'Things in a goalmouth', difficulty: 1, words: ['POST', 'CROSSBAR'] },
      { name: 'Fishing gear', difficulty: 2, words: ['ROD', 'REEL'] },
      { name: 'Accounting terms', difficulty: 3, words: ['GROSS', 'PROFIT'] },
      { name: '___WORK', difficulty: 4, words: ['HOME', 'CLOCK'] },
    ],
  },
  {
    id: 104,
    wildcard: 'ORANGE',
    categories: [
      { name: 'Citrus fruits', difficulty: 1, words: ['MANDARIN', 'GRAPEFRUIT'] },
      { name: 'Colours', difficulty: 2, words: ['TEAL', 'MAROON'] },
      { name: 'Dutch icons', difficulty: 3, words: ['TULIP', 'CLOG'] },
      { name: 'Fanta flavours', difficulty: 4, words: ['GRAPE', 'LEMON'] },
    ],
  },
  {
    id: 105,
    wildcard: 'PATCH',
    categories: [
      { name: 'Sewing repairs', difficulty: 1, words: ['DARN', 'MEND'] },
      { name: 'Pirate attire', difficulty: 3, words: ['CUTLASS', 'TRICORN'] },
      { name: 'Software releases', difficulty: 2, words: ['UPDATE', 'HOTFIX'] },
      { name: 'Gardening spaces', difficulty: 4, words: ['PLOT', 'ALLOTMENT'] },
    ],
  },
  {
    id: 106,
    wildcard: 'PILOT',
    categories: [
      { name: 'Flight crew', difficulty: 1, words: ['NAVIGATOR', 'ATTENDANT'] },
      { name: 'TV episodes', difficulty: 3, words: ['FINALE', 'CROSSOVER'] },
      { name: 'Test runs', difficulty: 2, words: ['TRIAL', 'PROTOTYPE'] },
      { name: 'Ocean fish', difficulty: 4, words: ['REMORA', 'MARLIN'] },
    ],
  },
  {
    id: 107,
    wildcard: 'POST',
    categories: [
      { name: 'Mail', difficulty: 1, words: ['LETTER', 'PARCEL'] },
      { name: 'Fence parts', difficulty: 3, words: ['RAIL', 'PICKET'] },
      { name: 'Social media actions', difficulty: 2, words: ['SHARE', 'TWEET'] },
      { name: 'Things on a soccer goal', difficulty: 4, words: ['CROSSBAR', 'NET'] },
    ],
  },
  {
    id: 108,
    wildcard: 'PRESS',
    categories: [
      { name: 'Gym exercises', difficulty: 2, words: ['SQUAT', 'LUNGE'] },
      { name: 'Ways to smooth clothes', difficulty: 1, words: ['STEAM', 'IRON'] },
      { name: 'Newspaper formats', difficulty: 3, words: ['TABLOID', 'BROADSHEET'] },
      { name: 'Ways to use a button', difficulty: 4, words: ['TAP', 'CLICK'] },
    ],
  },
  {
    id: 109,
    wildcard: 'PRIME',
    categories: [
      { name: 'Types of number', difficulty: 1, words: ['SQUARE', 'ODD'] },
      { name: 'Top quality', difficulty: 2, words: ['CHOICE', 'PREMIUM'] },
      { name: 'Prep before painting', difficulty: 4, words: ['SAND', 'TAPE'] },
      { name: 'Best years', difficulty: 3, words: ['PEAK', 'HEYDAY'] },
    ],
  },
  {
    id: 110,
    wildcard: 'RACKET',
    categories: [
      { name: 'Loud noise', difficulty: 2, words: ['DIN', 'RUCKUS'] },
      { name: 'Cons', difficulty: 3, words: ['SCAM', 'SWINDLE'] },
      { name: 'Badminton gear', difficulty: 1, words: ['SHUTTLECOCK', 'NET'] },
      { name: 'Things that get restrung', difficulty: 4, words: ['GUITAR', 'VIOLIN'] },
    ],
  },
  {
    id: 111,
    wildcard: 'ROBIN',
    categories: [
      { name: 'Small birds', difficulty: 1, words: ['WREN', 'FINCH'] },
      { name: 'Batman characters', difficulty: 2, words: ['JOKER', 'ALFRED'] },
      { name: 'Sherwood Forest characters', difficulty: 3, words: ['TUCK', 'MARIAN'] },
      { name: 'Christmas card images', difficulty: 4, words: ['HOLLY', 'SNOWMAN'] },
    ],
  },
  {
    id: 112,
    wildcard: 'ROLL',
    categories: [
      { name: 'Bakery items', difficulty: 1, words: ['BAGEL', 'CROISSANT'] },
      { name: 'Attendance lists', difficulty: 4, words: ['REGISTER', 'ROSTER'] },
      { name: 'Sushi', difficulty: 2, words: ['NIGIRI', 'SASHIMI'] },
      { name: 'Gymnastics moves', difficulty: 3, words: ['CARTWHEEL', 'HANDSTAND'] },
    ],
  },
  {
    id: 113,
    wildcard: 'SAW',
    categories: [
      { name: 'Sayings', difficulty: 3, words: ['ADAGE', 'MAXIM'] },
      { name: 'Tools', difficulty: 1, words: ['HAMMER', 'SPANNER'] },
      { name: 'Horror franchises', difficulty: 2, words: ['SCREAM', 'HALLOWEEN'] },
      { name: 'Witnessed', difficulty: 4, words: ['SPOTTED', 'OBSERVED'] },
    ],
  },
  {
    id: 114,
    wildcard: 'SCORE',
    categories: [
      { name: 'Number words', difficulty: 3, words: ['DOZEN', 'GROSS'] },
      { name: 'Film music', difficulty: 1, words: ['SOUNDTRACK', 'THEME'] },
      { name: 'Ways to mark a surface', difficulty: 2, words: ['ETCH', 'GOUGE'] },
      { name: 'Ways to get hold of', difficulty: 4, words: ['GET', 'SNAG'] },
    ],
  },
  {
    id: 115,
    wildcard: 'SHED',
    categories: [
      { name: 'Garden structures', difficulty: 1, words: ['GREENHOUSE', 'PERGOLA'] },
      { name: 'Ways to lose skin', difficulty: 2, words: ['MOULT', 'SLOUGH'] },
      { name: '___ LIGHT ON', difficulty: 3, words: ['CAST', 'THROW'] },
      { name: 'COW___', difficulty: 4, words: ['BOY', 'BELL'] },
    ],
  },
  {
    id: 116,
    wildcard: 'SHOOT',
    categories: [
      { name: 'Plant growth', difficulty: 1, words: ['SPROUT', 'BUD'] },
      { name: 'Basketball actions', difficulty: 2, words: ['DRIBBLE', 'PASS'] },
      { name: 'Mild exclamations', difficulty: 4, words: ['DARN', 'RATS'] },
      { name: 'Film-making terms', difficulty: 3, words: ['TAKE', 'SCENE'] },
    ],
  },
  {
    id: 117,
    wildcard: 'SLIP',
    categories: [
      { name: 'Undergarments', difficulty: 2, words: ['PETTICOAT', 'CAMISOLE'] },
      { name: 'Ways to fall', difficulty: 1, words: ['TRIP', 'STUMBLE'] },
      { name: 'Cricket fielding positions', difficulty: 4, words: ['GULLY', 'POINT'] },
      { name: 'Small pieces of paper', difficulty: 3, words: ['RECEIPT', 'COUPON'] },
    ],
  },
  {
    id: 118,
    wildcard: 'SNAP',
    categories: [
      { name: 'Card games', difficulty: 1, words: ['RUMMY', 'PATIENCE'] },
      { name: 'Photos', difficulty: 2, words: ['PIC', 'SELFIE'] },
      { name: 'Ways to break', difficulty: 3, words: ['CRACK', 'SHATTER'] },
      { name: 'Clothing fasteners', difficulty: 4, words: ['BUTTON', 'TOGGLE'] },
    ],
  },
  {
    id: 119,
    wildcard: 'SOCK',
    categories: [
      { name: 'Worn on the feet', difficulty: 1, words: ['SLIPPER', 'STOCKING'] },
      { name: 'Hard hits', difficulty: 2, words: ['WALLOP', 'THUMP'] },
      { name: 'WIND___', difficulty: 4, words: ['MILL', 'SCREEN'] },
      { name: 'Types of puppet', difficulty: 3, words: ['MARIONETTE', 'SHADOW'] },
    ],
  },
  {
    id: 120,
    wildcard: 'SPINE',
    categories: [
      { name: 'Parts of a book', difficulty: 1, words: ['COVER', 'BLURB'] },
      { name: 'Bones', difficulty: 2, words: ['RIB', 'SKULL'] },
      { name: 'Prickly things', difficulty: 3, words: ['THORN', 'QUILL'] },
      { name: 'Courage', difficulty: 4, words: ['NERVE', 'GUTS'] },
    ],
  },
  {
    id: 121,
    wildcard: 'SQUASH',
    categories: [
      { name: 'Racket sports', difficulty: 1, words: ['TENNIS', 'BADMINTON'] },
      { name: 'Vegetables', difficulty: 2, words: ['PUMPKIN', 'ZUCCHINI'] },
      { name: 'Drinks', difficulty: 4, words: ['CORDIAL', 'LEMONADE'] },
      { name: 'Ways to crush', difficulty: 3, words: ['FLATTEN', 'MASH'] },
    ],
  },
  {
    id: 122,
    wildcard: 'STEP',
    categories: [
      { name: 'Staircase parts', difficulty: 1, words: ['TREAD', 'BANISTER'] },
      { name: '___MOTHER', difficulty: 3, words: ['GOD', 'GRAND'] },
      { name: 'Stages of a process', difficulty: 2, words: ['PHASE', 'STAGE'] },
      { name: 'Footfall', difficulty: 4, words: ['STRIDE', 'PACE'] },
    ],
  },
  {
    id: 123,
    wildcard: 'STICK',
    categories: [
      { name: 'Ice hockey gear', difficulty: 1, words: ['PUCK', 'HELMET'] },
      { name: 'Adhere', difficulty: 4, words: ['GLUE', 'CLING'] },
      { name: 'Walking aids', difficulty: 3, words: ['CANE', 'CRUTCH'] },
      { name: 'Things dogs fetch', difficulty: 2, words: ['BALL', 'FRISBEE'] },
    ],
  },
  {
    id: 124,
    wildcard: 'STOCK',
    categories: [
      { name: 'Soup bases', difficulty: 1, words: ['BROTH', 'BOUILLON'] },
      { name: 'Investments', difficulty: 2, words: ['BOND', 'EQUITY'] },
      { name: 'Goods on hand', difficulty: 3, words: ['SUPPLY', 'INVENTORY'] },
      { name: 'Rifle parts', difficulty: 4, words: ['BARREL', 'TRIGGER'] },
    ],
  },
  {
    id: 125,
    wildcard: 'STRAW',
    categories: [
      { name: 'Things in a barn', difficulty: 1, words: ['HAY', 'TROUGH'] },
      { name: 'LAST ___', difficulty: 4, words: ['WORD', 'MINUTE'] },
      { name: 'Drink accessories', difficulty: 2, words: ['COASTER', 'STIRRER'] },
      { name: '___BERRY', difficulty: 3, words: ['BLUE', 'GOOSE'] },
    ],
  },
  {
    id: 126,
    wildcard: 'SWING',
    categories: [
      { name: 'Playground equipment', difficulty: 1, words: ['SLIDE', 'SEESAW'] },
      { name: 'Jazz styles', difficulty: 3, words: ['BEBOP', 'RAGTIME'] },
      { name: 'Golf terms', difficulty: 2, words: ['PUTT', 'DIVOT'] },
      { name: 'Move back and forth', difficulty: 4, words: ['SWAY', 'OSCILLATE'] },
    ],
  },
  {
    id: 127,
    wildcard: 'TAP',
    categories: [
      { name: 'Sink fixtures', difficulty: 1, words: ['PLUG', 'DRAIN'] },
      { name: 'Dance styles', difficulty: 2, words: ['BALLET', 'SALSA'] },
      { name: 'Light touches', difficulty: 3, words: ['PAT', 'DAB'] },
      { name: 'Phone gestures', difficulty: 4, words: ['SWIPE', 'PINCH'] },
    ],
  },
  {
    id: 128,
    wildcard: 'TRAIN',
    categories: [
      { name: 'Rail vehicles', difficulty: 1, words: ['TRAM', 'MONORAIL'] },
      { name: 'Ways to teach', difficulty: 2, words: ['EDUCATE', 'SCHOOL'] },
      { name: 'Wedding dress parts', difficulty: 3, words: ['VEIL', 'BODICE'] },
      { name: 'Ways to point a camera', difficulty: 4, words: ['AIM', 'POINT'] },
    ],
  },
  {
    id: 129,
    wildcard: 'TENDER',
    categories: [
      { name: 'Sore', difficulty: 2, words: ['ACHING', 'BRUISED'] },
      { name: 'Offers for a contract', difficulty: 3, words: ['BID', 'QUOTE'] },
      { name: 'Small boats', difficulty: 4, words: ['DINGHY', 'CANOE'] },
      { name: 'Chicken pieces', difficulty: 1, words: ['NUGGET', 'DRUMSTICK'] },
    ],
  },
  {
    id: 130,
    wildcard: 'TOAST',
    categories: [
      { name: 'Breakfast foods', difficulty: 1, words: ['CEREAL', 'PORRIDGE'] },
      { name: 'Things said at a wedding', difficulty: 2, words: ['VOWS', 'SPEECH'] },
      { name: 'Doomed', difficulty: 4, words: ['SUNK', 'FINISHED'] },
      { name: 'Cooking methods', difficulty: 3, words: ['BAKE', 'ROAST'] },
    ],
  },
  {
    id: 131,
    wildcard: 'TRUNK',
    categories: [
      { name: 'Parts of an elephant', difficulty: 1, words: ['TUSK', 'EAR'] },
      { name: 'Parts of a tree', difficulty: 2, words: ['BRANCH', 'BARK'] },
      { name: 'Luggage', difficulty: 3, words: ['SUITCASE', 'VALISE'] },
      { name: 'Car storage spaces', difficulty: 4, words: ['GLOVEBOX', 'BOOT'] },
    ],
  },
  {
    id: 132,
    wildcard: 'TWIST',
    categories: [
      { name: 'Dances', difficulty: 1, words: ['JIVE', 'TANGO'] },
      { name: 'Plot devices', difficulty: 3, words: ['CLIFFHANGER', 'REVEAL'] },
      { name: 'Ways to turn', difficulty: 2, words: ['SPIN', 'ROTATE'] },
      { name: 'Dickens characters', difficulty: 4, words: ['PIP', 'SCROOGE'] },
    ],
  },
  {
    id: 133,
    wildcard: 'WATCH',
    categories: [
      { name: 'Timepieces', difficulty: 1, words: ['SUNDIAL', 'HOURGLASS'] },
      { name: 'Ways to look', difficulty: 2, words: ['GAZE', 'OBSERVE'] },
      { name: 'Guard duties', difficulty: 3, words: ['VIGIL', 'PATROL'] },
      { name: '___TOWER', difficulty: 4, words: ['BELL', 'WATER'] },
    ],
  },
  {
    id: 134,
    wildcard: 'WELL',
    categories: [
      { name: 'Healthy', difficulty: 1, words: ['FIT', 'HEALTHY'] },
      { name: 'Water sources', difficulty: 2, words: ['RESERVOIR', 'BORE'] },
      { name: 'Filler words', difficulty: 4, words: ['UMM', 'LIKE'] },
      { name: 'Oil industry', difficulty: 3, words: ['RIG', 'REFINERY'] },
    ],
  },
  {
    id: 135,
    wildcard: 'WHIP',
    categories: [
      { name: 'Riding gear', difficulty: 1, words: ['SADDLE', 'REINS'] },
      { name: 'Kitchen techniques', difficulty: 2, words: ['WHISK', 'BEAT'] },
      { name: 'Parliamentary roles', difficulty: 3, words: ['SPEAKER', 'MINISTER'] },
      { name: 'Car slang', difficulty: 4, words: ['RIDE', 'WHEELS'] },
    ],
  },
  {
    id: 136,
    wildcard: 'ZIP',
    categories: [
      { name: 'Fasteners', difficulty: 1, words: ['BUTTON', 'BUCKLE'] },
      { name: 'Nothing', difficulty: 3, words: ['NIL', 'ZILCH'] },
      { name: 'Move fast', difficulty: 4, words: ['DASH', 'ZOOM'] },
      { name: 'File formats', difficulty: 2, words: ['PDF', 'JPEG'] },
    ],
  },
  {
    id: 137,
    wildcard: 'BELT',
    categories: [
      { name: 'Clothing accessories', difficulty: 1, words: ['SCARF', 'BRACES'] },
      { name: 'Hit hard', difficulty: 2, words: ['WHACK', 'SMACK'] },
      { name: 'Regions', difficulty: 4, words: ['ZONE', 'BAND'] },
      { name: 'Car safety features', difficulty: 3, words: ['AIRBAG', 'HEADREST'] },
    ],
  },
  {
    id: 138,
    wildcard: 'BLOCK',
    categories: [
      { name: 'Obstruct', difficulty: 3, words: ['BAR', 'IMPEDE'] },
      { name: 'City layout', difficulty: 2, words: ['STREET', 'AVENUE'] },
      { name: 'Social media actions', difficulty: 1, words: ['MUTE', 'UNFOLLOW'] },
      { name: 'Volleyball moves', difficulty: 4, words: ['SPIKE', 'SET'] },
    ],
  },
  {
    id: 139,
    wildcard: 'BOARD',
    categories: [
      { name: 'Groups that make decisions', difficulty: 2, words: ['PANEL', 'COMMITTEE'] },
      { name: 'Get on', difficulty: 3, words: ['EMBARK', 'MOUNT'] },
      { name: 'Classroom items', difficulty: 1, words: ['DESK', 'CHALK'] },
      { name: '___ GAME', difficulty: 4, words: ['VIDEO', 'BALL'] },
    ],
  },
  {
    id: 140,
    wildcard: 'BRUSH',
    categories: [
      { name: 'Painting gear', difficulty: 1, words: ['ROLLER', 'EASEL'] },
      { name: 'Dental hygiene', difficulty: 2, words: ['FLOSS', 'MOUTHWASH'] },
      { name: 'Undergrowth', difficulty: 4, words: ['SCRUB', 'THICKET'] },
      { name: 'Touch lightly', difficulty: 3, words: ['GRAZE', 'SKIM'] },
    ],
  },
  {
    id: 141,
    wildcard: 'BUCK',
    categories: [
      { name: 'Male animals', difficulty: 1, words: ['STAG', 'RAM'] },
      { name: 'Money slang', difficulty: 2, words: ['QUID', 'DOUGH'] },
      { name: 'Horse movements', difficulty: 3, words: ['REAR', 'TROT'] },
      { name: 'Go against', difficulty: 4, words: ['DEFY', 'RESIST'] },
    ],
  },
  {
    id: 142,
    wildcard: 'BULB',
    categories: [
      { name: 'Light sources', difficulty: 1, words: ['LAMP', 'LANTERN'] },
      { name: 'Things you plant', difficulty: 2, words: ['SEED', 'CUTTING'] },
      { name: 'Forms of garlic', difficulty: 3, words: ['CLOVE', 'POWDER'] },
      { name: 'Things that can blow', difficulty: 4, words: ['FUSE', 'GASKET'] },
    ],
  },
  {
    id: 143,
    wildcard: 'CAST',
    categories: [
      { name: 'Theatre company', difficulty: 1, words: ['CREW', 'ENSEMBLE'] },
      { name: 'Broken-bone treatments', difficulty: 2, words: ['SPLINT', 'SLING'] },
      { name: 'Fishing actions', difficulty: 4, words: ['REEL', 'TROLL'] },
      { name: 'Throw', difficulty: 3, words: ['HURL', 'TOSS'] },
    ],
  },
  {
    id: 144,
    wildcard: 'CHAIN',
    categories: [
      { name: 'Jewellery', difficulty: 1, words: ['PENDANT', 'LOCKET'] },
      { name: 'Bike parts', difficulty: 2, words: ['PEDAL', 'SPOKE'] },
      { name: 'Types of business', difficulty: 3, words: ['FRANCHISE', 'CONGLOMERATE'] },
      { name: 'Mountain features', difficulty: 4, words: ['RANGE', 'RIDGE'] },
    ],
  },
  {
    id: 145,
    wildcard: 'CHARGE',
    categories: [
      { name: 'Costs', difficulty: 1, words: ['FEE', 'TARIFF'] },
      { name: 'Electrical terms', difficulty: 2, words: ['VOLTAGE', 'CURRENT'] },
      { name: 'Attack', difficulty: 3, words: ['STORM', 'ASSAULT'] },
      { name: 'Legal accusations', difficulty: 4, words: ['ALLEGATION', 'COUNT'] },
    ],
  },
  {
    id: 146,
    wildcard: 'CHEST',
    categories: [
      { name: 'Storage boxes', difficulty: 2, words: ['COFFER', 'CASKET'] },
      { name: 'Muscle groups', difficulty: 1, words: ['BICEPS', 'GLUTES'] },
      { name: 'Pirate things', difficulty: 3, words: ['PLANK', 'PARROT'] },
      { name: '___NUT', difficulty: 4, words: ['PEA', 'DOUGH'] },
    ],
  },
  {
    id: 147,
    wildcard: 'CLIP',
    categories: [
      { name: 'Paper fasteners', difficulty: 1, words: ['STAPLE', 'PIN'] },
      { name: 'Short videos', difficulty: 2, words: ['TRAILER', 'SNIPPET'] },
      { name: 'Cut back', difficulty: 3, words: ['TRIM', 'PRUNE'] },
      { name: 'Light blows', difficulty: 4, words: ['CUFF', 'SWAT'] },
    ],
  },
  {
    id: 148,
    wildcard: 'COACH',
    categories: [
      { name: 'Mentors', difficulty: 1, words: ['MENTOR', 'TUTOR'] },
      { name: 'Airline classes', difficulty: 3, words: ['BUSINESS', 'FIRST'] },
      { name: 'Horse-drawn vehicles', difficulty: 2, words: ['CARRIAGE', 'WAGON'] },
      { name: 'Ways to travel interstate', difficulty: 4, words: ['TRAIN', 'FERRY'] },
    ],
  },
  {
    id: 149,
    wildcard: 'RAM',
    categories: [
      { name: 'Male animals', difficulty: 1, words: ['STALLION', 'BOAR'] },
      { name: 'Computer memory', difficulty: 2, words: ['ROM', 'CACHE'] },
      { name: 'Ways to hit', difficulty: 3, words: ['BUTT', 'SMASH'] },
      { name: 'Zodiac creatures', difficulty: 4, words: ['CRAB', 'SCORPION'] },
    ],
  },
  {
    id: 150,
    wildcard: 'BUG',
    categories: [
      { name: 'Insects', difficulty: 1, words: ['BEETLE', 'ANT'] },
      { name: 'Software faults', difficulty: 2, words: ['GLITCH', 'ERROR'] },
      { name: 'Annoy', difficulty: 3, words: ['NAG', 'PESTER'] },
      { name: 'Listening devices', difficulty: 4, words: ['WIRE', 'MIC'] },
    ],
  },
  {
    id: 151,
    wildcard: 'CELL',
    categories: [
      { name: 'Places to lock someone up', difficulty: 2, words: ['DUNGEON', 'BRIG'] },
      { name: 'Spreadsheet terms', difficulty: 4, words: ['ROW', 'COLUMN'] },
      { name: 'Phones', difficulty: 1, words: ['MOBILE', 'LANDLINE'] },
      { name: 'Biology building blocks', difficulty: 3, words: ['GENE', 'TISSUE'] },
    ],
  },
  {
    id: 152,
    wildcard: 'DIAL',
    categories: [
      { name: 'Clock parts', difficulty: 1, words: ['FACE', 'PENDULUM'] },
      { name: 'Phone actions', difficulty: 2, words: ['CALL', 'TEXT'] },
      { name: 'Controls', difficulty: 3, words: ['KNOB', 'SWITCH'] },
      { name: 'SUN___', difficulty: 4, words: ['FLOWER', 'BURN'] },
    ],
  },
  {
    id: 153,
    wildcard: 'FLASH',
    categories: [
      { name: 'Camera parts', difficulty: 1, words: ['LENS', 'SHUTTER'] },
      { name: 'DC superheroes', difficulty: 2, words: ['CYBORG', 'SUPERMAN'] },
      { name: 'An instant', difficulty: 4, words: ['MOMENT', 'JIFFY'] },
      { name: 'Bright bursts', difficulty: 3, words: ['BLAZE', 'FLARE'] },
    ],
  },
  {
    id: 154,
    wildcard: 'LEMON',
    categories: [
      { name: 'Citrus fruits', difficulty: 1, words: ['LIME', 'YUZU'] },
      { name: 'Failures', difficulty: 3, words: ['DUD', 'FLOP'] },
      { name: 'Shades of yellow', difficulty: 2, words: ['MUSTARD', 'CANARY'] },
      { name: 'Pie flavours', difficulty: 4, words: ['PECAN', 'APPLE'] },
    ],
  },
  {
    id: 155,
    wildcard: 'NUT',
    categories: [
      { name: 'Hardware', difficulty: 1, words: ['WASHER', 'SCREW'] },
      { name: 'Enthusiast', difficulty: 3, words: ['FANATIC', 'BUFF'] },
      { name: 'Slang for head', difficulty: 4, words: ['NOGGIN', 'BONCE'] },
      { name: 'Trail mix ingredients', difficulty: 2, words: ['RAISIN', 'SEED'] },
    ],
  },
  {
    id: 156,
    wildcard: 'RUSH',
    categories: [
      { name: 'Hurry', difficulty: 1, words: ['HURRY', 'HASTEN'] },
      { name: 'Wetland plants', difficulty: 4, words: ['REED', 'SEDGE'] },
      { name: 'Thrill', difficulty: 2, words: ['BUZZ', 'KICK'] },
      { name: '___ HOUR', difficulty: 3, words: ['HAPPY', 'ZERO'] },
    ],
  },
  {
    id: 157,
    wildcard: 'BOOT',
    categories: [
      { name: 'Car parts', difficulty: 1, words: ['BONNET', 'BUMPER'] },
      { name: 'Footwear', difficulty: 2, words: ['SANDAL', 'LOAFER'] },
      { name: 'Kick out', difficulty: 3, words: ['EJECT', 'EXPEL'] },
      { name: '___ CAMP', difficulty: 4, words: ['BASE', 'SUMMER'] },
    ],
  },
  {
    id: 158,
    wildcard: 'CAPE',
    categories: [
      { name: 'Superhero gear', difficulty: 1, words: ['MASK', 'TIGHTS'] },
      { name: 'Land jutting into the sea', difficulty: 3, words: ['HEADLAND', 'PENINSULA'] },
      { name: 'Bullfighting', difficulty: 4, words: ['MATADOR', 'BULL'] },
      { name: 'Draped garments', difficulty: 2, words: ['PONCHO', 'SHAWL'] },
    ],
  },
  {
    id: 159,
    wildcard: 'TIP',
    categories: [
      { name: 'Advice', difficulty: 1, words: ['HINT', 'POINTER'] },
      { name: 'Rubbish sites', difficulty: 3, words: ['DUMP', 'LANDFILL'] },
      { name: 'Highest points', difficulty: 2, words: ['APEX', 'SUMMIT'] },
      { name: 'Knock over', difficulty: 4, words: ['TOPPLE', 'UPEND'] },
    ],
  },
  {
    id: 160,
    wildcard: 'ROUND',
    categories: [
      { name: 'Boxing terms', difficulty: 1, words: ['UPPERCUT', 'JAB'] },
      { name: 'Stages of a competition', difficulty: 2, words: ['HEAT', 'FINAL'] },
      { name: 'Ammunition', difficulty: 3, words: ['BULLET', 'CARTRIDGE'] },
      { name: 'Songs in parts', difficulty: 4, words: ['CANON', 'FUGUE'] },
    ],
  },
];
