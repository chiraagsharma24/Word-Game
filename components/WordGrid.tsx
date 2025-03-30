import React from 'react';
import { cn } from '@/lib/utils';

interface WordGridProps {
  word: string;
  guesses: string[];
  currentGuess: string;
  maxAttempts: number;
  wordLength: number;
  isRevealing?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  shakeRowIndex?: number;
}

export function WordGrid({ 
  word, 
  guesses, 
  currentGuess, 
  maxAttempts, 
  wordLength,
  isRevealing = false,
  difficulty = 'medium',
  shakeRowIndex
}: WordGridProps) {
  // Fill remaining guesses with empty strings to match maxAttempts
  const filledGuesses = [...guesses];
  while (filledGuesses.length < maxAttempts) {
    filledGuesses.push('');
  }

  // Format current guess to match wordLength
  const formattedCurrentGuess = currentGuess.padEnd(wordLength, ' ');

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-1">
      {filledGuesses.map((guess, i) => (
        <div 
          key={i} 
          className={cn(
            "flex gap-1.5 sm:gap-2", 
            i === shakeRowIndex && "animate-shake"
          )}
        >
          {/* If this is the current guess row, show the current input */}
          {i === guesses.length
            ? formattedCurrentGuess.split('').map((char, j) => (
                <Cell 
                  key={j} 
                  value={char} 
                  state="current" 
                  position={j}
                  isAnimated
                  difficulty={difficulty}
                />
              ))
            : /* For past guesses, show the evaluation */
              i < guesses.length
              ? guess.split('').map((char, j) => {
                  let state: CellState = "incorrect";
                  if (char === word[j]) {
                    state = "correct";
                  } else if (word.includes(char)) {
                    state = "present";
                  }
                  return (
                    <Cell 
                      key={j} 
                      value={char} 
                      state={state} 
                      position={j} 
                      isRevealing={i === guesses.length - 1 && isRevealing}
                      revealDelay={j * 150}
                      difficulty={difficulty}
                    />
                  );
                })
              : /* For future guesses, show empty cells */
                Array(wordLength).fill(0).map((_, j) => (
                  <Cell 
                    key={j} 
                    value="" 
                    state="empty" 
                    position={j}
                    difficulty={difficulty}
                  />
                ))
          }
        </div>
      ))}
    </div>
  );
}

type CellState = "empty" | "current" | "correct" | "present" | "incorrect";

interface CellProps {
  value: string;
  state: CellState;
  position?: number;
  isRevealing?: boolean;
  revealDelay?: number;
  isAnimated?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

function Cell({ 
  value, 
  state, 
  position = 0, 
  isRevealing = false, 
  revealDelay = 0,
  isAnimated = false,
  difficulty = 'medium'
}: CellProps) {
  // Apply special styling based on difficulty level
  const difficultyStyles = {
    easy: "",
    medium: difficulty === 'medium' && state === 'current' ? "border-accent border-opacity-50" : "",
    hard: difficulty === 'hard' && state === 'empty' ? "border-gray-200 dark:border-gray-800" : "",
  };

  // Add glowing effect for special positions in hard mode
  const isSpecialPosition = difficulty === 'hard' && position === Math.floor(Math.random() * 5);
  
  return (
    <div 
      className={cn(
        "w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-bold border-2 uppercase rounded-md transition-colors shadow-sm",
        state === "empty" && "border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-gray-800/20 backdrop-blur-sm",
        state === "current" && "border-gray-400 dark:border-gray-500 bg-white/80 dark:bg-gray-800/40 animate-pop backdrop-blur-sm",
        state === "correct" && "bg-[hsl(var(--correct))] border-[hsl(var(--correct))] text-white",
        state === "present" && "bg-[hsl(var(--present))] border-[hsl(var(--present))] text-white",
        state === "incorrect" && "bg-[hsl(var(--incorrect))] border-[hsl(var(--incorrect))] text-white",
        isRevealing && "animate-flip",
        isAnimated && value.trim() !== "" && "animate-pop",
        isSpecialPosition && state === "empty" && "animate-pulse-glow",
        difficultyStyles[difficulty]
      )}
      style={{
        animationDelay: isRevealing ? `${revealDelay}ms` : "0ms",
        transitionDelay: isRevealing ? `${revealDelay}ms` : "0ms",
      }}
    >
      {value}
    </div>
  );
} 