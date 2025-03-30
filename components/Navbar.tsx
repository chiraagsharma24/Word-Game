import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Trophy, Calendar, HelpCircle, User, ChevronDown } from 'lucide-react';
import { Separator } from './ui/separator';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur-md bg-background/80 border-b border-border/40 sticky top-0 z-10 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo Section */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-1.5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Cross</span>
            <span className="bg-gradient-to-r from-primary to-accent px-2 py-1 rounded-md text-white">Puzzle</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/how-to-play" className="flex items-center gap-1.5">
              <HelpCircle size={16} />
              <span>How to Play</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link href="/scorecard" className="flex items-center gap-1.5">
              <Trophy size={16} />
              <span>Scorecard</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link href="/daily-streak" className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>Daily Streak</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                <span>More</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuItem asChild>
                <Link href="/leaderboard" className="flex items-center gap-1.5">
                  <Trophy size={16} />
                  <span>Leaderboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-1.5">
                  <User size={16} />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-6 mx-2" />
          
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 border-t border-border/10 animate-fade-in">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/how-to-play" className="flex items-center gap-1.5">
                <HelpCircle size={16} />
                <span>How to Play</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/scorecard" className="flex items-center gap-1.5">
                <Trophy size={16} />
                <span>Scorecard</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/daily-streak" className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>Daily Streak</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/leaderboard" className="flex items-center gap-1.5">
                <Trophy size={16} />
                <span>Leaderboard</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/profile" className="flex items-center gap-1.5">
                <User size={16} />
                <span>Profile</span>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
} 