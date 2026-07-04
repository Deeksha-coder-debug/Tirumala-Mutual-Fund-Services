import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-4 mb-12',
        {
          'text-left items-start': alignment === 'left',
          'text-center items-center mx-auto': alignment === 'center',
          'text-right items-end': alignment === 'right',
        },
        className
      )}
    >
      <h2 className="section-title text-slate-900 dark:text-white">
        {title}
      </h2>
      <div 
        className={cn("h-1 w-20 bg-primary-600 rounded-full my-4", {
          'mx-auto': alignment === 'center',
          'ml-auto': alignment === 'right'
        })}
      />
      {subtitle && (
        <p className="text-body max-w-2xl text-slate-600 dark:text-slate-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
