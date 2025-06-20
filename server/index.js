import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Quiz questions data
const questions = [
  {
    id: 1,
    question: "When faced with a Monday morning, you:",
    options: [
      { text: "Embrace it like a warrior charging into battle", value: "adventure" },
      { text: "Hide under blankets until noon", value: "procrastination" },
      { text: "Create an elaborate coffee ritual", value: "creative" },
      { text: "Pretend it's still Sunday", value: "wisdom" }
    ]
  },
  {
    id: 2,
    question: "Your ideal superpower would be:",
    options: [
      { text: "Invisibility (perfect for avoiding awkward conversations)", value: "social" },
      { text: "Time manipulation (mostly for extra sleep)", value: "procrastination" },
      { text: "Emotional immunity shields", value: "emotional" },
      { text: "Spontaneous adventure portals", value: "adventure" }
    ]
  },
  {
    id: 3,
    question: "When someone cancels plans last minute, you:",
    options: [
      { text: "Secretly celebrate your newfound freedom", value: "social" },
      { text: "Feel a mix of relief and mild disappointment", value: "emotional" },
      { text: "Immediately plan something more exciting", value: "adventure" },
      { text: "Use it as an excuse to start a new creative project", value: "creative" }
    ]
  },
  {
    id: 4,
    question: "Your approach to learning new things:",
    options: [
      { text: "Deep dive into random Wikipedia rabbit holes", value: "wisdom" },
      { text: "Watch 47 YouTube tutorials but never actually practice", value: "procrastination" },
      { text: "Learn by accidentally breaking things", value: "creative" },
      { text: "Jump in headfirst and figure it out as you go", value: "adventure" }
    ]
  },
  {
    id: 5,
    question: "At a party, you're most likely to be:",
    options: [
      { text: "The person who knows everyone's life story by the end", value: "wisdom" },
      { text: "Hiding in the kitchen with the host's pet", value: "social" },
      { text: "Starting an impromptu dance battle", value: "adventure" },
      { text: "Turning napkins into origami masterpieces", value: "creative" }
    ]
  },
  {
    id: 6,
    question: "Your relationship with deadlines is:",
    options: [
      { text: "What deadline? *nervous laughter*", value: "procrastination" },
      { text: "I finish early and then panic that I forgot something", value: "emotional" },
      { text: "Deadlines are suggestions, art happens when it happens", value: "creative" },
      { text: "I meet them, but not without several existential crises", value: "wisdom" }
    ]
  },
  {
    id: 7,
    question: "When faced with technology problems, you:",
    options: [
      { text: "Turn it off and on again (and maybe cry a little)", value: "emotional" },
      { text: "Ask a younger relative for help", value: "wisdom" },
      { text: "Pretend it's not happening", value: "social" },
      { text: "Take it apart to see how it works", value: "creative" }
    ]
  },
  {
    id: 8,
    question: "Your ideal vacation involves:",
    options: [
      { text: "Backpacking through places with unpronounceable names", value: "adventure" },
      { text: "A cabin with no WiFi and many books", value: "wisdom" },
      { text: "Staycation with elaborate themed days", value: "creative" },
      { text: "Booking a trip and then rescheduling it 6 times", value: "procrastination" }
    ]
  },
  {
    id: 9,
    question: "When giving advice to friends, you:",
    options: [
      { text: "Quote ancient philosophers and movie characters equally", value: "wisdom" },
      { text: "Suggest the most dramatic possible solution", value: "adventure" },
      { text: "Listen empathetically while slowly dying inside", value: "emotional" },
      { text: "Offer to help them make a vision board", value: "creative" }
    ]
  },
  {
    id: 10,
    question: "Your morning routine is:",
    options: [
      { text: "Snooze button Olympics champion", value: "procrastination" },
      { text: "Elaborate coffee ceremony with specific music", value: "creative" },
      { text: "Quick shower and disappear before anyone talks to you", value: "social" },
      { text: "Meditation, stretching, and reading philosophical quotes", value: "wisdom" }
    ]
  },
  {
    id: 11,
    question: "When someone disagrees with you online, you:",
    options: [
      { text: "Write a dissertation-length response, then delete it", value: "emotional" },
      { text: "Block them and pretend it never happened", value: "social" },
      { text: "Start researching their point for 3 hours", value: "wisdom" },
      { text: "Begin typing a response but get distracted by cat videos", value: "procrastination" }
    ]
  },
  {
    id: 12,
    question: "Your spirit animal would be:",
    options: [
      { text: "A caffeinated owl (wise but jittery)", value: "wisdom" },
      { text: "A chameleon social media manager", value: "social" },
      { text: "A dragon hoarding art supplies", value: "creative" },
      { text: "A sloth with commitment issues", value: "procrastination" }
    ]
  }
];

