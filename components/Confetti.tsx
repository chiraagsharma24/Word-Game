'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speed: number;
}

const COLORS = ['#ff0081', '#3399ff', '#ffde00', '#4caf50', '#9c27b0', '#ff9800'];

export function Confetti({ active }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  // Generate confetti pieces
  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }
    
    const newPieces: ConfettiPiece[] = [];
    const PIECE_COUNT = 150;
    
    for (let i = 0; i < PIECE_COUNT; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // % of viewport width
        y: -10 - Math.random() * 20, // Start above viewport
        size: 5 + Math.random() * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        speed: 1 + Math.random() * 3
      });
    }
    
    setPieces(newPieces);
    
    // Clean up after confetti is done
    const timer = setTimeout(() => {
      setPieces([]);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [active]);
  
  // Animate confetti pieces
  useEffect(() => {
    if (!active || pieces.length === 0) return;
    
    let animationFrameId: number;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      setPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          y: piece.y + piece.speed,
          rotation: (piece.rotation + piece.speed) % 360,
          // Remove pieces that are off-screen
          ...(piece.y > 120 ? { y: -10 } : {})
        }))
      );
      
      if (progress < 6000) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, pieces]);
  
  if (!active) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
} 