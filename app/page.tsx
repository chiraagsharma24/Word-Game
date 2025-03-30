'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CrosswordGrid } from '@/components/CrosswordGrid';
import { CluesList } from '@/components/CluesList';
import { GameProvider, useGame } from '@/lib/GameContext';
import { Confetti } from '@/components/Confetti';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

// Difficulty selection component
const DifficultySelect = () => {
  const { startGame } = useGame();
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-background rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-center">Choose Difficulty</h2>
      <p className="text-center text-muted-foreground">Select a difficulty level to start the game</p>
      
      <div className="grid gap-4 w-full max-w-md">
        <Button 
          variant="outline" 
          size="lg" 
          className="h-20 text-lg hover:bg-primary hover:text-primary-foreground transition-all"
          onClick={() => startGame('easy')}
        >
          Easy
          <span className="ml-2 text-sm text-muted-foreground">(7×7)</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="h-20 text-lg hover:bg-primary hover:text-primary-foreground transition-all"
          onClick={() => startGame('medium')}
        >
          Medium
          <span className="ml-2 text-sm text-muted-foreground">(9×9)</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="h-20 text-lg hover:bg-primary hover:text-primary-foreground transition-all" 
          onClick={() => startGame('hard')}
        >
          Hard
          <span className="ml-2 text-sm text-muted-foreground">(11×11)</span>
        </Button>
      </div>
    </div>
  );
};

// Game interface component
const GameInterface = () => {
  const { 
    grid, 
    acrossClues, 
    downClues, 
    currentRow, 
    currentCol, 
    direction, 
    activeClue,
    selectCell, 
    setCell, 
    selectClue,
    gameCompleted,
    score
  } = useGame();
  
  // Function to handle cell change
  const handleCellChange = (row: number, col: number, value: string) => {
    setCell(row, col, value);
  };
  
  // Function to handle cell click
  const handleCellClick = (row: number, col: number) => {
    selectCell(row, col);
  };
  
  // Function to handle clue selection
  const handleClueSelect = (clue: any) => {
    selectClue(clue);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2 flex justify-center">
        <CrosswordGrid 
          grid={grid}
          onCellClick={handleCellClick}
          onCellChange={handleCellChange}
          currentRow={currentRow}
          currentCol={currentCol}
          direction={direction}
          revealing={false}
          difficulty="medium"
        />
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="bg-background rounded-lg shadow-md p-4">
          <CluesList
            acrossClues={acrossClues}
            downClues={downClues}
            activeClue={activeClue}
            onClueSelect={handleClueSelect}
          />
        </div>
        
        {gameCompleted && (
          <div className="bg-background rounded-lg shadow-md p-4 animate-fade-in">
            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
            <p className="mb-2">You completed the crossword puzzle.</p>
            <p className="text-lg font-semibold">Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Game controls component
const GameControls = () => {
  const { useHint, resetGame, gameStarted } = useGame();
  
  return (
    <div className="flex justify-center space-x-4 mb-6 animate-fade-in">
      <Button 
        variant="outline" 
        onClick={useHint}
        disabled={!gameStarted}
      >
        Use Hint
      </Button>
      
      <Button 
        variant="outline" 
        onClick={resetGame}
        disabled={!gameStarted}
      >
        New Game
      </Button>
    </div>
  );
};

// Theme toggle component
const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-20 right-4 z-50"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

// Main app component
export default function Home() {
  return (
    <GameProvider>
      <CrosswordGame />
    </GameProvider>
  );
}

// Crossword game component
const CrosswordGame = () => {
  const { gameStarted, gameCompleted } = useGame();
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Daily Crossword</h1>
            <p className="text-muted-foreground">
              Challenge yourself with our daily crossword puzzle
            </p>
          </div>
          
          {!gameStarted ? (
            <DifficultySelect />
          ) : (
            <>
              <GameControls />
              <GameInterface />
            </>
          )}
        </div>
      </div>
      
      {gameCompleted && <Confetti active={gameCompleted} />}
      
      <Footer />
    </main>
  );
};
