
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WaterLevelDisplayProps {
  level: number; // 0-100 percentage
}

const WaterLevelDisplay: React.FC<WaterLevelDisplayProps> = ({ level }) => {
  const clampedLevel = Math.max(0, Math.min(100, level));
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">Water Level</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-24 h-32 mb-4">
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Jug outline */}
            <path
              d="M25 20 L75 20 L75 25 L85 25 L85 35 L75 35 L75 100 Q75 110 65 110 L35 110 Q25 110 25 100 L25 20 Z"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="rgba(155, 135, 245, 0.1)"
            />
            
            {/* Water fill */}
            <defs>
              <clipPath id="jugClip">
                <path d="M27 22 L73 22 L73 100 Q73 108 65 108 L35 108 Q27 108 27 100 L27 22 Z" />
              </clipPath>
            </defs>
            
            <rect
              x="27"
              y={22 + (86 * (100 - clampedLevel)) / 100}
              width="46"
              height={(86 * clampedLevel) / 100}
              fill={clampedLevel > 20 ? "#3b82f6" : "#ef4444"}
              clipPath="url(#jugClip)"
              className="transition-all duration-500"
            />
            
            {/* Handle */}
            <path
              d="M75 25 Q90 25 90 40 Q90 55 75 55"
              stroke="#9b87f5"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gradient">{clampedLevel}%</p>
          <p className={`text-sm ${clampedLevel > 20 ? 'text-blue-400' : 'text-red-400'}`}>
            {clampedLevel > 20 ? 'Good' : 'Low'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterLevelDisplay;
