'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { CrosswordData, CrosswordCell, Clue } from '@/components/CrosswordGrid';
import { getCrosswordForDay, saveProgress, getSavedProgress, checkCrosswordCompletion, calculateScore } from './crossword';

type Direction = 'across' | 'down';

interface GameContextType {
  // Grid and clues
  grid: CrosswordCell[][];
  acrossClues: Clue[];
  downClues: Clue[];
  
  // Game state
  currentRow: number;
  currentCol: number;
  direction: Direction;
  difficulty: 'easy' | 'medium' | 'hard';
  gameStarted: boolean;
  gameCompleted: boolean;
  hintsUsed: number;
  startTime: Date | null;
  endTime: Date | null;
  score: number;
  
  // Active clue tracking
  activeClue: Clue | null;
  
  // Actions
  setCell: (row: number, col: number, letter: string) => void;
  selectCell: (row: number, col: number) => void;
  toggleDirection: () => void;
  setDirection: (direction: Direction) => void;
  startGame: (difficulty: 'easy' | 'medium' | 'hard') => void;
  useHint: () => void;
  selectClue: (clue: Clue) => void;
  resetGame: () => void;
  revealCell: (row: number, col: number) => void;
  revealWord: (clue: Clue) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Grid state
  const [grid, setGrid] = useState<CrosswordCell[][]>([]);
  const [acrossClues, setAcrossClues] = useState<Clue[]>([]);
  const [downClues, setDownClues] = useState<Clue[]>([]);
  
  // Game state
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [direction, setDirectionState] = useState<Direction>('across');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [score, setScore] = useState(0);
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  
  // Load crossword for today
  const loadCrossword = (difficulty: 'easy' | 'medium' | 'hard') => {
    const today = new Date();
    const crosswordData = getCrosswordForDay(today, difficulty);
    
    setGrid(crosswordData.grid);
    setAcrossClues(crosswordData.acrossClues);
    setDownClues(crosswordData.downClues);
    
    // Find the first active cell to start with
    let found = false;
    for (let row = 0; row < crosswordData.grid.length; row++) {
      for (let col = 0; col < crosswordData.grid[row].length; col++) {
        if (crosswordData.grid[row][col].isActive && !found) {
          setCurrentRow(row);
          setCurrentCol(col);
          found = true;
          break;
        }
      }
      if (found) break;
    }
    
    // Set the initial active clue
    const firstAcrossClue = crosswordData.acrossClues.length > 0 ? crosswordData.acrossClues[0] : null;
    setActiveClue(firstAcrossClue);
  };
  
