import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Crossword Puzzle",
  description: "A daily crossword puzzle game with varying difficulty levels",
  metadataBase: new URL('https://crossword-puzzle.com'),
  openGraph: {
    title: "Daily Crossword Puzzle",
    description: "A daily crossword puzzle game with varying difficulty levels",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Crossword Puzzle",
    description: "A daily crossword puzzle game with varying difficulty levels",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
