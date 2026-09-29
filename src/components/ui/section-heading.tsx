import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = 'center',
  className,
  titleClassName,
  subtitleClassName,
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
      <h2 className={cn("section-title font-extrabold text-slate-900 dark:text-white", titleClassName)}>
        {title}
      </h2>
      <div 
        className={cn("h-1 w-20 rounded-full my-4 bg-gradient-to-r from-gold-500 to-amber-500", {
          'mx-auto': alignment === 'center',
          'ml-auto': alignment === 'right'
        })}
      />
      {subtitle && (
        <p className={cn("text-body max-w-2xl mt-2 font-medium text-slate-600 dark:text-slate-300", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
