'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryProps {
  children: React.ReactNode[];
  breakpointCols?: { default: number; [key: number]: number };
  className?: string;
}

export function Masonry({ children, breakpointCols = { default: 3, 1024: 2, 640: 1 }, className = '' }: MasonryProps) {
  const [columns, setColumns] = useState(breakpointCols.default);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      let cols = breakpointCols.default;
      
      // Sort breakpoints descending
      const breakpoints = Object.keys(breakpointCols)
        .filter((key) => key !== 'default')
        .map(Number)
        .sort((a, b) => b - a);

      for (const bp of breakpoints) {
        if (width <= bp) {
          cols = breakpointCols[bp];
        }
      }
      setColumns(cols);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [breakpointCols]);

  // Create columns
  const columnWrapper: React.ReactNode[][] = Array.from({ length: columns }, () => []);
  
  React.Children.forEach(children, (child, index) => {
    columnWrapper[index % columns].push(child);
  });

  return (
    <div className={`flex gap-6 items-start w-full ${className}`}>
      {columnWrapper.map((col, i) => (
        <div key={i} className="flex flex-col gap-6 flex-1">
          <AnimatePresence mode="popLayout">
            {col}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
