import type { Difficulty } from '../overlap/scoring';

export interface OverlapHardCategory {
  name: string;
  /** 1 (easiest, yellow) to 4 (hardest, purple) — each puzzle uses each level once */
  difficulty: Difficulty;
  /** The three words unique to this category — the puzzle's wildcard completes it */
  words: [string, string, string];
}

export interface OverlapHardPuzzle {
  id: number;
  /** The one word that belongs to all four categories */
  wildcard: string;
  categories: [OverlapHardCategory, OverlapHardCategory, OverlapHardCategory, OverlapHardCategory];
  /** Red herrings: tempting words that belong to no category */
  decoys: [string, string, string];
}

export const PUZZLES: OverlapHardPuzzle[] = [
  {
    id: 1,
    wildcard: 'BOW',
    categories: [
      { name: 'Parts of a ship', difficulty: 2, words: ['STERN', 'HULL', 'KEEL'] },
      { name: 'Archery gear', difficulty: 1, words: ['ARROW', 'QUIVER', 'TARGET'] },
      { name: 'Gestures of respect', difficulty: 3, words: ['SALUTE', 'CURTSY', 'KOWTOW'] },
      { name: 'Gift wrapping', difficulty: 4, words: ['RIBBON', 'TAPE', 'TAG'] },
    ],
    decoys: ['SPEAR', 'WAVE', 'PADDLE'],
  },
  {
    id: 2,
    wildcard: 'CHARGE',
    categories: [
      { name: 'Electrical quantities', difficulty: 1, words: ['VOLTAGE', 'CURRENT', 'RESISTANCE'] },
      { name: 'Prices you pay', difficulty: 2, words: ['FEE', 'TOLL', 'FARE'] },
      { name: 'Military attacks', difficulty: 3, words: ['RAID', 'ASSAULT', 'AMBUSH'] },
      { name: 'Stages of a criminal case', difficulty: 4, words: ['PLEA', 'VERDICT', 'SENTENCE'] },
    ],
    decoys: ['MAGNET', 'RETREAT', 'JUDGE'],
  },
  {
    id: 3,
    wildcard: 'TRAIN',
    categories: [
      { name: 'Bridal wear', difficulty: 3, words: ['VEIL', 'TIARA', 'GARTER'] },
      { name: 'Vehicles on rails', difficulty: 1, words: ['TRAM', 'FUNICULAR', 'MONORAIL'] },
      { name: 'Teach', difficulty: 2, words: ['TUTOR', 'DRILL', 'SCHOOL'] },
      { name: 'Things in succession', difficulty: 4, words: ['SERIES', 'STRING', 'SEQUENCE'] },
    ],
    decoys: ['BUS', 'LEARN', 'TUXEDO'],
  },
  {
    id: 4,
    wildcard: 'FALL',
    categories: [
      { name: 'Come down suddenly', difficulty: 1, words: ['TUMBLE', 'PLUNGE', 'TOPPLE'] },
      { name: 'Ways to score in wrestling', difficulty: 3, words: ['PIN', 'TAKEDOWN', 'REVERSAL'] },
      { name: 'Events in Genesis', difficulty: 4, words: ['CREATION', 'FLOOD', 'BABEL'] },
      { name: 'Seasons (American names)', difficulty: 2, words: ['SUMMER', 'WINTER', 'SPRING'] },
    ],
    decoys: ['KNOCKOUT', 'EXODUS', 'MONSOON'],
  },
  {
    id: 5,
    wildcard: 'PRESS',
    categories: [
      { name: 'Gym lifts', difficulty: 1, words: ['SQUAT', 'DEADLIFT', 'CURL'] },
      { name: 'Get the creases out', difficulty: 2, words: ['IRON', 'FLATTEN', 'SMOOTH'] },
      { name: 'Winery equipment', difficulty: 3, words: ['VAT', 'BARREL', 'FERMENTER'] },
      { name: 'FREE ___', difficulty: 4, words: ['KICK', 'WILL', 'RANGE'] },
    ],
    decoys: ['JOG', 'FOLD', 'GRAPE'],
  },
  {
    id: 6,
    wildcard: 'STAFF',
    categories: [
      { name: 'Employees, collectively', difficulty: 1, words: ['CREW', 'PERSONNEL', 'WORKFORCE'] },
      { name: 'Sheet music notation', difficulty: 3, words: ['CLEF', 'CROTCHET', 'FERMATA'] },
      { name: 'Walking aids', difficulty: 2, words: ['CANE', 'CRUTCH', 'WALKER'] },
      { name: "A wizard's kit", difficulty: 4, words: ['WAND', 'ROBE', 'SPELLBOOK'] },
    ],
    decoys: ['BOSS', 'BATON', 'PAYROLL'],
  },
  {
    id: 7,
    wildcard: 'BANK',
    categories: [
      { name: 'Land beside water', difficulty: 1, words: ['SHORE', 'COAST', 'STRAND'] },
      { name: 'Places to keep valuables', difficulty: 2, words: ['VAULT', 'SAFE', 'COFFER'] },
      { name: 'Aerobatic manoeuvres', difficulty: 3, words: ['ROLL', 'LOOP', 'STALL'] },
      { name: 'Seen in Monopoly', difficulty: 4, words: ['JAIL', 'CHANCE', 'BOARDWALK'] },
    ],
    decoys: ['REEF', 'RUNWAY', 'CROUPIER'],
  },
  {
    id: 8,
    wildcard: 'POINT',
    categories: [
      { name: 'Tennis scoring', difficulty: 1, words: ['DEUCE', 'LOVE', 'ADVANTAGE'] },
      { name: 'Land jutting into the sea', difficulty: 2, words: ['CAPE', 'HEADLAND', 'PROMONTORY'] },
      { name: 'Purpose', difficulty: 3, words: ['AIM', 'INTENT', 'OBJECTIVE'] },
      { name: 'Hand gestures', difficulty: 4, words: ['WAVE', 'BECKON', 'SALUTE'] },
    ],
    decoys: ['BIRDIE', 'BAY', 'NOD'],
  },
  {
    id: 9,
    wildcard: 'SQUASH',
    categories: [
      { name: 'Racquet sports', difficulty: 1, words: ['TENNIS', 'BADMINTON', 'PADEL'] },
      { name: 'Gourds', difficulty: 3, words: ['PUMPKIN', 'MARROW', 'CALABASH'] },
      { name: 'Squeeze flat', difficulty: 2, words: ['CRUSH', 'SQUISH', 'COMPRESS'] },
      { name: 'Soft drinks', difficulty: 4, words: ['CORDIAL', 'LEMONADE', 'SODA'] },
    ],
    decoys: ['GOLF', 'TURNIP', 'LAGER'],
  },
  {
    id: 10,
    wildcard: 'SPELL',
    categories: [
      { name: 'Magic', difficulty: 1, words: ['CHARM', 'HEX', 'CURSE'] },
      { name: 'Signify', difficulty: 2, words: ['MEAN', 'DENOTE', 'SIGNAL'] },
      { name: 'COLD ___', difficulty: 4, words: ['SNAP', 'FRONT', 'SHOULDER'] },
      { name: 'A period of activity', difficulty: 3, words: ['STINT', 'BOUT', 'STRETCH'] },
    ],
    decoys: ['POTION', 'WINTER', 'WIZARD'],
  },
  {
    id: 11,
    wildcard: 'STOCK',
    categories: [
      { name: 'Soup liquids', difficulty: 1, words: ['BROTH', 'BOUILLON', 'CONSOMME'] },
      { name: 'Investments', difficulty: 2, words: ['SHARE', 'BOND', 'EQUITY'] },
      { name: 'Rifle parts', difficulty: 4, words: ['BARREL', 'TRIGGER', 'MUZZLE'] },
      { name: 'Goods on hand', difficulty: 3, words: ['SUPPLY', 'INVENTORY', 'RESERVE'] },
    ],
    decoys: ['GRAVY', 'TAX', 'BULLET'],
  },
  {
    id: 12,
    wildcard: 'RACKET',
    categories: [
      { name: 'Loud noise', difficulty: 2, words: ['DIN', 'CLAMOUR', 'UPROAR'] },
      { name: 'Shady schemes', difficulty: 3, words: ['SCAM', 'SWINDLE', 'FRAUD'] },
      { name: 'Things with strings', difficulty: 4, words: ['GUITAR', 'HARP', 'PUPPET'] },
      { name: 'Swung in sport', difficulty: 1, words: ['BAT', 'CLUB', 'MALLET'] },
    ],
    decoys: ['ECHO', 'HEIST', 'DRUM'],
  },
  {
    id: 13,
    wildcard: 'SHED',
    categories: [
      { name: 'Outbuildings', difficulty: 1, words: ['BARN', 'STABLE', 'GARAGE'] },
      { name: 'Things a snake does', difficulty: 3, words: ['SLITHER', 'HISS', 'COIL'] },
      { name: 'Get rid of', difficulty: 2, words: ['DITCH', 'DUMP', 'SCRAP'] },
      { name: 'COW___ (one word)', difficulty: 4, words: ['BELL', 'BOY', 'HIDE'] },
    ],
    decoys: ['PATIO', 'CROAK', 'HOARD'],
  },
  {
    id: 14,
    wildcard: 'PLAY',
    categories: [
      { name: 'Stage shows', difficulty: 1, words: ['DRAMA', 'MUSICAL', 'PANTOMIME'] },
      { name: 'Room to move', difficulty: 3, words: ['SLACK', 'GIVE', 'LEEWAY'] },
      { name: 'Gamble', difficulty: 2, words: ['WAGER', 'PUNT', 'STAKE'] },
      { name: 'FAIR ___', difficulty: 4, words: ['GAME', 'WAY', 'GROUND'] },
    ],
    decoys: ['NOVEL', 'TENSION', 'JACKPOT'],
  },
  {
    id: 15,
    wildcard: 'CAST',
    categories: [
      { name: 'Throw', difficulty: 1, words: ['TOSS', 'HURL', 'FLING'] },
      { name: 'Treating a broken limb', difficulty: 2, words: ['SPLINT', 'BRACE', 'BANDAGE'] },
      { name: 'Angling', difficulty: 3, words: ['REEL', 'LURE', 'TACKLE'] },
      { name: 'Metalworking', difficulty: 4, words: ['FORGE', 'WELD', 'SMELT'] },
    ],
    decoys: ['GRAB', 'SCALPEL', 'OAR'],
  },
  {
    id: 16,
    wildcard: 'MAGAZINE',
    categories: [
      { name: 'Periodicals', difficulty: 1, words: ['JOURNAL', 'TABLOID', 'GAZETTE'] },
      { name: 'Gun parts', difficulty: 2, words: ['TRIGGER', 'BARREL', 'MUZZLE'] },
      { name: 'Where ammunition is kept', difficulty: 3, words: ['ARSENAL', 'ARMOURY', 'DEPOT'] },
      { name: '___ RACK', difficulty: 4, words: ['ROOF', 'SPICE', 'BIKE'] },
    ],
    decoys: ['ENCYCLOPEDIA', 'HOLSTER', 'BARRACKS'],
  },
  {
    id: 17,
    wildcard: 'CHAIN',
    categories: [
      { name: 'Jewellery', difficulty: 1, words: ['PENDANT', 'LOCKET', 'BANGLE'] },
      { name: 'Bicycle parts', difficulty: 2, words: ['PEDAL', 'SPOKE', 'SADDLE'] },
      { name: 'Restraints', difficulty: 3, words: ['SHACKLE', 'FETTER', 'MANACLE'] },
      { name: 'FOOD ___', difficulty: 4, words: ['COURT', 'COMA', 'TRUCK'] },
    ],
    decoys: ['ENGINE', 'HELMET', 'ANCHOR'],
  },
  {
    id: 18,
    wildcard: 'BUG',
    categories: [
      { name: 'Insects', difficulty: 1, words: ['BEETLE', 'APHID', 'WEEVIL'] },
      { name: 'Software flaws', difficulty: 2, words: ['GLITCH', 'DEFECT', 'FAULT'] },
      { name: 'Annoy', difficulty: 3, words: ['PESTER', 'NAG', 'IRK'] },
      { name: 'Surveillance devices', difficulty: 4, words: ['TAP', 'WIRE', 'TRACKER'] },
    ],
    decoys: ['SPIDER', 'PATCH', 'DISGUISE'],
  },
  {
    id: 19,
    wildcard: 'HOOK',
    categories: [
      { name: 'Boxing punches', difficulty: 2, words: ['JAB', 'UPPERCUT', 'CROSS'] },
      { name: 'Fishing tackle', difficulty: 1, words: ['LURE', 'SINKER', 'FLOAT'] },
      { name: 'The classic pirate look', difficulty: 3, words: ['EYEPATCH', 'PARROT', 'PEGLEG'] },
      { name: 'Parts of a pop song', difficulty: 4, words: ['CHORUS', 'VERSE', 'BRIDGE'] },
    ],
    decoys: ['KICK', 'MONOCLE', 'ALBUM'],
  },
  {
    id: 20,
    wildcard: 'TIP',
    categories: [
      { name: 'Helpful advice', difficulty: 1, words: ['HINT', 'POINTER', 'CLUE'] },
      { name: 'Where rubbish goes', difficulty: 2, words: ['DUMP', 'LANDFILL', 'JUNKYARD'] },
      { name: 'Tilt', difficulty: 4, words: ['LEAN', 'SLANT', 'LIST'] },
      { name: 'Extras on top of pay', difficulty: 3, words: ['BONUS', 'GRATUITY', 'PERK'] },
    ],
    decoys: ['SEWER', 'SPIN', 'TAX'],
  },
];
