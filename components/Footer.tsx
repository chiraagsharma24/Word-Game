import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo and Description */}
        <div className="space-y-4">
          <Link href="/" className="flex-shrink-0">
            <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Cross</span>
              <span className="bg-gradient-to-r from-primary to-accent px-2 py-1 rounded-md text-white">Puzzle</span>
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Challenge yourself with our daily crossword puzzle. Play and improve your vocabulary across different difficulty levels.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/how-to-play" className="text-muted-foreground hover:text-foreground transition-colors">
                How to Play
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
            </li>
            <li>
              <Link href="/daily-streak" className="text-muted-foreground hover:text-foreground transition-colors">
                Daily Streak
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Creator */}
        <div className="lg:col-span-2">
          <h3 className="font-medium mb-4">Creator</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="font-semibold text-lg">CS</span>
            </div>
            <div>
              <p className="font-semibold">Chirag Sharma</p>
              <p className="text-sm text-muted-foreground">Full-stack Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <a 
              href="https://github.com/sharma-chirag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://x.com/Coder24_7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">X (Twitter)</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/chirag-sharma-365703226/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CrossPuzzle. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed and developed by Chirag Sharma
          </p>
        </div>
      </div>
    </footer>
  );
} 