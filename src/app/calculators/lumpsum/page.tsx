'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { LineChart, Calculator } from 'lucide-react';

export default function LumpsumCalculatorPage() {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateLumpsum = () => {
    // Lumpsum Formula: A = P * (1 + r/100)^n
    const estimatedReturns = Math.round(totalInvestment * Math.pow((1 + expectedReturn / 100), years));
    const wealthGained = estimatedReturns - totalInvestment;

    return { totalInvestment, estimatedReturns, wealthGained };
  };

  const results = calculateLumpsum();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Lumpsum Calculator" 
          subtitle="Calculate the future value of your one-time investment"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Inputs */}
          <div className="glass-card bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Total Investment</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">₹{totalInvestment.toLocaleString()}</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="10000000" 
                  step="5000" 
                  value={totalInvestment} 
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{expectedReturn}%</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1" 
                  value={expectedReturn} 
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Time Period (Years)</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{years} Yr</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  step="1" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card bg-gradient-to-br from-primary-900 to-[#0a0f1c] rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2 text-gold-400">
              <LineChart size={24} />
              Investment Projection
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Invested Amount</p>
                <p className="text-2xl font-semibold">₹{results.totalInvestment.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-slate-400 text-sm mb-1">Estimated Wealth Gain</p>
                <p className="text-2xl font-semibold text-emerald-400">+₹{results.wealthGained.toLocaleString()}</p>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <p className="text-slate-300 text-sm mb-1">Total Expected Value</p>
                <p className="text-4xl font-bold text-gold-400">₹{results.estimatedReturns.toLocaleString()}</p>
              </div>
            </div>

            <button className="mt-8 w-full bg-gold-500 hover:bg-gold-600 text-[#0a0f1c] font-bold py-3 rounded-xl transition-colors">
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