// Character classes and titles
const characterClasses = {
  emotional: ["Emotional Bard", "Feelings Paladin", "Empathy Wizard", "Mood Ranger"],
  social: ["Shadow Diplomat", "Introvert Ninja", "Social Stealth Master", "Conversation Rogue"],
  creative: ["Chaos Artist", "Inspiration Mage", "Creative Storm Caller", "Artistic Alchemist"],
  wisdom: ["Ancient Scroll Keeper", "Philosophy Monk", "Wisdom Gatherer", "Knowledge Druid"],
  adventure: ["Wanderlust Warrior", "Explorer Extraordinaire", "Adventure Seeker", "Quest Crusader"],
  procrastination: ["Master Procrastinator", "Deadline Dancer", "Temporal Rebel", "Time Bending Sage"]
};

const backstoryTemplates = {
  emotional: [
    "Born under a full moon during a poetry reading, {title} learned early that feelings are just spells waiting to be cast.",
    "After accidentally crying at a commercial about insurance, {title} embraced their destiny as a guardian of all emotions.",
    "Raised by a family of therapists and poets, {title} can sense your feelings from three kingdoms away."
  ],
  social: [
    "Trained in the ancient art of avoiding small talk, {title} can disappear from conversations faster than WiFi in a storm.",
    "Legend says {title} once spent three days at a party without anyone noticing they were there.",
    "Born with the natural ability to make themselves invisible during group photos, {title} mastered the art of selective socializing."
  ],
  creative: [
    "Discovered at age 7 turning homework into abstract art, {title} has been transforming chaos into beauty ever since.",
    "After accidentally inventing a new color while mixing paint, {title} became the realm's most unpredictable creative force.",
    "Born during an art supply store explosion, {title} emerged with paint in their veins and glitter in their soul."
  ],
  wisdom: [
    "Spent their youth reading every book in the library, including the phone book (for wisdom about human nature).",
    "After memorizing 10,000 philosophical quotes, {title} discovered that the real wisdom was the memes they made along the way.",
    "Legend tells of {title} solving life's greatest mysteries during particularly long shower thoughts."
  ],
  adventure: [
    "Born with a compass for a heart, {title} has never met a horizon they didn't want to chase.",
    "After getting lost in their own neighborhood and discovering three new coffee shops, {title} embraced their calling as an urban explorer.",
    "Raised by maps and guided by wanderlust, {title} turns every errand into an epic quest."
  ],
  procrastination: [
    "Mastered the art of doing tomorrow what could be done today, then doing it next week instead.",
    "After successfully avoiding responsibility for so long that it became a skill, {title} was crowned the Temporal Rebel.",
    "Born fashionably late to their own birth, {title} has been perfecting the art of 'I'll do it later' ever since."
  ]
};

// Calculate persona based on answers
app.post('/api/generate-persona', (req, res) => {
  const { answers } = req.body;
  
  // Count answers by category
  const stats = {
    emotional: 0,
    social: 0,
    creative: 0,
    wisdom: 0,
    adventure: 0,
    procrastination: 0
  };

  answers.forEach(answer => {
    if (stats.hasOwnProperty(answer)) {
      stats[answer]++;
    }
  });

  // Find dominant trait
  const dominantTrait = Object.keys(stats).reduce((a, b) => 
    stats[a] > stats[b] ? a : b
  );

  // Generate random values for stats (30-100 range, with bonus for dominant traits)
  const generateStat = (category) => {
    const base = Math.floor(Math.random() * 40) + 30; // 30-70
    const bonus = stats[category] * 5; // 5 points per answer in that category
    return Math.min(100, base + bonus);
  };

  const persona = {
    title: characterClasses[dominantTrait][Math.floor(Math.random() * characterClasses[dominantTrait].length)],
    dominantTrait,
    stats: {
      emotional: generateStat('emotional'),
      social: generateStat('social'),
      creative: generateStat('creative'),
      wisdom: generateStat('wisdom'),
      adventure: generateStat('adventure'),
      procrastination: generateStat('procrastination')
    },
    backstory: backstoryTemplates[dominantTrait][Math.floor(Math.random() * backstoryTemplates[dominantTrait].length)]
  };

  // Replace {title} placeholder in backstory
  persona.backstory = persona.backstory.replace('{title}', persona.title);

  res.json(persona);
});

// Get quiz questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});