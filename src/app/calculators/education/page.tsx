'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { LineChart, GraduationCap } from 'lucide-react';

export default function EducationCalculatorPage() {
  const [currentCost, setCurrentCost] = useState(1000000);
  const [yearsToCollege, setYearsToCollege] = useState(10);
  const [inflationRate, setInflationRate] = useState(8);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateEducation = () => {
    // Future cost of education adjusted for inflation
    const futureCost = Math.round(currentCost * Math.pow(1 + inflationRate / 100, yearsToCollege));
    
    // Calculate required monthly SIP to reach that corpus
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToCollege * 12;
    const requiredSIP = Math.round((futureCost * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1));

    return { futureCost, requiredSIP };
  };

  const results = calculateEducation();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Education Planner" 
          subtitle="Estimate and plan for the future cost of your child's higher education"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Inputs */}
          <div className="glass-card bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Current Cost of Education</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">₹{currentCost.toLocaleString()}</span>
                </label>
                <input 
                  type="range" min="100000" max="20000000" step="100000" 
                  value={currentCost} 
                  onChange={(e) => setCurrentCost(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-700 dark:text-slate-300 font-medium mb-4">
                  <span>Years to College</span>
                  <span className="font-bold text-primary-600 dark:text-gold-400">{yearsToCollege} Yrs</span>
                </label>
                <input 
                  type="range" min="1" max="25" step="1" 
                  value={yearsToCollege} 
                  onChange={(e) => setYearsToCollege(Number(e.target.value))}
                  className="w-full accent-primary-600 dark:accent-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">Education Inflation (%)</label>
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
          <div className="glass-card bg-gradient-to-br from-teal-900 to-primary-950 rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2 text-emerald-400">
              <GraduationCap size={24} />
              Education Fund Projection
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Estimated Cost in {yearsToCollege} Years</p>
                <p className="text-3xl font-bold text-emerald-400">₹{results.futureCost.toLocaleString()}</p>
              </div>

              <div className="pt-6 border-t border-slate-700/50">
                <p className="text-slate-300 text-sm mb-1">Required Monthly SIP</p>
                <p className="text-4xl font-bold text-white">₹{results.requiredSIP.toLocaleString()}</p>
              </div>
            </div>

            <button className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
              Start Education SIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
