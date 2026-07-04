'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { LineChart, Target } from 'lucide-react';

export default function GoalCalculatorPage() {
  const [targetAmount, setTargetAmount] = useState(5000000);
  const [yearsToGoal, setYearsToGoal] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateGoal = () => {
    // Calculate required monthly SIP to reach target amount
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToGoal * 12;
    const requiredSIP = Math.round((targetAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1));
    const totalInvested = requiredSIP * months;
    const wealthGained = targetAmount - totalInvested;

    return { requiredSIP, totalInvested, wealthGained };
  };

  const results = calculateGoal();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Financial Goal Planner" 
          subtitle="Determine the monthly investment needed to achieve your financial targets"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Inputs */}
          <div className="glass-card bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Target Amount Needed</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">₹{targetAmount.toLocaleString()}</span>
                </label>
                <input 
                  type="range" min="100000" max="50000000" step="100000" 
                  value={targetAmount} 
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Time Period (Years)</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{yearsToGoal} Yrs</span>
                </label>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={yearsToGoal} 
                  onChange={(e) => setYearsToGoal(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Expected Return Rate (p.a)</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{expectedReturn}%</span>
                </label>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={expectedReturn} 
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card bg-gradient-to-br from-orange-900 to-[#0a0f1c] rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2 text-orange-400">
              <Target size={24} />
              Goal Investment Strategy
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Principal Required</p>
                <p className="text-2xl font-semibold">₹{results.totalInvested.toLocaleString()}</p>
              </div>

              <div className="pt-6 border-t border-slate-700/50">
                <p className="text-slate-300 text-sm mb-1">Required Monthly SIP</p>
                <p className="text-4xl font-bold text-white">₹{results.requiredSIP.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-2">You will earn <strong className="text-emerald-400">₹{results.wealthGained.toLocaleString()}</strong> in returns over {yearsToGoal} years.</p>
              </div>
            </div>

            <button className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
              Start Goal SIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
