import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface HintButtonProps {
  word: string;
  hints: string[];
  hintsUsed: number;
  onUseHint: () => void;
  hintsAvailable: number;
}

export function HintButton({ word, hints, hintsUsed, onUseHint, hintsAvailable }: HintButtonProps) {
  const [open, setOpen] = useState(false);
  
  const handleUseHint = () => {
    if (hintsUsed >= hintsAvailable) {
      toast.error("No more hints available today!");
      return;
    }
    
    onUseHint();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "flex items-center gap-2 transition-all",
            hintsUsed < hintsAvailable && "hover:bg-accent/20 hover:text-accent",
            hintsAvailable === 0 && "opacity-70"
          )}
          disabled={hintsAvailable === 0}
        >
          <span className={cn(
            "text-lg",
            hintsUsed < hintsAvailable && "animate-pulse-glow"
          )}>💡</span>
          <span>Hint <span className="font-mono">{hintsAvailable - hintsUsed}/{hintsAvailable}</span></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md glass">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4 font-bold">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Need a hint?
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {hintsUsed < hintsAvailable ? (
            <>
              <p className="text-center text-foreground/80">
                Using a hint will reveal a clue about today's word.
                <br />
                <span className="text-sm text-muted-foreground">This will reduce your potential score.</span>
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={handleUseHint}
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  <span className="mr-2">Reveal Hint</span>
                  <span className="text-lg">✨</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-muted/50 backdrop-blur-sm rounded-lg">
              <p className="text-center">
                You've used all available hints for today. Come back tomorrow for more hints!
              </p>
            </div>
          )}
          
          {hintsUsed > 0 && (
            <div className="mt-4 p-4 glass rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-accent">✓</span> 
                Previous Hints:
              </h3>
              <ul className="space-y-2">
                {hints.slice(0, hintsUsed).map((hint, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 bg-background/50 rounded border border-border">
                    <span className="text-muted-foreground font-mono text-sm mt-0.5">#{i+1}</span>
                    <span className="text-sm">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 