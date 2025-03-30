'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoonIcon, SunIcon, TrophyIcon, Medal } from "lucide-react";
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

interface PlayerData {
  id: number;
  name: string;
  score: number;
  gamesPlayed: number;
  winRate: number;
  avatarUrl: string;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<{
    daily: PlayerData[];
    weekly: PlayerData[];
    allTime: PlayerData[];
  }>({ daily: [], weekly: [], allTime: [] });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // Here we'll use mock data
    const mockPlayers: PlayerData[] = [
      {
        id: 1,
        name: "Alex Johnson",
        score: 1250,
        gamesPlayed: 14,
        winRate: 92,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
      },
      {
        id: 2,
        name: "Sam Wilson",
        score: 1180,
        gamesPlayed: 11,
        winRate: 88,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
      },
      {
        id: 3,
        name: "Jamie Smith",
        score: 1120,
        gamesPlayed: 12,
        winRate: 85,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie"
      },
      {
        id: 4,
        name: "Taylor Lopez",
        score: 1080,
        gamesPlayed: 10,
        winRate: 90,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor"
      },
      {
        id: 5,
        name: "Jordan Davis",
        score: 1020,
        gamesPlayed: 9,
        winRate: 82,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
      },
      {
        id: 6,
        name: "Casey Brown",
        score: 980,
        gamesPlayed: 10,
        winRate: 80,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey"
      },
      {
        id: 7,
        name: "Riley Martinez",
        score: 940,
        gamesPlayed: 8,
        winRate: 75,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley"
      },
      {
        id: 8,
        name: "Quinn Anderson",
        score: 920,
        gamesPlayed: 9,
        winRate: 78,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn"
      },
      {
        id: 9,
        name: "Avery Thomas",
        score: 880,
        gamesPlayed: 7,
        winRate: 72,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery"
      },
      {
        id: 10,
        name: "Morgan White",
        score: 850,
        gamesPlayed: 8,
        winRate: 70,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan"
      }
    ];
    
    // Shuffle and create variations for different time periods
    const shuffled = [...mockPlayers].sort(() => 0.5 - Math.random());
    const weekly = shuffled.map(player => ({
      ...player,
      score: Math.floor(player.score * 0.6),
      gamesPlayed: Math.floor(player.gamesPlayed * 0.5),
    })).sort((a, b) => b.score - a.score);
    
    const daily = shuffled.map(player => ({
      ...player,
      score: Math.floor(player.score * 0.3),
      gamesPlayed: Math.max(1, Math.floor(player.gamesPlayed * 0.2)),
    })).sort((a, b) => b.score - a.score);
    
    setPlayers({
      daily,
      weekly,
      allTime: mockPlayers.sort((a, b) => b.score - a.score)
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ThemeToggle />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">
              See who's topping the charts in our crossword puzzle challenges
            </p>
          </div>
          
          <Tabs defaultValue="allTime" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="allTime">All Time</TabsTrigger>
            </TabsList>
            
            {Object.entries(players).map(([period, periodPlayers]) => (
              <TabsContent key={period} value={period} className="animate-slide-up">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrophyIcon className="h-5 w-5 text-amber-500" />
                      {period === 'daily' ? 'Today\'s' : period === 'weekly' ? 'This Week\'s' : 'All-Time'} Leaders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Top 3 players with medals */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        {/* 2nd Place */}
                        {periodPlayers.length > 1 && (
                          <div className="order-2 md:order-1 flex flex-col items-center pb-4">
                            <div className="relative mb-2">
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <Medal className="h-8 w-8 text-gray-400" />
                              </div>
                              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-400">
                                <img 
                                  src={periodPlayers[1].avatarUrl} 
                                  alt={periodPlayers[1].name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <h3 className="font-semibold">{periodPlayers[1].name}</h3>
                            <p className="text-sm text-muted-foreground">{periodPlayers[1].score} pts</p>
                          </div>
                        )}
                        
                        {/* 1st Place */}
                        {periodPlayers.length > 0 && (
                          <div className="order-1 md:order-2 flex flex-col items-center transform scale-110 pb-4">
                            <div className="relative mb-2">
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <Medal className="h-10 w-10 text-amber-500" />
                              </div>
                              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-500">
                                <img 
                                  src={periodPlayers[0].avatarUrl} 
                                  alt={periodPlayers[0].name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <h3 className="font-bold text-lg">{periodPlayers[0].name}</h3>
                            <p className="text-sm font-semibold">{periodPlayers[0].score} pts</p>
                          </div>
                        )}
                        
                        {/* 3rd Place */}
                        {periodPlayers.length > 2 && (
                          <div className="order-3 flex flex-col items-center pb-4">
                            <div className="relative mb-2">
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                                <Medal className="h-8 w-8 text-amber-800" />
                              </div>
                              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-800">
                                <img 
                                  src={periodPlayers[2].avatarUrl} 
                                  alt={periodPlayers[2].name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <h3 className="font-semibold">{periodPlayers[2].name}</h3>
                            <p className="text-sm text-muted-foreground">{periodPlayers[2].score} pts</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Leaderboard table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-3">Rank</th>
                              <th className="text-left p-3">Player</th>
                              <th className="text-right p-3">Games</th>
                              <th className="text-right p-3">Win Rate</th>
                              <th className="text-right p-3">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {periodPlayers.map((player, index) => (
                              <tr key={player.id} className={`border-b ${index < 3 ? 'font-semibold' : ''}`}>
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img 
                                      src={player.avatarUrl} 
                                      alt={player.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  {player.name}
                                </td>
                                <td className="p-3 text-right">{player.gamesPlayed}</td>
                                <td className="p-3 text-right">{player.winRate}%</td>
                                <td className="p-3 text-right font-bold">{player.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 