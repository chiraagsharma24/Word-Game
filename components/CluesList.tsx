import React from 'react';
import { cn } from '@/lib/utils';
import { Clue } from './CrosswordGrid';

interface CluesListProps {
  acrossClues: Clue[];
  downClues: Clue[];
  activeClue: Clue | null;
  onClueSelect: (clue: Clue) => void;
}

export function CluesList({
  acrossClues,
  downClues,
  activeClue,
  onClueSelect
}: CluesListProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Across Clues */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-primary">→</span>
            </span>
            Across
          </h3>
          <div className="h-[240px] rounded-md border p-3 overflow-y-auto">
            <ul className="space-y-1">
              {acrossClues.map((clue) => (
                <li
                  key={`across-${clue.number}`}
                  className={cn(
                    "py-1.5 px-2 rounded-md cursor-pointer transition-colors flex items-start",
                    activeClue?.number === clue.number && activeClue?.direction === 'across'
                      ? "bg-accent/20 text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onClueSelect(clue)}
                >
                  <span className="font-mono font-bold text-sm mr-2 text-primary">
                    {clue.number}.
                  </span>
                  <span>{clue.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Down Clues */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-primary">↓</span>
            </span>
            Down
          </h3>
          <div className="h-[240px] rounded-md border p-3 overflow-y-auto">
            <ul className="space-y-1">
              {downClues.map((clue) => (
                <li
                  key={`down-${clue.number}`}
                  className={cn(
                    "py-1.5 px-2 rounded-md cursor-pointer transition-colors flex items-start",
                    activeClue?.number === clue.number && activeClue?.direction === 'down'
                      ? "bg-accent/20 text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onClueSelect(clue)}
                >
                  <span className="font-mono font-bold text-sm mr-2 text-primary">
                    {clue.number}.
                  </span>
                  <span>{clue.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Active Clue Display */}
      <div className="mt-5 p-4 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Current Clue:</span>
          {activeClue ? (
            <p className="font-medium">
              <span className="text-primary font-bold">{activeClue.number}</span>{" "}
              {activeClue.direction === "across" ? "Across" : "Down"}: {activeClue.text}
            </p>
          ) : (
            <p className="text-muted-foreground italic">Select a clue to begin</p>
          )}
        </div>
      </div>
    </div>
  );
} 