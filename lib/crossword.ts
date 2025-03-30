import { CrosswordCell, CrosswordData, Clue } from '@/components/CrosswordGrid';

// Sample crossword data for different difficulty levels
const crosswordData: Record<string, CrosswordData> = {
  // Easy level - 7x7 grid
  easy: generateEasyCrossword(),
  
  // Medium level - 9x9 grid
  medium: generateMediumCrossword(),
  
  // Hard level - 11x11 grid
  hard: generateHardCrossword()
};

// Get crossword data for a specific date and difficulty
export function getCrosswordForDay(date: Date, difficulty: 'easy' | 'medium' | 'hard'): CrosswordData {
  // For now, we'll use the sample data
  // In a production app, this would generate unique puzzles per day
  return crosswordData[difficulty];
}

// Create an empty grid with the given dimensions
function createEmptyGrid(width: number, height: number): CrosswordCell[][] {
  const grid: CrosswordCell[][] = [];
  
  for (let row = 0; row < height; row++) {
    grid[row] = [];
    for (let col = 0; col < width; col++) {
      grid[row][col] = {
        letter: '',
        isActive: false
      };
    }
  }
  
  return grid;
}

// Generate an easy 7x7 crossword
function generateEasyCrossword(): CrosswordData {
  const grid = createEmptyGrid(7, 7);
  const acrossClues: Clue[] = [];
  const downClues: Clue[] = [];
  
  // Word 1 (Across): PUZZLE (1)
  for (let i = 0; i < 6; i++) {
    grid[0][i].isActive = true;
    grid[0][i].letter = '';
    grid[0][i].acrossWord = 1;
  }
  grid[0][0].number = 1;
  acrossClues.push({
    number: 1,
    text: "What this game is",
    answer: "PUZZLE",
    row: 0,
    col: 0,
    direction: 'across'
  });
  
  // Word 2 (Down): PYTHON (1)
  for (let i = 0; i < 6; i++) {
    grid[i][0].isActive = true;
    grid[i][0].letter = '';
    grid[i][0].downWord = 1;
  }
  downClues.push({
    number: 1,
    text: "Popular programming language named after a snake",
    answer: "PYTHON",
    row: 0,
    col: 0,
    direction: 'down'
  });
  
  // Word 3 (Across): CODE (2)
  for (let i = 0; i < 4; i++) {
    grid[2][i + 2].isActive = true;
    grid[2][i + 2].letter = '';
    grid[2][i + 2].acrossWord = 2;
  }
  grid[2][2].number = 2;
  acrossClues.push({
    number: 2,
    text: "What programmers write",
    answer: "CODE",
    row: 2,
    col: 2,
    direction: 'across'
  });
  
  // Word 4 (Down): ZOOM (3)
  for (let i = 0; i < 4; i++) {
    grid[i + 2][3].isActive = true;
    grid[i + 2][3].letter = '';
    grid[i + 2][3].downWord = 3;
  }
  grid[2][3].number = 3;
  downClues.push({
    number: 3,
    text: "Popular video conferencing app",
    answer: "ZOOM",
    row: 2,
    col: 3,
    direction: 'down'
  });
  
  // Word 5 (Across): WEB (4)
  for (let i = 0; i < 3; i++) {
    grid[5][i + 2].isActive = true;
    grid[5][i + 2].letter = '';
    grid[5][i + 2].acrossWord = 4;
  }
  grid[5][2].number = 4;
  acrossClues.push({
    number: 4,
    text: "The World Wide ___",
    answer: "WEB",
    row: 5,
    col: 2,
    direction: 'across'
  });
  
  // Word 6 (Down): DEV (5)
  for (let i = 0; i < 3; i++) {
    grid[i + 2][5].isActive = true;
    grid[i + 2][5].letter = '';
    grid[i + 2][5].downWord = 5;
  }
  grid[2][5].number = 5;
  downClues.push({
    number: 5,
    text: "Short for developer",
    answer: "DEV",
    row: 2,
    col: 5,
    direction: 'down'
  });
  
  return { grid, acrossClues, downClues };
}

