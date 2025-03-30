import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Crossword cell data structure
export interface CrosswordCell {
  letter: string;
  number?: number;
  isActive: boolean; // Part of a word
  isHighlighted?: boolean; // Currently selected word
  isSelected?: boolean; // Currently selected cell
  isRevealed?: boolean; // Has been revealed as hint
  isCorrect?: boolean; // User filled in correctly
  isIncorrect?: boolean; // User filled in incorrectly
  acrossWord?: number; // The clue number for across
  downWord?: number; // The clue number for down
}

export interface CrosswordGridProps {
  grid: CrosswordCell[][];
  onCellClick: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, value: string) => void;
  currentRow: number;
  currentCol: number;
  direction: 'across' | 'down';
  revealing: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function CrosswordGrid({
  grid,
  onCellClick,
  onCellChange,
  currentRow,
  currentCol,
  direction,
  revealing = false,
  difficulty = 'medium'
}: CrosswordGridProps) {
  // Safety check to ensure grid exists
  if (!grid || !grid.length) {
    return <div className="text-center p-4">Loading crossword...</div>;
  }

  // Focus the input when a cell is selected
  const handleCellClick = (row: number, col: number) => {
    onCellClick(row, col);
  };

  // Update the cell value
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 1 && /^[A-Z]?$/.test(value)) {
      onCellChange(row, col, value);
    }
  };

  // Safely check if cell exists and is active
  const isCellActiveAndExists = (row: number, col: number): boolean => {
    return (
      row >= 0 && 
      col >= 0 && 
      row < grid.length && 
      col < grid[row].length && 
      grid[row][col]?.isActive
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e.key === 'ArrowUp') {
      // Move up if cell exists
      if (isCellActiveAndExists(row - 1, col)) {
        e.preventDefault();
        onCellClick(row - 1, col);
      }
    } else if (e.key === 'ArrowDown') {
      // Move down if cell exists
      if (isCellActiveAndExists(row + 1, col)) {
        e.preventDefault();
        onCellClick(row + 1, col);
      }
    } else if (e.key === 'ArrowLeft') {
      // Move left if cell exists
      if (isCellActiveAndExists(row, col - 1)) {
        e.preventDefault();
        onCellClick(row, col - 1);
      }
    } else if (e.key === 'ArrowRight') {
      // Move right if cell exists
      if (isCellActiveAndExists(row, col + 1)) {
        e.preventDefault();
        onCellClick(row, col + 1);
      }
    } else if (e.key === 'Backspace' && grid[row][col].letter === '') {
      // Move to previous cell if backspace on empty cell
      if (direction === 'across' && isCellActiveAndExists(row, col - 1)) {
        onCellClick(row, col - 1);
      } else if (direction === 'down' && isCellActiveAndExists(row - 1, col)) {
        onCellClick(row - 1, col);
      }
    } else if (/^[A-Za-z]$/.test(e.key)) {
      // Auto-advance after typing a letter
      setTimeout(() => {
        if (direction === 'across' && isCellActiveAndExists(row, col + 1)) {
          onCellClick(row, col + 1);
        } else if (direction === 'down' && isCellActiveAndExists(row + 1, col)) {
          onCellClick(row + 1, col);
        }
      }, 10);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid gap-px bg-border/30 p-px rounded-lg shadow-lg overflow-hidden">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-px">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center",
                  cell?.isActive
                    ? "bg-white dark:bg-gray-800"
                    : "bg-black/70 dark:bg-black/90",
                  currentRow === rowIndex && currentCol === colIndex && "ring-2 ring-accent"
                )}
                onClick={() => cell?.isActive && handleCellClick(rowIndex, colIndex)}
              >
                {cell?.isActive && (
                  <>
                    {/* Cell number */}
                    {cell.number && (
                      <div className="absolute top-0.5 left-0.5 text-[8px] font-semibold">
                        {cell.number}
                      </div>
                    )}

                    {/* Letter input */}
                    <input
                      type="text"
                      value={cell.letter || ''}
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                      className={cn(
                        "w-full h-full text-center font-bold text-lg bg-transparent focus:outline-none",
                        cell.isHighlighted && "bg-blue-100 dark:bg-blue-900/30",
                        cell.isIncorrect && "text-red-500",
                        cell.isCorrect && "text-green-500",
                        cell.isRevealed && "text-primary"
                      )}
                      maxLength={1}
                      autoComplete="off"
                      ref={(input) => {
                        if (
                          input &&
                          currentRow === rowIndex &&
                          currentCol === colIndex
                        ) {
                          input.focus();
                        }
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface Clue {
  number: number;
  text: string;
  answer: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
}

export interface CrosswordData {
  grid: CrosswordCell[][];
  acrossClues: Clue[];
  downClues: Clue[];
} 