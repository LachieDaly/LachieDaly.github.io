export interface RoundReview {
  text: string;
  /** Star rating out of 5 the reviewer gave, in half-star steps. Omit if unknown. */
  stars?: number;
}

export interface ReviewRound {
  id: string;
  /** The movie being trashed */
  answer: string;
  /** Accepted alternate titles (already normalised loosely — matching normalises again) */
  altAnswers: string[];
  year: number;
  /**
   * Three reviews ordered hardest → easiest. A wrong guess unlocks the next one.
   * ████ marks where the title (or a giveaway word) was redacted.
   */
  reviews: [RoundReview, RoundReview, RoundReview];
}

export const ROUNDS: ReviewRound[] = [
  {
    id: 'godfather',
    answer: 'The Godfather',
    altAnswers: ['godfather'],
    year: 1972,
    reviews: [
      { text: 'Whatever. Overrated as hell.', stars: 0.5 },
      { text: 'three hours of men mumbling at each other in dark rooms about family.', stars: 1 },
      {
        text: 'the horse head scene was the only interesting part. also stop leaving guns and taking cannoli.',
        stars: 0.5,
      },
    ],
  },
  {
    id: '2001',
    answer: '2001: A Space Odyssey',
    altAnswers: ['2001', '2001 a space odyssey', 'a space odyssey', 'space odyssey'],
    year: 1968,
    reviews: [
      {
        text: '████ is quite simply the worst thing to happen to cinema ever. Its forced profundity has caused millions of people all over the world to force themselves to like what is quite simply nothing more than an exercise in style.',
        stars: 0.5,
      },
      {
        text: "Monkey bit is better now I've finished it but the bloody entering the monolith and the starchild bit I could leave. Impressive for 68!",
        stars: 1,
      },
      {
        text: "20 minutes of apes, 20 minutes of screensavers, and a computer that won't open the pod bay doors. jazz.",
        stars: 1,
      },
    ],
  },
  {
    id: 'alien',
    answer: 'Alien',
    altAnswers: [],
    year: 1979,
    reviews: [
      { text: "it's just a haunted house movie on a spaceship.", stars: 1 },
      { text: 'the fact that the ████ murders all the white men first is so funny' },
      {
        text: 'in space no one can hear you snore. the cat surviving is the only good part. chestburster scene overrated.',
        stars: 0.5,
      },
    ],
  },
  {
    id: 'matrix-reloaded',
    answer: 'The Matrix Reloaded',
    altAnswers: ['matrix reloaded', 'the matrix 2', 'matrix 2'],
    year: 2003,
    reviews: [
      {
        text: 'Tiresome, loquacious, self-admiring hogwash, for all its fancy trappings and technical brio.',
        stars: 1.5,
      },
      {
        text: 'the first one changed cinema. this one has a ten minute rave scene and a hundred identical guys in suits.',
        stars: 1,
      },
      {
        text: 'Neo fights a hundred Agent Smiths and I felt nothing. burly brawl my ass.',
        stars: 1,
      },
    ],
  },
  {
    id: 'titanic',
    answer: 'Titanic',
    altAnswers: [],
    year: 1997,
    reviews: [
      { text: 'this would never happen in dubai', stars: 0.5 },
      {
        text: "three hours long and the boat doesn't even hit the iceberg until halfway through.",
        stars: 1,
      },
      {
        text: 'there was room on the door and nobody can convince me otherwise. also an old lady throws a priceless necklace into the ocean???',
        stars: 0.5,
      },
    ],
  },
  {
    id: 'interstellar',
    answer: 'Interstellar',
    altAnswers: [],
    year: 2014,
    reviews: [
      { text: 'no way they made a 3 hour long movie about the back of a bookshelf', stars: 1 },
      { text: 'love is apparently quantifiable and transcends dimensions. sure.', stars: 1 },
      {
        text: 'Matthew McConaughey cries at 23 years of video messages while a wave the size of a mountain rolls in. also Matt Damon is there for some reason.',
        stars: 1,
      },
    ],
  },
  {
    id: 'lighthouse',
    answer: 'The Lighthouse',
    altAnswers: ['lighthouse'],
    year: 2019,
    reviews: [
      { text: 'men will literally live in a ████ instead of going to therapy', stars: 1 },
      {
        text: 'black and white, square screen, two guys, one lamp. farting is not a plot.',
        stars: 0.5,
      },
      {
        text: 'Willem Dafoe talks like a pirate for two hours and Robert Pattinson fights a seagull. why did I watch this',
        stars: 1,
      },
    ],
  },
  {
    id: 'morbius',
    answer: 'Morbius',
    altAnswers: [],
    year: 2022,
    reviews: [
      { text: "it's ████in' time", stars: 0.5 },
      {
        text: 'they put this back in cinemas because of a meme and it flopped a second time. deserved.',
        stars: 0.5,
      },
      { text: 'Jared Leto as a vampire doctor. the meme was funnier than the movie.', stars: 0.5 },
    ],
  },
  {
    id: 'midsommar',
    answer: 'Midsommar',
    altAnswers: [],
    year: 2019,
    reviews: [
      { text: 'never doing drugs with white people again', stars: 1 },
      {
        text: 'a breakup movie disguised as horror. everything terrible happens in broad daylight.',
        stars: 1,
      },
      {
        text: 'florence pugh cries for two and a half hours, joins a swedish flower cult, and smiles while her boyfriend burns in a bear suit. couples therapy exists.',
        stars: 0.5,
      },
    ],
  },
  {
    id: 'marriage-story',
    answer: 'Marriage Story',
    altAnswers: [],
    year: 2019,
    reviews: [
      { text: 'two hot people yelling at each other for two hours. exhausting.', stars: 1 },
      {
        text: "could have been solved with one honest conversation and a lawyer who isn't Laura Dern.",
        stars: 1,
      },
      {
        text: 'Adam Driver punches a wall, sings Sondheim, and Scarlett Johansson takes the kid to LA. just divorce, the movie.',
        stars: 1,
      },
    ],
  },
  {
    id: 'dune',
    answer: 'Dune',
    altAnswers: ['dune part one', 'dune part 1', 'dune 2021'],
    year: 2021,
    reviews: [
      { text: 'sand', stars: 0.5 },
      {
        text: "two and a half hours of whispering and then it just... stops. 'this is only the beginning'??",
        stars: 1,
      },
      {
        text: "Timothée Chalamet dreams about Zendaya for the whole movie and she's in it for seven minutes. the spice must flow apparently.",
        stars: 0.5,
      },
    ],
  },
  {
    id: 'blair-witch',
    answer: 'The Blair Witch Project',
    altAnswers: ['blair witch project', 'blair witch'],
    year: 1999,
    reviews: [
      {
        text: "90 minutes of shaky camera footage of twigs and people screaming at trees. you don't even see anything.",
        stars: 0.5,
      },
      { text: 'the scariest part was the marketing pretending it was all real.', stars: 1 },
      {
        text: 'three film students get lost in the woods looking for a witch and film themselves crying about it. the map was right there.',
        stars: 0.5,
      },
    ],
  },
  {
    id: 'groundhog-day',
    answer: 'Groundhog Day',
    altAnswers: [],
    year: 1993,
    reviews: [
      { text: 'it is LITERALLY the same thing over and over and over and over again', stars: 0.5 },
      {
        text: 'how many times do we need to watch a man wake up to the same song at 6am',
        stars: 1,
      },
      {
        text: 'Bill Murray relives February 2nd forever in a small town with a weather-predicting rodent. we get it.',
        stars: 1,
      },
    ],
  },
  {
    id: 'casablanca',
    answer: 'Casablanca',
    altAnswers: [],
    year: 1942,
    reviews: [
      {
        text: "old people talking in a bar in black and white for two hours. I don't get it.",
        stars: 0.5,
      },
      { text: "'you must remember this' — no actually I don't, I fell asleep.", stars: 1 },
      {
        text: "Humphrey Bogart runs a bar in Morocco, says 'here's looking at you, kid' four times, and puts her on the plane anyway. of all the gin joints in all the world, I had to walk into this one.",
        stars: 0.5,
      },
    ],
  },
  {
    id: 'star-wars',
    answer: 'Star Wars',
    altAnswers: [
      'star wars a new hope',
      'a new hope',
      'star wars episode iv a new hope',
      'star wars episode iv',
      'star wars episode 4',
    ],
    year: 1977,
    reviews: [
      { text: 'I guess you had to be there in 1977', stars: 0.5 },
      {
        text: 'space wizards, a farm boy, and a plot hole the size of a thermal exhaust port.',
        stars: 1,
      },
      {
        text: 'Luke blows up the Death Star because a ghost old man told him to turn off his targeting computer. han shot first though, five stars for han.',
        stars: 1,
      },
    ],
  },
  {
    id: 'wizard-of-oz',
    answer: 'The Wizard of Oz',
    altAnswers: ['wizard of oz'],
    year: 1939,
    reviews: [
      { text: 'and then it was ALL A DREAM?? are you kidding me', stars: 0.5 },
      {
        text: 'the moral is the power was inside you all along, which means this entire movie was unnecessary.',
        stars: 1,
      },
      {
        text: 'Dorothy could have clicked her heels and gone home to Kansas in the first ten minutes. also the flying monkeys traumatised me, and not in a good way.',
        stars: 0.5,
      },
    ],
  },
  {
    id: 'singin-in-the-rain',
    answer: "Singin' in the Rain",
    altAnswers: ['singin in the rain', 'singing in the rain'],
    year: 1952,
    reviews: [
      { text: 'way too much singing for my taste', stars: 0.5 },
      {
        text: "he gets soaking wet and it's called the greatest scene in cinema history. it's a man with an umbrella.",
        stars: 1,
      },
      {
        text: 'Gene Kelly splashes in puddles for two hours while Hollywood switches to talkies. Moses supposes my patience.',
        stars: 1,
      },
    ],
  },
  {
    id: 'jaws',
    answer: 'Jaws',
    altAnswers: [],
    year: 1975,
    reviews: [
      { text: "the ████ looks so fake and it's barely even in the movie", stars: 1 },
      { text: "ruined beaches for an entire generation and for what. it's a fish.", stars: 0.5 },
      {
        text: "'you're gonna need a bigger boat' — no, you need a better animatronic. Spielberg owes me a beach holiday.",
        stars: 1,
      },
    ],
  },
  {
    id: 'avatar',
    answer: 'Avatar',
    altAnswers: [],
    year: 2009,
    reviews: [
      {
        text: "I've seen this movie twice and I couldn't tell you a single character's name",
        stars: 1,
      },
      { text: "it's Pocahontas with blue people and it made three billion dollars.", stars: 0.5 },
      {
        text: 'guy in a wheelchair becomes a ten-foot blue alien via sleep pod, falls in love on Pandora, and betrays the marines. unobtanium is the laziest name in sci-fi.',
        stars: 1,
      },
    ],
  },
  {
    id: 'drive',
    answer: 'Drive',
    altAnswers: [],
    year: 2011,
    reviews: [
      {
        text: "he says maybe 20 words in the entire movie and every guy I know calls him 'literally me'",
        stars: 0.5,
      },
      { text: 'expected fast cars, got 100 minutes of staring and synthwave.', stars: 1 },
      {
        text: "Ryan Gosling in a scorpion jacket stomps a man's head in an elevator and it's framed as romantic. a real human bean indeed.",
        stars: 1,
      },
    ],
  },
];