  // Start a new game
  const startGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(difficulty);
    loadCrossword(difficulty);
    setGameStarted(true);
    setGameCompleted(false);
    setHintsUsed(0);
    setStartTime(new Date());
    setEndTime(null);
    setScore(0);
    setDirectionState('across');
  };
  
  // Reset the game
  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setGrid([]);
    setAcrossClues([]);
    setDownClues([]);
    setHintsUsed(0);
    setStartTime(null);
    setEndTime(null);
    setScore(0);
  };
  
  // Check if the game is complete after each move
  useEffect(() => {
    if (gameStarted && !gameCompleted && grid.length > 0) {
      const isComplete = checkCrosswordCompletion(grid);
      
      if (isComplete) {
        setGameCompleted(true);
        const end = new Date();
        setEndTime(end);
        
        // Calculate score
        if (startTime) {
          const timeInSeconds = Math.floor((end.getTime() - startTime.getTime()) / 1000);
          const finalScore = calculateScore(timeInSeconds, hintsUsed, difficulty);
          setScore(finalScore);
        }
      }
    }
  }, [grid, gameStarted, gameCompleted]);
  
  // Set a letter in a cell
  const setCell = (row: number, col: number, letter: string) => {
    if (!gameStarted || gameCompleted) return;
    
    const newGrid = [...grid];
    
    // Only allow setting cells that are active
    if (newGrid[row] && newGrid[row][col] && newGrid[row][col].isActive) {
      newGrid[row][col].letter = letter.toUpperCase();
      setGrid(newGrid);
      
      // Move to the next cell in the current direction
      moveToNextCell(row, col);
      
      // Save progress
      const puzzleId = `${difficulty}-${new Date().toISOString().split('T')[0]}`;
      const letters = newGrid.map(row => row.map(cell => cell.letter));
      saveProgress(puzzleId, letters);
    }
  };
  
  // Move to the next cell based on the current direction
  const moveToNextCell = (row: number, col: number) => {
    if (direction === 'across') {
      // Try to move to the next cell to the right if it's active
      if (col + 1 < grid[row].length && grid[row][col + 1].isActive) {
        setCurrentCol(col + 1);
      }
    } else {
      // Try to move to the next cell below if it's active
      if (row + 1 < grid.length && grid[row + 1][col].isActive) {
        setCurrentRow(row + 1);
      }
    }
  };
  
  // Handle cell selection
  const selectCell = (row: number, col: number) => {
    if (!gameStarted || gameCompleted) return;
    
    if (grid[row] && grid[row][col] && grid[row][col].isActive) {
      // If selecting the same cell, toggle direction
      if (row === currentRow && col === currentCol) {
        toggleDirection();
      } else {
        setCurrentRow(row);
        setCurrentCol(col);
      }
      
      // Update the active clue
      updateActiveClue(row, col);
    }
  };
  
  // Update the active clue based on the current cell and direction
  const updateActiveClue = (row: number, col: number) => {
    const cell = grid[row][col];
    
    if (direction === 'across') {
      if (cell.acrossWord) {
        const clue = acrossClues.find(c => c.number === cell.acrossWord);
        if (clue) setActiveClue(clue);
      } else {
        // If no across word at this cell, check if we can switch to down
        if (cell.downWord) {
          const clue = downClues.find(c => c.number === cell.downWord);
          if (clue) {
            setDirectionState('down');
            setActiveClue(clue);
          }
        }
      }
    } else {
      if (cell.downWord) {
        const clue = downClues.find(c => c.number === cell.downWord);
        if (clue) setActiveClue(clue);
      } else {
        // If no down word at this cell, check if we can switch to across
        if (cell.acrossWord) {
          const clue = acrossClues.find(c => c.number === cell.acrossWord);
          if (clue) {
            setDirectionState('across');
            setActiveClue(clue);
          }
        }
      }
    }
  };
  
  // Toggle direction between across and down
  const toggleDirection = () => {
    const newDirection = direction === 'across' ? 'down' : 'across';
    setDirectionState(newDirection);
    updateActiveClue(currentRow, currentCol);
  };
  
  // Select a clue and navigate to its first cell
  const selectClue = (clue: Clue) => {
    if (!gameStarted || gameCompleted) return;
    
    setActiveClue(clue);
    setCurrentRow(clue.row);
    setCurrentCol(clue.col);
    setDirectionState(clue.direction);
  };
  
  // Use a hint (reveal a random empty cell)
  const useHint = () => {
    if (!gameStarted || gameCompleted) return;
    
    // Find all empty cells
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].isActive && grid[row][col].letter === '') {
          emptyCells.push({ row, col });
        }
      }
    }
    
    if (emptyCells.length > 0) {
      // Reveal a random empty cell
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      revealCell(row, col);
      setHintsUsed(hintsUsed + 1);
    }
  };
  
  // Reveal a specific cell
  const revealCell = (row: number, col: number) => {
    if (!gameStarted || gameCompleted) return;
    
    // Find the correct letter for this cell
    let correctLetter = '';
    
    // Check across clues
    if (grid[row][col].acrossWord) {
      const clue = acrossClues.find(c => c.number === grid[row][col].acrossWord);
      if (clue) {
        const index = col - clue.col;
        if (index >= 0 && index < clue.answer.length) {
          correctLetter = clue.answer[index];
        }
      }
    }
    
    // If not found, check down clues
    if (correctLetter === '' && grid[row][col].downWord) {
      const clue = downClues.find(c => c.number === grid[row][col].downWord);
      if (clue) {
        const index = row - clue.row;
        if (index >= 0 && index < clue.answer.length) {
          correctLetter = clue.answer[index];
        }
      }
    }
    
    if (correctLetter !== '') {
      const newGrid = [...grid];
      newGrid[row][col].letter = correctLetter;
      newGrid[row][col].isRevealed = true;
      setGrid(newGrid);
      
      // Save progress
      const puzzleId = `${difficulty}-${new Date().toISOString().split('T')[0]}`;
      const letters = newGrid.map(row => row.map(cell => cell.letter));
      saveProgress(puzzleId, letters);
      
      setHintsUsed(hintsUsed + 1);
    }
  };
  
  // Reveal an entire word
  const revealWord = (clue: Clue) => {
    if (!gameStarted || gameCompleted) return;
    
    const { row, col, direction, answer } = clue;
    const newGrid = [...grid];
    
    if (direction === 'across') {
      for (let i = 0; i < answer.length; i++) {
        if (newGrid[row][col + i]) {
          newGrid[row][col + i].letter = answer[i];
          newGrid[row][col + i].isRevealed = true;
        }
      }
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (newGrid[row + i] && newGrid[row + i][col]) {
          newGrid[row + i][col].letter = answer[i];
          newGrid[row + i][col].isRevealed = true;
        }
      }
    }
    
    setGrid(newGrid);
    
    // Save progress
    const puzzleId = `${difficulty}-${new Date().toISOString().split('T')[0]}`;
    const letters = newGrid.map(row => row.map(cell => cell.letter));
    saveProgress(puzzleId, letters);
    
    // Count as multiple hints (one for each letter)
    setHintsUsed(hintsUsed + answer.length);
  };
  
  const value = {
    grid,
    acrossClues,
    downClues,
    currentRow,
    currentCol,
    direction,
    difficulty,
    gameStarted,
    gameCompleted,
    hintsUsed,
    startTime,
    endTime,
    score,
    activeClue,
    setCell,
    selectCell,
    toggleDirection,
    setDirection: setDirectionState,
    startGame,
    useHint,
    selectClue,
    resetGame,
    revealCell,
    revealWord
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 