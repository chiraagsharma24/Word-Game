'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoonIcon, SunIcon, Flame, CalendarDays, Clock, Trophy } from "lucide-react";
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

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDaysPlayed: number;
  lastPlayed: string;
  streakHistory: {
    date: string;
    completed: boolean;
    difficulty: string;
    score?: number;
  }[];
}

export default function DailyStreak() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalDaysPlayed: 0,
    lastPlayed: '',
    streakHistory: []
  });

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // Here we'll use mock data
    const today = new Date();
    const mockData: StreakData = {
      currentStreak: 7,
      longestStreak: 14,
      totalDaysPlayed: 42,
      lastPlayed: today.toISOString().split('T')[0],
      streakHistory: []
    };
    
    // Generate the last 30 days of history
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Before current streak, add some random gaps
      const completed = i < 7 || Math.random() > 0.3;
      
      mockData.streakHistory.push({
        date: dateStr,
        completed,
        difficulty: completed ? ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] : '',
        score: completed ? Math.floor(Math.random() * 200) + 100 : undefined
      });
    }
    
    setStreakData(mockData);
  }, []);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Get day of the week (0-6, where 0 is Sunday)
  const getDayOfWeek = (dateStr: string) => {
    return new Date(dateStr).getDay();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Daily Streak</h1>
            <p className="text-muted-foreground">
              Track your daily crossword puzzle solving streak
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-background animate-pop">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{streakData.currentStreak}</p>
                <p className="text-sm text-muted-foreground">Keep it going!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background animate-pop" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Longest Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{streakData.longestStreak}</p>
                <p className="text-sm text-muted-foreground">Your personal best</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background animate-pop" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-blue-500" />
                  Total Days Played
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{streakData.totalDaysPlayed}</p>
                <p className="text-sm text-muted-foreground">Since you started</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-background mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Monthly Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-medium">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {streakData.streakHistory.map((day, index) => {
                  // For first week, add empty spaces before first day
                  if (index === 0) {
                    const dayOfWeek = getDayOfWeek(day.date);
                    const emptySpaces = [];
                    for (let i = 0; i < dayOfWeek; i++) {
                      emptySpaces.push(
                        <div key={`empty-${i}`} className="aspect-square"></div>
                      );
                    }
                    return [
                      ...emptySpaces,
                      <div 
                        key={day.date} 
                        className={`aspect-square rounded-md flex flex-col items-center justify-center text-sm ${
                          day.completed 
                            ? day.difficulty === 'easy' 
                              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' 
                              : day.difficulty === 'medium'
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                            : 'bg-muted'
                        }`}
                        title={day.completed ? `${formatDate(day.date)}: ${day.score} points` : formatDate(day.date)}
                      >
                        {new Date(day.date).getDate()}
                        {day.completed && (
                          <span className="text-xs mt-0.5">
                            {day.difficulty === 'easy' ? 'E' : day.difficulty === 'medium' ? 'M' : 'H'}
                          </span>
                        )}
                      </div>
                    ];
                  }
                  
                  return (
                    <div 
                      key={day.date} 
                      className={`aspect-square rounded-md flex flex-col items-center justify-center text-sm ${
                        day.completed 
                          ? day.difficulty === 'easy' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' 
                            : day.difficulty === 'medium'
                              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                              : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                          : 'bg-muted'
                      }`}
                      title={day.completed ? `${formatDate(day.date)}: ${day.score} points` : formatDate(day.date)}
                    >
                      {new Date(day.date).getDate()}
                      {day.completed && (
                        <span className="text-xs mt-0.5">
                          {day.difficulty === 'easy' ? 'E' : day.difficulty === 'medium' ? 'M' : 'H'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-emerald-100 dark:bg-emerald-900/50"></div>
                  <span>Easy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-blue-100 dark:bg-blue-900/50"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-purple-100 dark:bg-purple-900/50"></div>
                  <span>Hard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-muted"></div>
                  <span>Missed</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button asChild>
              <a href="/">Play Today's Puzzle</a>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 