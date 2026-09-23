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
  {
    id: 21,
    wildcard: 'FAN',
    categories: [
      { name: 'Supporters', words: ['ADMIRER', 'DEVOTEE'] },
      { name: 'Things with spinning blades', words: ['BLENDER', 'PROPELLER'] },
      { name: '___ CLUB', words: ['GOLF', 'BOOK'] },
      { name: 'Ceiling fixtures', words: ['CHANDELIER', 'SKYLIGHT'] },
    ],
  },
  {
    id: 22,
    wildcard: 'SHELL',
    categories: [
      { name: 'Beach finds', words: ['DRIFTWOOD', 'SEAWEED'] },
      { name: 'Petrol station brands', words: ['CALTEX', 'AMPOL'] },
      { name: 'Pasta shapes', words: ['PENNE', 'FUSILLI'] },
      { name: 'Protective outer layers', words: ['HUSK', 'RIND'] },
    ],
  },
  {
    id: 23,
    wildcard: 'BRIDGE',
    categories: [
      { name: 'Card games', words: ['POKER', 'RUMMY'] },
      { name: 'Parts of the nose', words: ['NOSTRIL', 'SEPTUM'] },
      { name: 'Ways to cross a river', words: ['FERRY', 'FORD'] },
      { name: 'Parts of a ship', words: ['HULL', 'KEEL'] },
    ],
  },
  {
    id: 24,
    wildcard: 'BOX',
    categories: [
      { name: 'Olympic combat sports, as verbs', words: ['WRESTLE', 'FENCE'] },
      { name: 'Containers', words: ['CRATE', 'CARTON'] },
      { name: '___ OFFICE', words: ['POST', 'HEAD'] },
      { name: 'Theatre seating areas', words: ['STALLS', 'BALCONY'] },
    ],
  },
  {
    id: 25,
    wildcard: 'CAP',
    categories: [
      { name: 'Hats', words: ['BERET', 'FEDORA'] },
      { name: 'Things that close a bottle', words: ['CORK', 'STOPPER'] },
      { name: 'Upper limits', words: ['CEILING', 'MAXIMUM'] },
      { name: 'Parts of a mushroom', words: ['STEM', 'GILL'] },
    ],
  },
  {
    id: 26,
    wildcard: 'CRANE',
    categories: [
      { name: 'Wading birds', words: ['HERON', 'STORK'] },
      { name: 'Construction machinery', words: ['BULLDOZER', 'EXCAVATOR'] },
      { name: 'Ways to strain to see', words: ['PEER', 'SQUINT'] },
      { name: 'Frasier characters', words: ['NILES', 'DAPHNE'] },
    ],
  },
  {
    id: 27,
    wildcard: 'DECK',
    categories: [
      { name: 'Parts of a ship', words: ['MAST', 'HULL'] },
      { name: 'Words meaning to knock down', words: ['FLOOR', 'TOPPLE'] },
      { name: 'Backyard features', words: ['PATIO', 'PERGOLA'] },
      { name: 'Things you shuffle', words: ['PLAYLIST', 'FEET'] },
    ],
  },
  {
    id: 28,
    wildcard: 'DIAMOND',
    categories: [
      { name: 'Gemstones', words: ['RUBY', 'EMERALD'] },
      { name: 'Card suits', words: ['CLUB', 'SPADE'] },
      { name: 'Four-sided shapes', words: ['SQUARE', 'TRAPEZIUM'] },
      { name: 'Baseball terms', words: ['BUNT', 'INNING'] },
    ],
  },
  {
    id: 29,
    wildcard: 'DRILL',
    categories: [
      { name: 'Power tools', words: ['SANDER', 'JIGSAW'] },
      { name: 'Rap subgenres', words: ['TRAP', 'GRIME'] },
      { name: "Dentist's tools", words: ['MIRROR', 'PROBE'] },
      { name: 'Parade-ground routines', words: ['MARCH', 'SALUTE'] },
    ],
  },
  {
    id: 30,
    wildcard: 'FLY',
    categories: [
      { name: 'Insects', words: ['GNAT', 'WASP'] },
      { name: 'Ways to travel', words: ['SAIL', 'DRIVE'] },
      { name: 'Fishing gear', words: ['REEL', 'SINKER'] },
      { name: 'Parts of trousers', words: ['POCKET', 'CUFF'] },
    ],
  },
  {
    id: 31,
    wildcard: 'FORK',
    categories: [
      { name: 'Cutlery', words: ['SPOON', 'KNIFE'] },
      { name: 'Road features', words: ['ROUNDABOUT', 'OVERPASS'] },
      { name: 'Garden tools', words: ['RAKE', 'HOE'] },
      { name: 'Bicycle parts', words: ['PEDAL', 'CHAIN'] },
    ],
  },
  {
    id: 32,
    wildcard: 'FRAME',
    categories: [
      { name: 'Snooker terms', words: ['CUE', 'CUSHION'] },
      { name: 'Parts of glasses', words: ['LENS', 'HINGE'] },
      { name: 'Words for body shape', words: ['BUILD', 'FIGURE'] },
      { name: 'Units of film', words: ['SCENE', 'TAKE'] },
    ],
  },
  {
    id: 33,
    wildcard: 'GRILL',
    categories: [
      { name: 'Cooking methods', words: ['ROAST', 'STEAM'] },
      { name: 'Words meaning to interrogate', words: ['QUESTION', 'QUIZ'] },
      { name: 'MIXED ___', words: ['BAG', 'DOUBLES'] },
      { name: 'Types of eatery', words: ['BISTRO', 'DINER'] },
    ],
  },
  {
    id: 34,
    wildcard: 'HAND',
    categories: [
      { name: 'Parts of a clock', words: ['FACE', 'PENDULUM'] },
      { name: 'Card game terms', words: ['TRUMP', 'TRICK'] },
      { name: 'Old units of length', words: ['FATHOM', 'FURLONG'] },
      { name: 'Words for a worker', words: ['LABOURER', 'STAFFER'] },
    ],
  },
  {
    id: 35,
    wildcard: 'HEART',
    categories: [
      { name: 'Organs', words: ['LIVER', 'KIDNEY'] },
      { name: 'Words for courage', words: ['VALOUR', 'PLUCK'] },
      { name: "Valentine's Day symbols", words: ['ROSE', 'CUPID'] },
      { name: 'Words for the centre', words: ['CORE', 'HUB'] },
    ],
  },
  {
    id: 36,
    wildcard: 'IRON',
    categories: [
      { name: 'Metals', words: ['COPPER', 'ZINC'] },
      { name: 'Golf clubs', words: ['DRIVER', 'PUTTER'] },
      { name: 'Laundry items', words: ['PEG', 'HAMPER'] },
      { name: '___ AGE', words: ['STONE', 'ICE'] },
    ],
  },
  {
    id: 37,
    wildcard: 'JAM',
    categories: [
      { name: 'Toast toppings', words: ['VEGEMITE', 'HONEY'] },
      { name: 'Traffic problems', words: ['GRIDLOCK', 'CONGESTION'] },
      { name: 'Things bands do', words: ['REHEARSE', 'TOUR'] },
      { name: 'Words for a tricky situation', words: ['FIX', 'BIND'] },
    ],
  },
  {
    id: 38,
    wildcard: 'LEAD',
    categories: [
      { name: 'Dog-walking gear', words: ['COLLAR', 'HARNESS'] },
      { name: 'Toxic elements', words: ['ARSENIC', 'MERCURY'] },
      { name: 'Words meaning to guide', words: ['STEER', 'DIRECT'] },
      { name: 'Types of acting role', words: ['EXTRA', 'CAMEO'] },
    ],
  },
  {
    id: 39,
    wildcard: 'LOG',
    categories: [
      { name: 'Campfire words', words: ['KINDLING', 'EMBER'] },
      { name: 'Records you keep', words: ['DIARY', 'JOURNAL'] },
      { name: 'Maths functions', words: ['SINE', 'TANGENT'] },
      { name: '___ IN', words: ['SIGN', 'CHECK'] },
    ],
  },
  {
    id: 40,
    wildcard: 'MOLE',
    categories: [
      { name: 'Burrowing animals', words: ['WOMBAT', 'BADGER'] },
      { name: 'Marks on the skin', words: ['FRECKLE', 'BIRTHMARK'] },
      { name: 'Words for a spy', words: ['AGENT', 'SPOOK'] },
      { name: 'SI base units', words: ['KELVIN', 'AMPERE'] },
    ],
  },
  {
    id: 41,
    wildcard: 'NAIL',
    categories: [
      { name: 'Things you hammer', words: ['TACK', 'STAKE'] },
      { name: 'Parts of a finger', words: ['KNUCKLE', 'CUTICLE'] },
      { name: 'Words meaning to do perfectly', words: ['ACE', 'CRUSH'] },
      { name: '___ POLISH', words: ['FRENCH', 'SHOE'] },
    ],
  },
  {
    id: 42,
    wildcard: 'PAGE',
    categories: [
      { name: 'Parts of a book', words: ['SPINE', 'CHAPTER'] },
      { name: 'Medieval ranks', words: ['KNIGHT', 'SQUIRE'] },
      { name: 'Ways to contact someone', words: ['CALL', 'TEXT'] },
      { name: 'Led Zeppelin surnames', words: ['PLANT', 'BONHAM'] },
    ],
  },
  {
    id: 43,
    wildcard: 'PAN',
    categories: [
      { name: 'Cookware', words: ['WOK', 'STOCKPOT'] },
      { name: 'Camera moves', words: ['ZOOM', 'TILT'] },
      { name: 'PETER ___', words: ['RABBIT', 'PARKER'] },
      { name: 'Words meaning to criticise harshly', words: ['SLAM', 'ROAST'] },
    ],
  },
  {
    id: 44,
    wildcard: 'PEN',
    categories: [
      { name: 'Writing tools', words: ['QUILL', 'MARKER'] },
      { name: 'Animal enclosures', words: ['STY', 'PADDOCK'] },
      { name: 'Female animals', words: ['MARE', 'VIXEN'] },
      { name: 'Words meaning to write', words: ['COMPOSE', 'SCRIBBLE'] },
    ],
  },
  {
    id: 45,
    wildcard: 'PIPE',
    categories: [
      { name: 'Plumbing parts', words: ['TAP', 'VALVE'] },
      { name: 'Things you smoke', words: ['CIGAR', 'HOOKAH'] },
      { name: 'Wind instruments', words: ['FLUTE', 'OBOE'] },
      { name: 'Keyboard symbols', words: ['TILDE', 'CARET'] },
    ],
  },
  {
    id: 46,
    wildcard: 'PLATE',
    categories: [
      { name: 'Crockery', words: ['BOWL', 'SAUCER'] },
      { name: 'Earth science terms', words: ['FAULT', 'MAGMA'] },
      { name: 'HOME ___', words: ['RUN', 'WORK'] },
      { name: 'Things on the back of a car', words: ['BUMPER', 'TOWBAR'] },
    ],
  },
  {
    id: 47,
    wildcard: 'POOL',
    categories: [
      { name: 'Cue sports', words: ['SNOOKER', 'BILLIARDS'] },
      { name: 'Bodies of water', words: ['POND', 'LAGOON'] },
      { name: 'Words meaning to combine', words: ['MERGE', 'BLEND'] },
      { name: '___ PARTY', words: ['HEN', 'BLOCK'] },
    ],
  },
  {
    id: 48,
    wildcard: 'POP',
    categories: [
      { name: 'Music genres', words: ['JAZZ', 'FOLK'] },
      { name: 'Fizzy drinks', words: ['SODA', 'COLA'] },
      { name: 'Words for Dad', words: ['PAPA', 'DADDY'] },
      { name: 'Rice Bubbles mascots', words: ['SNAP', 'CRACKLE'] },
    ],
  },
  {
    id: 49,
    wildcard: 'PUNCH',
    categories: [
      { name: 'Party drinks', words: ['SANGRIA', 'EGGNOG'] },
      { name: 'Boxing moves', words: ['JAB', 'UPPERCUT'] },
      { name: 'Office equipment', words: ['STAPLER', 'GUILLOTINE'] },
      { name: '___LINE', words: ['DEAD', 'HEAD'] },
    ],
  },
  {
    id: 50,
    wildcard: 'QUEEN',
    categories: [
      { name: 'Chess pieces', words: ['ROOK', 'BISHOP'] },
      { name: 'British rock bands', words: ['OASIS', 'BLUR'] },
      { name: 'Roles in a bee colony', words: ['DRONE', 'WORKER'] },
      { name: 'Bed sizes', words: ['SINGLE', 'DOUBLE'] },
    ],
  },
  {
    id: 51,
    wildcard: 'ROCK',
    categories: [
      { name: 'Words meaning to sway', words: ['SWAY', 'WOBBLE'] },
      { name: 'Stones', words: ['PEBBLE', 'BOULDER'] },
      { name: 'Hand game choices', words: ['PAPER', 'SCISSORS'] },
      { name: 'Music genres', words: ['REGGAE', 'GRUNGE'] },
    ],
  },
  {
    id: 52,
    wildcard: 'ROOT',
    categories: [
      { name: 'Parts of a plant', words: ['STEM', 'LEAF'] },
      { name: 'Maths terms', words: ['POWER', 'FACTOR'] },
      { name: 'Words meaning to support a team', words: ['CHEER', 'BARRACK'] },
      { name: 'Words for an origin', words: ['SOURCE', 'GENESIS'] },
    ],
  },
  {
    id: 53,
    wildcard: 'SHOT',
    categories: [
      { name: 'Drink measures', words: ['PINT', 'NIP'] },
      { name: 'Words for an attempt', words: ['STAB', 'CRACK'] },
      { name: 'Words for a photo', words: ['SNAP', 'PIC'] },
      { name: 'Words for an injection', words: ['JAB', 'BOOSTER'] },
    ],
  },
  {
    id: 54,
    wildcard: 'SINK',
    categories: [
      { name: 'Bathroom fixtures', words: ['TOILET', 'BATHTUB'] },
      { name: 'Ways to score in basketball', words: ['DUNK', 'LAYUP'] },
      { name: 'HEAT ___', words: ['WAVE', 'STROKE'] },
      { name: 'Words meaning to fall', words: ['PLUMMET', 'SLUMP'] },
    ],
  },
  {
    id: 55,
    wildcard: 'SOLE',
    categories: [
      { name: 'Flatfish', words: ['FLOUNDER', 'HALIBUT'] },
      { name: 'Parts of a shoe', words: ['LACE', 'TONGUE'] },
      { name: 'Words meaning only one', words: ['LONE', 'SINGLE'] },
      { name: 'Parts of the foot', words: ['ARCH', 'ANKLE'] },
    ],
  },
  {
    id: 56,
    wildcard: 'STAMP',
    categories: [
      { name: 'Things on an envelope', words: ['ADDRESS', 'POSTCODE'] },
      { name: 'Ways to walk heavily', words: ['STOMP', 'TRUDGE'] },
      { name: 'RUBBER ___', words: ['BAND', 'GLOVE'] },
      { name: 'Ways to put out a fire', words: ['DOUSE', 'SMOTHER'] },
    ],
  },
  {
    id: 57,
    wildcard: 'STRIKE',
    categories: [
      { name: 'Bowling terms', words: ['SPARE', 'GUTTER'] },
      { name: 'Forms of protest', words: ['PICKET', 'BOYCOTT'] },
      { name: 'Words meaning to hit', words: ['SWAT', 'CLOBBER'] },
      { name: 'LUCKY ___', words: ['DIP', 'CHARM'] },
    ],
  },
  {
    id: 58,
    wildcard: 'SUIT',
    categories: [
      { name: 'Formal wear', words: ['TUXEDO', 'BLAZER'] },
      { name: 'Court proceedings', words: ['TRIAL', 'APPEAL'] },
      { name: 'Words meaning to look good on', words: ['BEFIT', 'FLATTER'] },
      { name: 'SPACE ___', words: ['SHUTTLE', 'STATION'] },
    ],
  },
  {
    id: 59,
    wildcard: 'TABLE',
    categories: [
      { name: 'Furniture', words: ['DESK', 'SOFA'] },
      { name: 'Ways to present data', words: ['CHART', 'GRAPH'] },
      { name: 'ROUND ___', words: ['TRIP', 'ROBIN'] },
      { name: 'Flat-topped landforms', words: ['PLATEAU', 'MESA'] },
    ],
  },
  {
    id: 60,
    wildcard: 'TANK',
    categories: [
      { name: 'Military vehicles', words: ['JEEP', 'HUMVEE'] },
      { name: 'Water containers', words: ['CISTERN', 'BARREL'] },
      { name: 'Words meaning to fail', words: ['FLOP', 'FIZZLE'] },
      { name: '___TOP', words: ['LAP', 'ROOF'] },
    ],
  },
  {
    id: 61,
    wildcard: 'TIE',
    categories: [
      { name: 'Neckwear', words: ['SCARF', 'CRAVAT'] },
      { name: 'Words for a draw', words: ['STALEMATE', 'DEADLOCK'] },
      { name: 'Ways to fasten', words: ['BUCKLE', 'ZIP'] },
      { name: 'Words for a connection', words: ['BOND', 'LINK'] },
    ],
  },
  {
    id: 62,
    wildcard: 'TRACK',
    categories: [
      { name: 'Words for a song', words: ['TUNE', 'DITTY'] },
      { name: 'Racing venues', words: ['CIRCUIT', 'VELODROME'] },
      { name: 'Words meaning to follow', words: ['TRAIL', 'STALK'] },
      { name: 'Parts of a railway', words: ['SLEEPER', 'SIGNAL'] },
    ],
  },
  {
    id: 63,
    wildcard: 'TURKEY',
    categories: [
      { name: 'Poultry', words: ['DUCK', 'GOOSE'] },
      { name: 'Countries on the Black Sea', words: ['GEORGIA', 'ROMANIA'] },
      { name: 'Ten-pin bowling terms', words: ['LANE', 'SPLIT'] },
      { name: 'Words for a flop', words: ['DUD', 'LEMON'] },
    ],
  },
  {
    id: 64,
    wildcard: 'WAVE',
    categories: [
      { name: 'Ocean movements', words: ['TIDE', 'CURRENT'] },
      { name: 'Greetings', words: ['NOD', 'HANDSHAKE'] },
      { name: 'Hairstyles', words: ['BOB', 'PERM'] },
      { name: 'Things a stadium crowd does', words: ['CHANT', 'HECKLE'] },
    ],
  },
  {
    id: 65,
    wildcard: 'WING',
    categories: [
      { name: 'Parts of a bird', words: ['BEAK', 'TALON'] },
      { name: 'Parts of an aeroplane', words: ['FUSELAGE', 'RUDDER'] },
      { name: 'Parts of a hospital', words: ['WARD', 'THEATRE'] },
      { name: 'Rugby positions', words: ['HOOKER', 'FULLBACK'] },
    ],
  },
  {
    id: 66,
    wildcard: 'YARD',
    categories: [
      { name: 'Units of length', words: ['INCH', 'MILE'] },
      { name: 'Outdoor spaces at home', words: ['LAWN', 'PATIO'] },
      { name: 'SHIP___', words: ['WRECK', 'MATE'] },
      { name: 'JUNK ___', words: ['FOOD', 'MAIL'] },
    ],
  },
  {
    id: 67,
    wildcard: 'CHIP',
    categories: [
      { name: 'Potato sides', words: ['MASH', 'WEDGE'] },
      { name: 'Computer components', words: ['MOTHERBOARD', 'SSD'] },
      { name: 'Golf shots', words: ['DRIVE', 'PUTT'] },
      { name: 'Minor damage', words: ['DENT', 'SCRATCH'] },
    ],
  },
  {
    id: 68,
    wildcard: 'DUCK',
    categories: [
      { name: 'Water birds', words: ['SWAN', 'PELICAN'] },
      { name: 'Cricket terms', words: ['WICKET', 'OVER'] },
      { name: 'Words meaning to avoid', words: ['DODGE', 'EVADE'] },
      { name: 'Chinese restaurant dishes', words: ['CHOW MEIN', 'WONTON'] },
    ],
  },
  {
    id: 69,
    wildcard: 'DRUM',
    categories: [
      { name: 'Percussion instruments', words: ['TAMBOURINE', 'XYLOPHONE'] },
      { name: 'Large containers', words: ['KEG', 'VAT'] },
      { name: 'Parts of the ear', words: ['COCHLEA', 'LOBE'] },
      { name: '___ ROLL', words: ['EGG', 'SAUSAGE'] },
    ],
  },
  {
    id: 70,
    wildcard: 'FIRE',
    categories: [
      { name: 'Classical elements', words: ['WATER', 'EARTH'] },
      { name: 'Words meaning to sack', words: ['AXE', 'DISMISS'] },
      { name: '___PLACE', words: ['MARKET', 'WORK'] },
      { name: 'Things at a campsite', words: ['TENT', 'SWAG'] },
    ],
  },
  {
    id: 71,
    wildcard: 'GOLD',
    categories: [
      { name: 'Olympic medals', words: ['SILVER', 'BRONZE'] },
      { name: '___ COAST', words: ['SUNSHINE', 'IVORY'] },
      { name: 'Shades of yellow', words: ['LEMON', 'MUSTARD'] },
      { name: 'Things that glitter', words: ['SEQUIN', 'TINSEL'] },
    ],
  },
  {
    id: 72,
    wildcard: 'GRAVE',
    categories: [
      { name: 'Burial places', words: ['TOMB', 'CRYPT'] },
      { name: 'Words meaning serious', words: ['SOLEMN', 'SOMBRE'] },
      { name: 'Accent marks', words: ['ACUTE', 'UMLAUT'] },
      { name: '___ DIGGER', words: ['GOLD', 'TRENCH'] },
    ],
  },
  {
    id: 73,
    wildcard: 'JET',
    categories: [
      { name: 'Aircraft', words: ['GLIDER', 'BIPLANE'] },
      { name: 'Shades of black', words: ['EBONY', 'RAVEN'] },
      { name: 'Spurts of liquid', words: ['SQUIRT', 'GUSH'] },
      { name: '___SET', words: ['SUN', 'MIND'] },
    ],
  },
  {
    id: 74,
    wildcard: 'KIT',
    categories: [
      { name: 'Words for a sports uniform', words: ['STRIP', 'JERSEY'] },
      { name: 'Baby animals', words: ['CUB', 'JOEY'] },
      { name: 'Words for equipment', words: ['GEAR', 'TACKLE'] },
      { name: 'TOOL___', words: ['BOX', 'BELT'] },
    ],
  },
  {
    id: 75,
    wildcard: 'LINE',
    categories: [
      { name: 'Words for a queue', words: ['ROW', 'FILE'] },
      { name: 'Fishing gear', words: ['ROD', 'HOOK'] },
      { name: 'Parts of a poem', words: ['STANZA', 'VERSE'] },
      { name: 'Words for a wrinkle', words: ['CREASE', 'FURROW'] },
    ],
  },
  {
    id: 76,
    wildcard: 'MINT',
    categories: [
      { name: 'Herbs', words: ['BASIL', 'OREGANO'] },
      { name: 'Words for flawless', words: ['PRISTINE', 'IMMACULATE'] },
      { name: 'Places that handle money', words: ['BANK', 'TREASURY'] },
      { name: 'Shades of green', words: ['OLIVE', 'JADE'] },
    ],
  },
  {
    id: 77,
    wildcard: 'NOTE',
    categories: [
      { name: 'Things on sheet music', words: ['REST', 'STAVE'] },
      { name: 'Forms of payment', words: ['COIN', 'CHEQUE'] },
      { name: 'Short messages', words: ['MEMO', 'POSTCARD'] },
      { name: 'Words meaning to notice', words: ['SPOT', 'CLOCK'] },
    ],
  },
  {
    id: 78,
    wildcard: 'ORGAN',
    categories: [
      { name: 'Keyboard instruments', words: ['PIANO', 'HARPSICHORD'] },
      { name: 'Things that can be transplanted', words: ['CORNEA', 'KIDNEY'] },
      { name: 'Things in a church', words: ['PEW', 'PULPIT'] },
      { name: 'MOUTH ___', words: ['WASH', 'GUARD'] },
    ],
  },
  {
    id: 79,
    wildcard: 'PARK',
    categories: [
      { name: 'Green spaces', words: ['GARDEN', 'RESERVE'] },
      { name: 'Automatic gear positions', words: ['DRIVE', 'NEUTRAL'] },
      { name: 'NATIONAL ___', words: ['ANTHEM', 'TREASURE'] },
      { name: 'CAR ___', words: ['POOL', 'WASH'] },
    ],
  },
  {
    id: 80,
    wildcard: 'PLANE',
    categories: [
      { name: 'Flying machines', words: ['HELICOPTER', 'AIRSHIP'] },
      { name: 'Woodworking tools', words: ['CHISEL', 'LATHE'] },
      { name: 'Trees', words: ['OAK', 'ELM'] },
      { name: 'Geometry terms', words: ['AXIS', 'VERTEX'] },
    ],
  },
];
