'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoonIcon, SunIcon, TrophyIcon, ClockIcon, BrainIcon, ZapIcon } from "lucide-react";
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

interface ScoreData {
  date: string;
  score: number;
  difficulty: string;
  completionTime: number;
  hintsUsed: number;
}

export default function Scorecard() {
  const [scores, setScores] = useState<ScoreData[]>([]);
  const [stats, setStats] = useState({
    totalGames: 0,
    highScore: 0,
    averageScore: 0,
    fastestTime: Infinity,
    easyGames: 0,
    mediumGames: 0,
    hardGames: 0,
    totalHints: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // Here we'll use mock data
    const mockScores: ScoreData[] = [
      {
        date: '2023-12-01',
        score: 145,
        difficulty: 'easy',
        completionTime: 240,
        hintsUsed: 1
      },
      {
        date: '2023-12-02',
        score: 220,
        difficulty: 'medium',
        completionTime: 360,
        hintsUsed: 2
      },
      {
        date: '2023-12-03',
        score: 180,
        difficulty: 'easy',
        completionTime: 180,
        hintsUsed: 0
      },
      {
        date: '2023-12-04',
        score: 320,
        difficulty: 'hard',
        completionTime: 480,
        hintsUsed: 3
      },
      {
        date: '2023-12-05',
        score: 290,
        difficulty: 'medium',
        completionTime: 300,
        hintsUsed: 1
      },
      {
        date: '2023-12-06',
        score: 350,
        difficulty: 'hard',
        completionTime: 420,
        hintsUsed: 2
      },
      {
        date: '2023-12-07',
        score: 165,
        difficulty: 'easy',
        completionTime: 210,
        hintsUsed: 1
      }
    ];
    
    setScores(mockScores);
    
    // Calculate stats
    if (mockScores.length > 0) {
      const totalGames = mockScores.length;
      const highScore = Math.max(...mockScores.map(s => s.score));
      const averageScore = Math.round(mockScores.reduce((sum, s) => sum + s.score, 0) / totalGames);
      const fastestTime = Math.min(...mockScores.map(s => s.completionTime));
      const easyGames = mockScores.filter(s => s.difficulty === 'easy').length;
      const mediumGames = mockScores.filter(s => s.difficulty === 'medium').length;
      const hardGames = mockScores.filter(s => s.difficulty === 'hard').length;
      const totalHints = mockScores.reduce((sum, s) => sum + s.hintsUsed, 0);
      
      setStats({
        totalGames,
        highScore,
        averageScore,
        fastestTime,
        easyGames,
        mediumGames,
        hardGames,
        totalHints
      });
    }
  }, []);

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Scorecard</h1>
            <p className="text-muted-foreground">
              Track your crossword puzzle performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-background animate-pop">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5 text-amber-500" />
                  High Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.highScore}</p>
                <p className="text-sm text-muted-foreground">Your best performance</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background animate-pop" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-blue-500" />
                  Fastest Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.fastestTime < Infinity ? formatTime(stats.fastestTime) : 'N/A'}</p>
                <p className="text-sm text-muted-foreground">Your quickest solve</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background animate-pop" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BrainIcon className="h-5 w-5 text-purple-500" />
                  Games Played
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalGames}</p>
                <p className="text-sm text-muted-foreground">Total puzzles completed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background animate-pop" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ZapIcon className="h-5 w-5 text-green-500" />
                  Avg. Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.averageScore}</p>
                <p className="text-sm text-muted-foreground">Your average performance</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-background mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle>Difficulty Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-4xl font-bold">{stats.easyGames}</div>
                  <div className="text-sm">Easy</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-4xl font-bold">{stats.mediumGames}</div>
                  <div className="text-sm">Medium</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-4xl font-bold">{stats.hardGames}</div>
                  <div className="text-sm">Hard</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Difficulty</th>
                      <th className="text-left p-3">Time</th>
                      <th className="text-left p-3">Hints</th>
                      <th className="text-left p-3">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{score.date}</td>
                        <td className="p-3 capitalize">{score.difficulty}</td>
                        <td className="p-3">{formatTime(score.completionTime)}</td>
                        <td className="p-3">{score.hintsUsed}</td>
                        <td className="p-3 font-bold">{score.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 