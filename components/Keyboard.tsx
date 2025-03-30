import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  evaluation: Record<string, 'correct' | 'present' | 'incorrect' | undefined>;
  disabled?: boolean;
}

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
];

export function Keyboard({ onKeyPress, onDelete, onEnter, evaluation, disabled = false }: KeyboardProps) {
  const handleClick = (key: string) => {
    if (disabled) return;
    
    if (key === 'DELETE') {
      onDelete();
    } else if (key === 'ENTER') {
      onEnter();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 py-3 w-full max-w-lg backdrop-blur-sm bg-background/20 glass rounded-lg p-3 sm:p-4 animate-fade-in">
      {keyboardLayout.map((row, i) => (
        <div key={i} className="flex w-full gap-1.5 justify-center">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === 'DELETE';
            const keyEvaluation = !isSpecialKey ? evaluation[key] : undefined;
            
            return (
              <Button
                key={key}
                onClick={() => handleClick(key)}
                disabled={disabled}
                variant="outline"
                className={cn(
                  "font-bold h-12 sm:h-14 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95",
                  isSpecialKey ? "px-2 text-xs" : "px-1.5 sm:px-4 text-sm sm:text-base",
                  keyEvaluation === 'correct' && "bg-[hsl(var(--correct))] text-white border-[hsl(var(--correct))] hover:bg-[hsl(var(--correct-hover))] hover:border-[hsl(var(--correct-hover))]",
                  keyEvaluation === 'present' && "bg-[hsl(var(--present))] text-white border-[hsl(var(--present))] hover:bg-[hsl(var(--present-hover))] hover:border-[hsl(var(--present-hover))]",
                  keyEvaluation === 'incorrect' && "bg-[hsl(var(--incorrect))] text-white border-[hsl(var(--incorrect))] hover:bg-[hsl(var(--incorrect-hover))] hover:border-[hsl(var(--incorrect-hover))]",
                  !keyEvaluation && !isSpecialKey && "hover:bg-accent/20 dark:hover:bg-accent/10"
                )}
              >
                {key === 'DELETE' ? (
                  <span className="text-lg">⌫</span>
                ) : key === 'ENTER' ? (
                  <span className="whitespace-nowrap text-xs sm:text-sm">ENTER</span>
                ) : (
                  key
                )}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
} 