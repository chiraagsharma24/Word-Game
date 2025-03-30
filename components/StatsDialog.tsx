import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StatsDialogProps {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
  maxAttempts: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  word?: string;
  hasWon?: boolean;
  score?: number;
}

export function StatsDialog({ 
  played, 
  wins, 
  currentStreak, 
  maxStreak, 
  distribution, 
  maxAttempts,
  open,
  onOpenChange,
  word,
  hasWon,
  score = 0
}: StatsDialogProps) {
  const winPercentage = played > 0 ? Math.round((wins / played) * 100) : 0;
  const maxDistribution = Math.max(...distribution, 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span className="text-lg">📊</span>
          <span className="sr-only">Statistics</span>
          {currentStreak > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-semibold">
              {currentStreak}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Statistics
          </DialogTitle>
        </DialogHeader>
        
        {/* Game result */}
        {word && (
          <div className="text-center mb-6 p-4 glass rounded-lg animate-fade-in">
            <h3 className="font-semibold text-xl mb-3">
              {hasWon ? (
                <span className="flex items-center justify-center gap-2">
                  You won! <span className="animate-bounce">🎉</span>
                </span>
              ) : (
                <span>Better luck next time!</span>
              )}
            </h3>
            <p className="mb-2">The word was: <span className="font-bold uppercase text-accent">{word}</span></p>
            
            {score > 0 && (
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {score} points
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasWon ? "Great job! Keep up the streak!" : "Try again for a better score!"}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2 text-center mb-6">
          <StatCard label="Played" value={played} />
          <StatCard label="Win %" value={`${winPercentage}%`} />
          <StatCard 
            label="Streak" 
            value={currentStreak} 
            highlight={currentStreak > 0}
          />
          <StatCard 
            label="Max Streak" 
            value={maxStreak} 
            highlight={maxStreak === currentStreak && maxStreak > 0}
          />
        </div>
        
        {/* Distribution */}
        <h3 className="font-semibold text-center mb-3">Guess Distribution</h3>
        <div className="space-y-1.5">
          {Array.from({ length: maxAttempts }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-4 text-center mr-2">{i + 1}</div>
              <div className="flex-1 relative h-6">
                <div 
                  className={cn(
                    "absolute inset-0 flex items-center justify-end px-2 text-xs font-semibold rounded-sm transition-all duration-500",
                    distribution[i] > 0 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                  style={{ 
                    width: `${distribution[i] > 0 ? Math.max((distribution[i] / maxDistribution) * 100, 10) : 5}%`,
                  }}
                >
                  {distribution[i] > 0 && distribution[i]}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={() => {
              navigator.share?.({
                title: `Word Puzzle - Daily Challenge`,
                text: `I scored ${score} points on Word Puzzle today! The word was ${word?.toUpperCase()}. Can you beat my score?`,
                url: window.location.href,
              }).catch(() => {
                // If sharing fails, copy to clipboard instead
                const shareText = `I scored ${score} points on Word Puzzle today! The word was ${word?.toUpperCase()}. Can you beat my score?`;
                navigator.clipboard.writeText(shareText);
                alert('Share text copied to clipboard!');
              });
            }}
          >
            Share Score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  highlight?: boolean;
}

function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <div className="flex flex-col">
      <span className={cn(
        "text-2xl font-bold",
        highlight && "text-primary animate-pulse-glow"
      )}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
} 