// Generate a medium 9x9 crossword
function generateMediumCrossword(): CrosswordData {
  const grid = createEmptyGrid(9, 9);
  const acrossClues: Clue[] = [];
  const downClues: Clue[] = [];
  
  // Word 1 (Across): JAVASCRIPT (1)
  for (let i = 0; i < 9; i++) {
    grid[0][i].isActive = true;
    grid[0][i].letter = '';
    grid[0][i].acrossWord = 1;
  }
  grid[0][0].number = 1;
  acrossClues.push({
    number: 1,
    text: "Popular web programming language",
    answer: "JAVASCRIP",
    row: 0,
    col: 0,
    direction: 'across'
  });
  
  // Word 2 (Down): JAVA (1)
  for (let i = 0; i < 4; i++) {
    grid[i][0].isActive = true;
    grid[i][0].letter = '';
    grid[i][0].downWord = 1;
  }
  downClues.push({
    number: 1,
    text: "Programming language that runs on JVM",
    answer: "JAVA",
    row: 0,
    col: 0,
    direction: 'down'
  });
  
  // Word 3 (Across): API (2)
  for (let i = 0; i < 3; i++) {
    grid[2][i + 2].isActive = true;
    grid[2][i + 2].letter = '';
    grid[2][i + 2].acrossWord = 2;
  }
  grid[2][2].number = 2;
  acrossClues.push({
    number: 2,
    text: "Interface for software communication (abbr.)",
    answer: "API",
    row: 2,
    col: 2,
    direction: 'across'
  });
  
  // Word 4 (Down): REACT (3)
  for (let i = 0; i < 5; i++) {
    grid[i + 2][4].isActive = true;
    grid[i + 2][4].letter = '';
    grid[i + 2][4].downWord = 3;
  }
  grid[2][4].number = 3;
  downClues.push({
    number: 3,
    text: "Popular frontend library by Facebook",
    answer: "REACT",
    row: 2,
    col: 4,
    direction: 'down'
  });
  
  // Word 5 (Across): NODE (4)
  for (let i = 0; i < 4; i++) {
    grid[4][i + 1].isActive = true;
    grid[4][i + 1].letter = '';
    grid[4][i + 1].acrossWord = 4;
  }
  grid[4][1].number = 4;
  acrossClues.push({
    number: 4,
    text: "___ JS (JavaScript runtime)",
    answer: "NODE",
    row: 4,
    col: 1,
    direction: 'across'
  });
  
  // Word 6 (Across): CSS (5)
  for (let i = 0; i < 3; i++) {
    grid[6][i + 3].isActive = true;
    grid[6][i + 3].letter = '';
    grid[6][i + 3].acrossWord = 5;
  }
  grid[6][3].number = 5;
  acrossClues.push({
    number: 5,
    text: "Styling language for web (abbr.)",
    answer: "CSS",
    row: 6,
    col: 3,
    direction: 'across'
  });
  
  // Word 7 (Down): SQL (6)
  for (let i = 0; i < 3; i++) {
    grid[i + 6][7].isActive = true;
    grid[i + 6][7].letter = '';
    grid[i + 6][7].downWord = 6;
  }
  grid[6][7].number = 6;
  downClues.push({
    number: 6,
    text: "Database query language (abbr.)",
    answer: "SQL",
    row: 6,
    col: 7,
    direction: 'down'
  });
  
  return { grid, acrossClues, downClues };
}

