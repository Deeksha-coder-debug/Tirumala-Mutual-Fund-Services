import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-200 dark:before:via-primary-800 before:to-transparent", className)}>
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow hover-lift z-10 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
            {step.icon || <Check className="w-5 h-5" />}
          </div>
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 shadow-sm hover-lift">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">{step.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
