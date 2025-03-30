'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

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

export default function HowToPlay() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">How To Play</h1>
            <p className="text-muted-foreground">
              Learn how to play our daily crossword puzzle
            </p>
          </div>
          
          <div className="bg-background rounded-lg shadow-md p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">Basics</h2>
              <p className="mb-3">
                The objective of a crossword puzzle is to fill in all the blank squares with letters that form words or phrases by solving clues that lead to the answers.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Words can read across or down</li>
                <li>Each square contains one letter</li>
                <li>Words intersect with each other, sharing letters</li>
                <li>All letters must form valid words in both directions</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">How to Navigate</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Click on any square to select it and start typing</li>
                <li>Click on a square twice to change direction (across/down)</li>
                <li>Use arrow keys to navigate between squares</li>
                <li>Click on a clue in the clues list to navigate to its starting square</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Difficulty Levels</h2>
              <p className="mb-3">
                Our crossword puzzle offers three difficulty levels:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Easy (7×7):</strong> Simple words and straightforward clues, perfect for beginners</li>
                <li><strong>Medium (9×9):</strong> Moderately challenging words and clues, requiring more thought</li>
                <li><strong>Hard (11×11):</strong> Complex words and cryptic clues, designed to challenge even experienced players</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Hints and Helps</h2>
              <p className="mb-3">
                Stuck on a particular word? We offer help:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Use Hint:</strong> Reveals a random empty square</li>
                <li><strong>Active Clue Highlighting:</strong> The clue you're currently working on is highlighted</li>
                <li><strong>Related Squares Highlighting:</strong> All squares in the current word are highlighted</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-3">Scoring</h2>
              <p className="mb-3">
                Your score is calculated based on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Difficulty level (higher difficulties award more points)</li>
                <li>Time taken to complete (faster completions earn more points)</li>
                <li>Number of hints used (fewer hints means more points)</li>
              </ul>
            </section>
            
            <div className="mt-8 text-center">
              <Link href="/">
                <Button size="lg" className="px-8">
                  Start Playing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 