// A list of 5-letter words for the game
export const WORD_LIST = [
  "APPLE", "BRAVE", "CAKES", "DANCE", "EAGLE", "FABLE", "GRAPE", "HEART", "IGLOO",
  "JOKER", "LEMON", "MUSIC", "NOVEL", "OCEAN", "PIANO", "QUIET", "RIVER", "SMILE",
  "TIGER", "UNITY", "VIVID", "WATER", "YOUNG", "ZEBRA", "AMBER", "BEACH", "CHARM",
  "DWELL", "EARTH", "FLAME", "GRAND", "HONOR", "IMAGE", "JELLY", "KNEEL", "LIGHT",
  "MAGIC", "NOBLE", "OLIVE", "PITCH", "QUEEN", "REBEL", "SOLVE", "TRAIN", "URBAN",
  "VALUE", "WASTE", "XEROX", "YIELD", "ZESTY"
];

// Get a random word for puzzle
export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

// Generate a word based on a seed (date for daily challenges)
export function getWordForDate(date: Date): string {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash % WORD_LIST.length);
  return WORD_LIST[index];
}

// Validate if a guess is a valid word
export function isValidWord(word: string): boolean {
  return WORD_LIST.includes(word);
}

// Get the current daily word
export function getDailyWord(): string {
  return getWordForDate(new Date());
}

// Generate hints for a given word
export function generateHints(word: string): string[] {
  const hints = [];
  
  // Hint 1: First letter
  hints.push(`The word starts with the letter ${word[0]}`);
  
  // Hint 2: Number of vowels
  const vowels = word.match(/[AEIOU]/g) || [];
  hints.push(`The word contains ${vowels.length} vowel${vowels.length !== 1 ? 's' : ''}`);
  
  // Hint 3: Position based hint
  const position = Math.floor(Math.random() * word.length);
  hints.push(`The letter at position ${position + 1} is ${word[position]}`);
  
  return hints;
}

// Game stats interface
export interface GameStats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
  lastPlayed: string | null;
  lastCompleted: string | null;
}

// Initialize empty stats
export function initStats(): GameStats {
  return {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0, 0],
    lastPlayed: null,
    lastCompleted: null
  };
}

// Update stats after a game
export function updateStats(stats: GameStats, won: boolean, attempts: number): GameStats {
  const today = new Date().toISOString().split('T')[0];
  const newStats = { ...stats };
  
  newStats.played += 1;
  
  if (won) {
    newStats.wins += 1;
    newStats.currentStreak += 1;
    newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
    newStats.distribution[attempts - 1] += 1;
    newStats.lastCompleted = today;
  } else {
    newStats.currentStreak = 0;
  }
  
  newStats.lastPlayed = today;
  
  return newStats;
}

// Check if the player has already played today
export function hasPlayedToday(stats: GameStats): boolean {
  const today = new Date().toISOString().split('T')[0];
  return stats.lastPlayed === today;
} 