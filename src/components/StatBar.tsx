import React, { useState, useEffect } from 'react';

interface StatBarProps {
  value: number;
  gradient: string;
  delay?: number;
}

const StatBar: React.FC<StatBarProps> = ({ value, gradient, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="relative">
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1500 ease-out relative`}
          style={{ width: `${animatedValue}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-purple-200">0</span>
        <span className="text-white font-bold">{value}</span>
        <span className="text-purple-200">100</span>
      </div>
    </div>
  );
};

export default StatBar;