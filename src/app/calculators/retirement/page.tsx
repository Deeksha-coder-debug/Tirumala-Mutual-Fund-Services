'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { LineChart, Sunset } from 'lucide-react';

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateRetirement = () => {
    const yearsToRetire = retirementAge - currentAge;
    
    // Future value of current monthly expenses adjusted for inflation
    const futureMonthlyExpense = Math.round(monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetire));
    
    // Total corpus needed (rough estimation rule of 25x annual expenses for retirement)
    const annualFutureExpense = futureMonthlyExpense * 12;
    const requiredCorpus = annualFutureExpense * 25; 
    
    // Calculate required monthly SIP to reach that corpus
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToRetire * 12;
    const requiredSIP = Math.round((requiredCorpus * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1));

    return { yearsToRetire, futureMonthlyExpense, requiredCorpus, requiredSIP };
  };

  const results = calculateRetirement();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Retirement Planner" 
          subtitle="Plan for a financially secure and stress-free retirement"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Inputs */}
          <div className="glass-card bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Current Age</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{currentAge} Yrs</span>
                </label>
                <input 
                  type="range" min="18" max="55" step="1" 
                  value={currentAge} 
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Retirement Age</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{retirementAge} Yrs</span>
                </label>
                <input 
                  type="range" min={currentAge + 1} max="70" step="1" 
                  value={retirementAge} 
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Current Monthly Expenses</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">₹{monthlyExpense.toLocaleString()}</span>
                </label>
                <input 
                  type="range" min="10000" max="500000" step="5000" 
                  value={monthlyExpense} 
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">Inflation Rate (%)</label>
                  <input 
                    type="number" value={inflationRate} 
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">Expected Return (%)</label>
                  <input 
                    type="number" value={expectedReturn} 
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card bg-gradient-to-br from-indigo-900 to-[#0a0f1c] rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2 text-indigo-400">
              <Sunset size={24} />
              Retirement Blueprint
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Time to Retire</p>
                <p className="text-2xl font-semibold">{results.yearsToRetire} Years</p>
              </div>
              
              <div>
                <p className="text-slate-400 text-sm mb-1">Monthly Expenses after {results.yearsToRetire} years</p>
                <p className="text-2xl font-semibold text-rose-400">₹{results.futureMonthlyExpense.toLocaleString()}/mo</p>
              </div>

              <div className="pt-6 border-t border-slate-700/50">
                <p className="text-slate-300 text-sm mb-1">Total Retirement Corpus Required</p>
                <p className="text-4xl font-bold text-indigo-400">₹{(results.requiredCorpus / 10000000).toFixed(2)} Cr</p>
                <p className="text-xs text-slate-500 mt-2">Required Monthly SIP: <strong className="text-white">₹{results.requiredSIP.toLocaleString()}</strong></p>
              </div>
            </div>

            <button className="mt-8 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
              Start Retirement SIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
