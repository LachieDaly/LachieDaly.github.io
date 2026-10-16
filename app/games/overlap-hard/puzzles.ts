export interface OverlapHardCategory {
  name: string;
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
      { name: 'Parts of a ship', words: ['STERN', 'HULL', 'KEEL'] },
      { name: 'Archery gear', words: ['ARROW', 'QUIVER', 'TARGET'] },
      { name: 'Gestures of respect', words: ['SALUTE', 'CURTSY', 'KOWTOW'] },
      { name: 'Gift wrapping', words: ['RIBBON', 'TAPE', 'TAG'] },
    ],
    decoys: ['SPEAR', 'WAVE', 'PADDLE'],
  },
  {
    id: 2,
    wildcard: 'CHARGE',
    categories: [
      { name: 'Electrical quantities', words: ['VOLTAGE', 'CURRENT', 'RESISTANCE'] },
      { name: 'Prices you pay', words: ['FEE', 'TOLL', 'FARE'] },
      { name: 'Military attacks', words: ['RAID', 'ASSAULT', 'AMBUSH'] },
      { name: 'Stages of a criminal case', words: ['PLEA', 'VERDICT', 'SENTENCE'] },
    ],
    decoys: ['MAGNET', 'RETREAT', 'JUDGE'],
  },
  {
    id: 3,
    wildcard: 'TRAIN',
    categories: [
      { name: 'Bridal wear', words: ['VEIL', 'TIARA', 'GARTER'] },
      { name: 'Vehicles on rails', words: ['TRAM', 'FUNICULAR', 'MONORAIL'] },
      { name: 'Teach', words: ['TUTOR', 'DRILL', 'SCHOOL'] },
      { name: 'Things in succession', words: ['SERIES', 'STRING', 'SEQUENCE'] },
    ],
    decoys: ['BUS', 'LEARN', 'TUXEDO'],
  },
  {
    id: 4,
    wildcard: 'FALL',
    categories: [
      { name: 'Come down suddenly', words: ['TUMBLE', 'PLUNGE', 'TOPPLE'] },
      { name: 'Ways to score in wrestling', words: ['PIN', 'TAKEDOWN', 'REVERSAL'] },
      { name: 'Events in Genesis', words: ['CREATION', 'FLOOD', 'BABEL'] },
      { name: 'Seasons (American names)', words: ['SUMMER', 'WINTER', 'SPRING'] },
    ],
    decoys: ['KNOCKOUT', 'EXODUS', 'MONSOON'],
  },
  {
    id: 5,
    wildcard: 'PRESS',
    categories: [
      { name: 'Gym lifts', words: ['SQUAT', 'DEADLIFT', 'CURL'] },
      { name: 'Get the creases out', words: ['IRON', 'FLATTEN', 'SMOOTH'] },
      { name: 'Winery equipment', words: ['VAT', 'BARREL', 'FERMENTER'] },
      { name: 'FREE ___', words: ['KICK', 'WILL', 'RANGE'] },
    ],
    decoys: ['JOG', 'FOLD', 'GRAPE'],
  },
  {
    id: 6,
    wildcard: 'STAFF',
    categories: [
      { name: 'Employees, collectively', words: ['CREW', 'PERSONNEL', 'WORKFORCE'] },
      { name: 'Sheet music notation', words: ['CLEF', 'CROTCHET', 'FERMATA'] },
      { name: 'Walking aids', words: ['CANE', 'CRUTCH', 'WALKER'] },
      { name: "A wizard's kit", words: ['WAND', 'ROBE', 'SPELLBOOK'] },
    ],
    decoys: ['BOSS', 'BATON', 'PAYROLL'],
  },
  {
    id: 7,
    wildcard: 'BANK',
    categories: [
      { name: 'Land beside water', words: ['SHORE', 'COAST', 'STRAND'] },
      { name: 'Places to keep valuables', words: ['VAULT', 'SAFE', 'COFFER'] },
      { name: 'Aerobatic manoeuvres', words: ['ROLL', 'LOOP', 'STALL'] },
      { name: 'Seen in Monopoly', words: ['JAIL', 'CHANCE', 'BOARDWALK'] },
    ],
    decoys: ['REEF', 'RUNWAY', 'CROUPIER'],
  },
  {
    id: 8,
    wildcard: 'POINT',
    categories: [
      { name: 'Tennis scoring', words: ['DEUCE', 'LOVE', 'ADVANTAGE'] },
      { name: 'Land jutting into the sea', words: ['CAPE', 'HEADLAND', 'PROMONTORY'] },
      { name: 'Purpose', words: ['AIM', 'INTENT', 'OBJECTIVE'] },
      { name: 'Hand gestures', words: ['WAVE', 'BECKON', 'SALUTE'] },
    ],
    decoys: ['BIRDIE', 'BAY', 'NOD'],
  },
  {
    id: 9,
    wildcard: 'SQUASH',
    categories: [
      { name: 'Racquet sports', words: ['TENNIS', 'BADMINTON', 'PADEL'] },
      { name: 'Gourds', words: ['PUMPKIN', 'MARROW', 'CALABASH'] },
      { name: 'Squeeze flat', words: ['CRUSH', 'SQUISH', 'COMPRESS'] },
      { name: 'Soft drinks', words: ['CORDIAL', 'LEMONADE', 'SODA'] },
    ],
    decoys: ['GOLF', 'TURNIP', 'LAGER'],
  },
  {
    id: 10,
    wildcard: 'SPELL',
    categories: [
      { name: 'Magic', words: ['CHARM', 'HEX', 'CURSE'] },
      { name: 'Signify', words: ['MEAN', 'DENOTE', 'SIGNAL'] },
      { name: 'COLD ___', words: ['SNAP', 'FRONT', 'SHOULDER'] },
      { name: 'A period of activity', words: ['STINT', 'BOUT', 'STRETCH'] },
    ],
    decoys: ['POTION', 'WINTER', 'WIZARD'],
  },
  {
    id: 11,
    wildcard: 'STOCK',
    categories: [
      { name: 'Soup liquids', words: ['BROTH', 'BOUILLON', 'CONSOMME'] },
      { name: 'Investments', words: ['SHARE', 'BOND', 'EQUITY'] },
      { name: 'Rifle parts', words: ['BARREL', 'TRIGGER', 'MUZZLE'] },
      { name: 'Goods on hand', words: ['SUPPLY', 'INVENTORY', 'RESERVE'] },
    ],
    decoys: ['GRAVY', 'TAX', 'BULLET'],
  },
  {
    id: 12,
    wildcard: 'RACKET',
    categories: [
      { name: 'Loud noise', words: ['DIN', 'CLAMOUR', 'UPROAR'] },
      { name: 'Shady schemes', words: ['SCAM', 'SWINDLE', 'FRAUD'] },
      { name: 'Things with strings', words: ['GUITAR', 'HARP', 'PUPPET'] },
      { name: 'Swung in sport', words: ['BAT', 'CLUB', 'MALLET'] },
    ],
    decoys: ['ECHO', 'HEIST', 'DRUM'],
  },
  {
    id: 13,
    wildcard: 'SHED',
    categories: [
      { name: 'Outbuildings', words: ['BARN', 'STABLE', 'GARAGE'] },
      { name: 'Things a snake does', words: ['SLITHER', 'HISS', 'COIL'] },
      { name: 'Get rid of', words: ['DITCH', 'DUMP', 'SCRAP'] },
      { name: 'COW___ (one word)', words: ['BELL', 'BOY', 'HIDE'] },
    ],
    decoys: ['PATIO', 'CROAK', 'HOARD'],
  },
  {
    id: 14,
    wildcard: 'PLAY',
    categories: [
      { name: 'Stage shows', words: ['DRAMA', 'MUSICAL', 'PANTOMIME'] },
      { name: 'Room to move', words: ['SLACK', 'GIVE', 'LEEWAY'] },
      { name: 'Gamble', words: ['WAGER', 'PUNT', 'STAKE'] },
      { name: 'FAIR ___', words: ['GAME', 'WAY', 'GROUND'] },
    ],
    decoys: ['NOVEL', 'TENSION', 'JACKPOT'],
  },
  {
    id: 15,
    wildcard: 'CAST',
    categories: [
      { name: 'Throw', words: ['TOSS', 'HURL', 'FLING'] },
      { name: 'Treating a broken limb', words: ['SPLINT', 'BRACE', 'BANDAGE'] },
      { name: 'Angling', words: ['REEL', 'LURE', 'TACKLE'] },
      { name: 'Metalworking', words: ['FORGE', 'WELD', 'SMELT'] },
    ],
    decoys: ['GRAB', 'SCALPEL', 'OAR'],
  },
  {
    id: 16,
    wildcard: 'MAGAZINE',
    categories: [
      { name: 'Periodicals', words: ['JOURNAL', 'TABLOID', 'GAZETTE'] },
      { name: 'Gun parts', words: ['TRIGGER', 'BARREL', 'MUZZLE'] },
      { name: 'Where ammunition is kept', words: ['ARSENAL', 'ARMOURY', 'DEPOT'] },
      { name: '___ RACK', words: ['ROOF', 'SPICE', 'BIKE'] },
    ],
    decoys: ['ENCYCLOPEDIA', 'HOLSTER', 'BARRACKS'],
  },
  {
    id: 17,
    wildcard: 'CHAIN',
    categories: [
      { name: 'Jewellery', words: ['PENDANT', 'LOCKET', 'BANGLE'] },
      { name: 'Bicycle parts', words: ['PEDAL', 'SPOKE', 'SADDLE'] },
      { name: 'Restraints', words: ['SHACKLE', 'FETTER', 'MANACLE'] },
      { name: 'FOOD ___', words: ['COURT', 'COMA', 'TRUCK'] },
    ],
    decoys: ['ENGINE', 'HELMET', 'ANCHOR'],
  },
  {
    id: 18,
    wildcard: 'BUG',
    categories: [
      { name: 'Insects', words: ['BEETLE', 'APHID', 'WEEVIL'] },
      { name: 'Software flaws', words: ['GLITCH', 'DEFECT', 'FAULT'] },
      { name: 'Annoy', words: ['PESTER', 'NAG', 'IRK'] },
      { name: 'Surveillance devices', words: ['TAP', 'WIRE', 'TRACKER'] },
    ],
    decoys: ['SPIDER', 'PATCH', 'DISGUISE'],
  },
  {
    id: 19,
    wildcard: 'HOOK',
    categories: [
      { name: 'Boxing punches', words: ['JAB', 'UPPERCUT', 'CROSS'] },
      { name: 'Fishing tackle', words: ['LURE', 'SINKER', 'FLOAT'] },
      { name: 'The classic pirate look', words: ['EYEPATCH', 'PARROT', 'PEGLEG'] },
      { name: 'Parts of a pop song', words: ['CHORUS', 'VERSE', 'BRIDGE'] },
    ],
    decoys: ['KICK', 'MONOCLE', 'ALBUM'],
  },
  {
    id: 20,
    wildcard: 'TIP',
    categories: [
      { name: 'Helpful advice', words: ['HINT', 'POINTER', 'CLUE'] },
      { name: 'Where rubbish goes', words: ['DUMP', 'LANDFILL', 'JUNKYARD'] },
      { name: 'Tilt', words: ['LEAN', 'SLANT', 'LIST'] },
      { name: 'Extras on top of pay', words: ['BONUS', 'GRATUITY', 'PERK'] },
    ],
    decoys: ['SEWER', 'SPIN', 'TAX'],
  },
];
