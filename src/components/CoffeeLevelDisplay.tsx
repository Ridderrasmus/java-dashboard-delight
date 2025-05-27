
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CoffeeLevelDisplayProps {
  level: number; // 0-100 percentage
}

const CoffeeLevelDisplay: React.FC<CoffeeLevelDisplayProps> = ({ level }) => {
  const clampedLevel = Math.max(0, Math.min(100, level));
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">Coffee Level</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-24 h-32 mb-4">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Coffee tin outline */}
            <rect
              x="20"
              y="15"
              width="60"
              height="90"
              rx="5"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="rgba(155, 135, 245, 0.1)"
            />
            
            {/* Lid */}
            <rect
              x="18"
              y="10"
              width="64"
              height="8"
              rx="4"
              fill="#9b87f5"
              stroke="#9b87f5"
              strokeWidth="1"
            />
            
            {/* Lid handle */}
            <circle
              cx="50"
              cy="14"
              r="2"
              fill="#9b87f5"
            />
            
            {/* Coffee fill */}
            <rect
              x="22"
              y={17 + (86 * (100 - clampedLevel)) / 100}
              width="56"
              height={(86 * clampedLevel) / 100}
              fill={clampedLevel > 20 ? "#8b4513" : "#ef4444"}
              className="transition-all duration-500"
            />
            
            {/* Coffee beans decoration */}
            {clampedLevel > 30 && (
              <>
                <circle cx="35" cy={95 - (clampedLevel * 0.3)} r="2" fill="#654321" opacity="0.7" />
                <circle cx="50" cy={90 - (clampedLevel * 0.4)} r="2" fill="#654321" opacity="0.7" />
                <circle cx="65" cy={85 - (clampedLevel * 0.2)} r="2" fill="#654321" opacity="0.7" />
              </>
            )}
          </svg>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gradient">{clampedLevel}%</p>
          <p className={`text-sm ${clampedLevel > 20 ? 'text-amber-400' : 'text-red-400'}`}>
            {clampedLevel > 20 ? 'Good' : 'Low'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoffeeLevelDisplay;
