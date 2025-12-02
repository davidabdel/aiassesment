import React from 'react';
import { AuditInputs, AuditResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Clock, AlertTriangle, CheckCircle, DollarSign, Download, Zap } from 'lucide-react';

interface ResultsPageProps {
    inputs: AuditInputs;
    results: AuditResult;
    onRestart: () => void;
    onBookCall: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ inputs, results, onRestart, onBookCall }) => {
    // ... (rest of the component logic)

    // ... inside return ...
    <button
        onClick={onBookCall}
        className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg text-lg"
    >
        Book Your FREE Call
    </button>
    // Estimate team size for calculation
    const getAvgTeamSize = (size: string) => {
        if (size === '5-10') return 7;
        if (size === '11-25') return 18;
        if (size === '26-50') return 38;
        return 60; // 51+
    };

    const teamSize = getAvgTeamSize(inputs.teamSize);
    const totalWeeklyHours = teamSize * 40;
    const wastedHours = results.totalHoursWastedPerWeek;
    const productiveHours = Math.max(0, totalWeeklyHours - wastedHours);

    const chartData = [
        { name: 'Productive Time', value: Math.round(productiveHours), color: '#64748b' }, // Slate 500
        { name: 'Wasted / Automatable', value: Math.round(wastedHours), color: '#4f46e5' }, // Indigo 600
    ];

    const getScoreColor = (score: number) => {
        if (score < 30) return 'text-emerald-600';
        if (score < 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreLabel = (score: number) => {
        if (score < 30) return 'Optimized';
        if (score < 60) return 'Moderate Leaks';
        return 'Critical Leak Alert';
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-bold">Audit Results: <span className="text-indigo-600">{inputs.name}'s Business</span></h1>
                        <p className="text-slate-500 mt-1">Generated exclusively for your operations team.</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-sm">
                            <Download className="w-4 h-4" /> Save PDF
                        </button>
                        <button onClick={onRestart} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-sm">
                            Restart
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Col: Stats & Score */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Score Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <AlertTriangle className="w-24 h-24 text-slate-900" />
                            </div>
                            <h3 className="text-slate-500 font-medium uppercase tracking-wider text-sm mb-2">Time Leak Score</h3>
                            <div className={`text-6xl font-black ${getScoreColor(results.score)} mb-2`}>
                                {results.score}/100
                            </div>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 ${getScoreColor(results.score)}`}>
                                {getScoreLabel(results.score)}
                            </div>
                            <p className="mt-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                                {results.summary}
                            </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                                <Clock className="w-5 h-5 text-indigo-600 mb-2" />
                                <div className="text-2xl font-bold text-slate-900">{Math.round(results.totalHoursWastedPerWeek)}</div>
                                <div className="text-xs text-slate-500">Hours Wasted / Week</div>
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                                <DollarSign className="w-5 h-5 text-emerald-600 mb-2" />
                                <div className="text-2xl font-bold text-emerald-600">{results.potentialCostSavings}</div>
                                <div className="text-xs text-slate-500">Potential Yearly Savings</div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <h3 className="text-slate-500 font-medium text-sm mb-4">Team Capacity Analysis</h3>
                            <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#0f172a' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Analysis & Recommendations */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                                <CheckCircle className="text-indigo-600" />
                                Operations Upgrade Plan
                            </h2>

                            <div className="space-y-4">
                                {results.recommendations.map((rec, index) => (
                                    <div key={index} className="bg-white border border-slate-200 hover:border-indigo-500 rounded-xl p-6 transition-all group shadow-sm hover:shadow-md">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {rec.title}
                                            </h3>
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${rec.impact === 'High' ? 'bg-emerald-100 text-emerald-700' :
                                                rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {rec.impact} Impact
                                            </span>
                                        </div>
                                        <p className="text-slate-600 mb-0">{rec.description}</p>
                                        {/* Suggested Tool section removed as requested */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call To Action */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <h2 className="text-2xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
                                Ready to Fix these leaks in less than 30 days?
                            </h2>

                            <button
                                onClick={onBookCall}
                                className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg text-lg"
                            >
                                Book Your FREE Call
                            </button>
                            <p className="mt-4 text-sm text-indigo-100 font-medium">Limited spots Available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;