// Generate a hard 11x11 crossword
function generateHardCrossword(): CrosswordData {
  const grid = createEmptyGrid(11, 11);
  const acrossClues: Clue[] = [];
  const downClues: Clue[] = [];
  
  // Word 1 (Across): TYPESCRIPT (1)
  for (let i = 0; i < 10; i++) {
    grid[0][i].isActive = true;
    grid[0][i].letter = '';
    grid[0][i].acrossWord = 1;
  }
  grid[0][0].number = 1;
  acrossClues.push({
    number: 1,
    text: "JavaScript superset with static typing",
    answer: "TYPESCRIPT",
    row: 0,
    col: 0,
    direction: 'across'
  });
  
  // Word 2 (Down): TAILWIND (1)
  for (let i = 0; i < 8; i++) {
    grid[i][0].isActive = true;
    grid[i][0].letter = '';
    grid[i][0].downWord = 1;
  }
  downClues.push({
    number: 1,
    text: "Utility-first CSS framework",
    answer: "TAILWIND",
    row: 0,
    col: 0,
    direction: 'down'
  });
  
  // Word 3 (Across): NEXT (2)
  for (let i = 0; i < 4; i++) {
    grid[2][i + 3].isActive = true;
    grid[2][i + 3].letter = '';
    grid[2][i + 3].acrossWord = 2;
  }
  grid[2][3].number = 2;
  acrossClues.push({
    number: 2,
    text: "___ .js (React framework)",
    answer: "NEXT",
    row: 2,
    col: 3,
    direction: 'across'
  });
  
  // Word 4 (Down): REDUX (3)
  for (let i = 0; i < 5; i++) {
    grid[i + 3][3].isActive = true;
    grid[i + 3][3].letter = '';
    grid[i + 3][3].downWord = 3;
  }
  grid[3][3].number = 3;
  downClues.push({
    number: 3,
    text: "State management library for React",
    answer: "REDUX",
    row: 3,
    col: 3,
    direction: 'down'
  });
  
  // Word 5 (Across): EXPRESS (4)
  for (let i = 0; i < 7; i++) {
    grid[4][i + 2].isActive = true;
    grid[4][i + 2].letter = '';
    grid[4][i + 2].acrossWord = 4;
  }
  grid[4][2].number = 4;
  acrossClues.push({
    number: 4,
    text: "Popular Node.js web framework",
    answer: "EXPRESS",
    row: 4,
    col: 2,
    direction: 'across'
  });
  
  // Word 6 (Down): GRAPHQL (5)
  for (let i = 0; i < 7; i++) {
    grid[i + 2][7].isActive = true;
    grid[i + 2][7].letter = '';
    grid[i + 2][7].downWord = 5;
  }
  grid[2][7].number = 5;
  downClues.push({
    number: 5,
    text: "API query language developed by Facebook",
    answer: "GRAPHQL",
    row: 2,
    col: 7,
    direction: 'down'
  });
  
  // Word 7 (Across): MONGO (6)
  for (let i = 0; i < 5; i++) {
    grid[6][i + 1].isActive = true;
    grid[6][i + 1].letter = '';
    grid[6][i + 1].acrossWord = 6;
  }
  grid[6][1].number = 6;
  acrossClues.push({
    number: 6,
    text: "___ DB (NoSQL database)",
    answer: "MONGO",
    row: 6,
    col: 1,
    direction: 'across'
  });
  
  // Word 8 (Down): VUE (7)
  for (let i = 0; i < 3; i++) {
    grid[i + 8][5].isActive = true;
    grid[i + 8][5].letter = '';
    grid[i + 8][5].downWord = 7;
  }
  grid[8][5].number = 7;
  downClues.push({
    number: 7,
    text: "Progressive JavaScript framework",
    answer: "VUE",
    row: 8,
    col: 5,
    direction: 'down'
  });
  
  // Word 9 (Across): DOCKER (8)
  for (let i = 0; i < 6; i++) {
    grid[8][i + 2].isActive = true;
    grid[8][i + 2].letter = '';
    grid[8][i + 2].acrossWord = 8;
  }
  grid[8][2].number = 8;
  acrossClues.push({
    number: 8,
    text: "Containerization platform",
    answer: "DOCKER",
    row: 8,
    col: 2,
    direction: 'across'
  });
  
  // Word 10 (Across): GIT (9)
  for (let i = 0; i < 3; i++) {
    grid[10][i + 4].isActive = true;
    grid[10][i + 4].letter = '';
    grid[10][i + 4].acrossWord = 9;
  }
  grid[10][4].number = 9;
  acrossClues.push({
    number: 9,
    text: "Version control system",
    answer: "GIT",
    row: 10,
    col: 4,
    direction: 'across'
  });
  
  return { grid, acrossClues, downClues };
}

// Get crossword progress from local storage
export function getSavedProgress(): { [key: string]: string[][] } | null {
  if (typeof window === 'undefined') return null;
  
  const savedProgress = localStorage.getItem('crosswordProgress');
  if (!savedProgress) return null;
  
  try {
    return JSON.parse(savedProgress);
  } catch (e) {
    return null;
  }
}

// Save crossword progress to local storage
export function saveProgress(puzzle: string, answers: string[][]): void {
  if (typeof window === 'undefined') return;
  
  const savedProgress = getSavedProgress() || {};
  savedProgress[puzzle] = answers;
  
  localStorage.setItem('crosswordProgress', JSON.stringify(savedProgress));
}

// Check if all words in the crossword are correct
export function checkCrosswordCompletion(grid: CrosswordCell[][]): boolean {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell.isActive && cell.letter === '') {
        return false;
      }
    }
  }
  return true;
}

// Calculate score based on completion time, hints used, and difficulty
export function calculateScore(
  completionTime: number, // in seconds
  hintsUsed: number,
  difficulty: 'easy' | 'medium' | 'hard'
): number {
  // Base score by difficulty
  const baseScores = {
    easy: 100,
    medium: 150,
    hard: 200
  };
  
  // Time penalties (seconds)
  const timePenalties = {
    easy: 300, // 5 minutes for easy
    medium: 600, // 10 minutes for medium
    hard: 900 // 15 minutes for hard
  };
  
  // Hint penalties
  const hintPenalty = 10;
  
  // Calculate base score
  let score = baseScores[difficulty];
  
  // Subtract for time (up to 50% of base score)
  const maxTimePenalty = baseScores[difficulty] * 0.5;
  const timePenalty = Math.min(
    maxTimePenalty,
    (completionTime / timePenalties[difficulty]) * maxTimePenalty
  );
  score -= timePenalty;
  
  // Subtract for hints
  score -= hintsUsed * hintPenalty;
  
  // Ensure the score is at least 10
  return Math.max(10, Math.round(score));
} 