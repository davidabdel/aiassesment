import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, Zap, TrendingUp, CheckCircle, Coins, Banknote, Users, Hourglass, Briefcase, Settings, Gauge, Sun, Moon } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

type BaseVariant = 'default' | 'profit' | 'wage' | 'efficiency' | 'ceo' | 'founder' | 'scale' | 'self';
type VariantKey = BaseVariant | `${BaseVariant}-light`;

interface HeroContent {
  title: string;
  headline: React.ReactNode;
  subhead: React.ReactNode;
  cta: string;
  supporting: string;
  icon: React.ElementType;
  gradientDark: string;
  gradientLight: string;
  visualComponent: React.ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [variant, setVariant] = useState<VariantKey>('default');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v') as VariantKey;
    // Simple validation to ensure valid variant key
    if (v && (v.endsWith('-light') || ['default', 'profit', 'wage', 'efficiency', 'ceo', 'founder', 'scale', 'self'].includes(v))) {
      setVariant(v);
    }
  }, []);

  const isLight = variant.endsWith('-light');
  const baseVariant = variant.replace('-light', '') as BaseVariant;

  // --- Visual Components for Hero Packs ---
  // We use closure to access 'isLight' state for dynamic coloring

  const ProfitVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${isLight ? 'bg-yellow-500/30' : 'bg-yellow-500/20'}`}></div>
      <Coins className={`w-full h-full relative z-10 ${isLight ? 'text-yellow-600' : 'text-yellow-400'}`} />
      {/* Falling coins effect */}
      <div className={`absolute -top-4 -right-4 animate-[bounce_2s_infinite] opacity-75 ${isLight ? 'text-yellow-700' : 'text-yellow-200'}`}>$</div>
      <div className={`absolute top-0 -left-6 animate-[bounce_2.5s_infinite] delay-75 opacity-75 ${isLight ? 'text-yellow-600' : 'text-yellow-300'}`}>$</div>
    </div>
  );

  const WageVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-red-500/30' : 'bg-red-500/20'}`}></div>
      <Banknote className={`w-full h-full relative z-10 ${isLight ? 'text-red-600' : 'text-red-400'}`} />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-full flex flex-col items-center">
        <div className={`w-1 h-3 rounded-full animate-[ping_1.5s_infinite] ${isLight ? 'bg-red-600/50' : 'bg-red-400/50'}`}></div>
        <div className={`w-1 h-3 rounded-full mt-1 animate-[ping_1.5s_infinite_delay-100ms] ${isLight ? 'bg-red-600/30' : 'bg-red-400/30'}`}></div>
      </div>
    </div>
  );

  const EfficiencyVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-emerald-500/30' : 'bg-emerald-500/20'}`}></div>
      <Gauge className={`w-full h-full relative z-10 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
      <div className={`absolute bottom-0 right-0 border px-2 py-0.5 rounded text-xs font-mono ${isLight ? 'bg-white border-emerald-600/50 text-emerald-700' : 'bg-slate-900 border-emerald-500/50 text-emerald-300'}`}>
        Low Output
      </div>
    </div>
  );

  const CeoVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-purple-500/30' : 'bg-purple-500/20'}`}></div>
      <Hourglass className={`w-full h-full relative z-10 animate-[spin_10s_linear_infinite] ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
      <div className={`absolute -right-8 top-1/2 -translate-y-1/2 border px-3 py-1 rounded-lg text-xs shadow-xl ${isLight ? 'bg-white border-purple-200 text-purple-700' : 'bg-slate-800 border-purple-500/30 text-purple-200'}`}>
        +10 Hrs
      </div>
    </div>
  );

  const FounderVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-orange-500/30' : 'bg-orange-500/20'}`}></div>
      <Briefcase className={`w-full h-full relative z-10 ${isLight ? 'text-orange-600' : 'text-orange-400'}`} />
      <div className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-0.5 rounded-full border animate-pulse ${isLight ? 'bg-red-500 text-white border-white' : 'bg-red-500 text-white border-slate-900'}`}>
        OVERLOAD
      </div>
    </div>
  );

  const ScaleVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-blue-500/30' : 'bg-blue-500/20'}`}></div>
      <TrendingUp className={`w-full h-full relative z-10 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
      {/* Flat line for staff */}
      <div className={`absolute bottom-2 left-0 w-full h-1 rounded-full overflow-hidden ${isLight ? 'bg-slate-300' : 'bg-slate-600'}`}>
        <div className={`w-1/3 h-full ${isLight ? 'bg-slate-500' : 'bg-slate-400'}`}></div>
      </div>
      <div className={`absolute -bottom-4 w-full text-center text-[10px] uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
        Headcount: Flat
      </div>
    </div>
  );

  const SelfRunningVisual = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className={`absolute inset-0 rounded-full blur-xl ${isLight ? 'bg-indigo-500/30' : 'bg-indigo-500/20'}`}></div>
      <Settings className={`w-full h-full relative z-10 animate-[spin_4s_linear_infinite] ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
      <div className={`absolute top-0 right-0 w-8 h-8 animate-[spin_3s_linear_infinite_reverse] ${isLight ? 'text-indigo-400' : 'text-indigo-300'}`}>
        <Settings className="w-full h-full" />
      </div>
    </div>
  );

  // --- Content Dictionary ---

  const contentMap: Record<BaseVariant, HeroContent> = {
    default: {
      title: "AI Time Leak Audit™",
      headline: <>Are you ready to stop wasting <br className="hidden sm:block" /><span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-indigo-600 to-purple-600' : 'from-indigo-400 to-purple-400'}`}>10–40 hours a week</span> on tasks AI could handle?</>,
      subhead: "Take the free audit and reveal exactly where your business is bleeding time. Get your personalized Time Leak Score in under 2 minutes.",
      cta: "Start the Time Leak Audit",
      supporting: "No login required. Instant Results.",
      icon: Zap,
      gradientDark: "from-indigo-400 to-purple-400",
      gradientLight: "from-indigo-600 to-purple-600",
      visualComponent: null
    },
    profit: {
      title: "Profit Leak Locator™",
      headline: <>Are you ready to stop losing profit <br className="hidden sm:block" /> to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-yellow-600 to-amber-600' : 'from-yellow-400 to-amber-500'}`}>tasks your team shouldn’t be doing?</span></>,
      subhead: "Take the free audit and pinpoint exactly where hidden costs are eating your margins. Get your personalized Profit Leak Score in under 2 minutes.",
      cta: "Start the Profit Leak Locator",
      supporting: "See exactly how much money inefficient workflows are costing you every week.",
      icon: Coins,
      gradientDark: "from-yellow-400 to-amber-500",
      gradientLight: "from-yellow-600 to-amber-600",
      visualComponent: <ProfitVisual />
    },
    wage: {
      title: "Wage Waste Detector™",
      headline: <>How much payroll are you wasting every month? <br className="hidden sm:block" /><span className={`block mt-2 text-2xl sm:text-3xl ${isLight ? 'text-red-600' : 'text-red-400'}`}>Most businesses overpay staff 15–35% without realising it.</span></>,
      subhead: (
        <>
          <p className="mb-6">Take the 2-minute Wage Waste Detector™ and uncover the tasks draining payroll — and what AI can replace immediately to reduce wage costs.</p>
          <ul className={`text-left max-w-md mx-auto space-y-3 mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> Identify the tasks burning payroll unnecessarily</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> See where your team is overspending time</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> Find out what AI can automate immediately</li>
          </ul>
        </>
      ),
      cta: "Reveal My Wage Waste Score",
      supporting: "⭐ Trusted by business owners across Australia",
      icon: Banknote,
      gradientDark: "from-red-400 to-rose-500",
      gradientLight: "from-red-600 to-rose-600",
      visualComponent: <WageVisual />
    },
    efficiency: {
      title: "Team Efficiency Breakdown™",
      headline: <>Are you ready to uncover why your team <br className="hidden sm:block" /> is <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-emerald-600 to-teal-600' : 'from-emerald-400 to-teal-500'}`}>busy all day but output is still slow?</span></>,
      subhead: "Take the free audit and see which workflows are slowing your team down. Get your personalized Efficiency Score in under 2 minutes.",
      cta: "Start the Efficiency Breakdown",
      supporting: "Reveal the tasks dragging productivity down — and what AI can handle instantly.",
      icon: Users,
      gradientDark: "from-emerald-400 to-teal-500",
      gradientLight: "from-emerald-600 to-teal-600",
      visualComponent: <EfficiencyVisual />
    },
    ceo: {
      title: "CEO Time Recovery Blueprint™",
      headline: <>Are you ready to reclaim 10–40 hours a week <br className="hidden sm:block" /> and <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-purple-600 to-violet-600' : 'from-purple-400 to-violet-500'}`}>finally get your time back as a CEO?</span></>,
      subhead: "Take the free audit and find out where your week is being drained by low-value tasks. Get your personalized Time Recovery Score in under 2 minutes.",
      cta: "Start the Time Recovery Blueprint",
      supporting: "Stop being the bottleneck — get clarity on where AI can free up your time instantly.",
      icon: Hourglass,
      gradientDark: "from-purple-400 to-violet-500",
      gradientLight: "from-purple-600 to-violet-600",
      visualComponent: <CeoVisual />
    },
    founder: {
      title: "Founder Workload Reset™",
      headline: <>Are you carrying your <br className="hidden sm:block" /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-orange-600 to-amber-600' : 'from-orange-400 to-amber-500'}`}>entire business on your back?</span></>,
      subhead: (
        <>
          <p className="mb-6">Take the 2-minute Founder Workload Reset™ to uncover exactly what you should stop doing — and how AI can remove 10–20 hours from your week.</p>
          <ul className={`text-left max-w-md mx-auto space-y-3 mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> Identify the tasks draining your time and energy</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> Reveal what you can automate, delegate, or delete</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✔</span> Get your Founder Load Score instantly (no email until results)</li>
          </ul>
        </>
      ),
      cta: "Calculate My Founder Load Score",
      supporting: "⭐ Trusted by business owners across Australia",
      icon: Briefcase,
      gradientDark: "from-orange-400 to-amber-500",
      gradientLight: "from-orange-600 to-amber-600",
      visualComponent: <FounderVisual />
    },
    scale: {
      title: "Scale-Without-Staff Score™",
      headline: <>Are you ready to scale faster <br className="hidden sm:block" /> without <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-blue-600 to-cyan-600' : 'from-blue-400 to-cyan-500'}`}>hiring more people or adding payroll?</span></>,
      subhead: "Take the free audit and discover where AI can help you scale without adding headcount. Get your personalized Scale Score in under 2 minutes.",
      cta: "Start the Scale Score",
      supporting: "See how to grow your business without growing your staffing costs.",
      icon: TrendingUp,
      gradientDark: "from-blue-400 to-cyan-500",
      gradientLight: "from-blue-600 to-cyan-600",
      visualComponent: <ScaleVisual />
    },
    self: {
      title: "Self-Running Business Assessment™",
      headline: <>Are you ready to build a business that runs <br className="hidden sm:block" /> without <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLight ? 'from-indigo-600 to-blue-600' : 'from-indigo-400 to-blue-500'}`}>you being involved in every task?</span></>,
      subhead: "Take the free audit and see what’s stopping your business from running without you. Get your personalized Self-Running Score in under 2 minutes.",
      cta: "Start the Self-Running Assessment",
      supporting: "Find out what must change for your business to operate smoothly — even when you’re not there.",
      icon: Settings,
      gradientDark: "from-indigo-400 to-blue-500",
      gradientLight: "from-indigo-600 to-blue-600",
      visualComponent: <SelfRunningVisual />
    }
  };

  const currentContent = contentMap[baseVariant];
  const CurrentIcon = currentContent.icon;

  const baseVariantsList: BaseVariant[] = ['default', 'profit', 'wage', 'efficiency', 'ceo', 'founder', 'scale', 'self'];

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 relative ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-900 text-slate-50'}`}>
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <CurrentIcon className={`${isLight ? 'text-indigo-600' : 'text-indigo-500'}`} />
          <span>{currentContent.title}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto relative z-10">

        {/* Dynamic Visual */}
        <div className="animate-fadeIn">
          {currentContent.visualComponent}
        </div>

        <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-slideUp ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {currentContent.headline}
        </h1>

        <p className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-slideUp delay-100 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {currentContent.subhead}
        </p>

        <button
          onClick={onStart}
          className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-slideUp delay-200 shadow-lg ${isLight ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600 focus:ring-offset-white shadow-indigo-600/20' : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-600 focus:ring-offset-slate-900 shadow-indigo-600/20'}`}
        >
          {currentContent.cta}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className={`mt-8 text-sm flex flex-col sm:flex-row items-center gap-4 animate-slideUp delay-300 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          {currentContent.supporting.startsWith('⭐') ? (
            <span className="flex items-center gap-2 font-medium">{currentContent.supporting}</span>
          ) : (
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {currentContent.supporting}</span>
          )}
        </div>
      </main>

      {/* Value Props */}
      <section className={`py-16 w-full relative z-10 ${isLight ? 'bg-white border-t border-slate-200' : 'bg-slate-800/50 border-t border-slate-700/50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className={`text-2xl font-bold text-center mb-12 ${isLight ? 'text-slate-900' : 'text-white'}`}>What this audit will show you</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl border transition-colors ${isLight ? 'bg-slate-50 border-slate-200 hover:border-indigo-500/50' : 'bg-slate-900 border-slate-700 hover:border-indigo-500/50'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-500/20 text-indigo-400'}`}>
                <Clock className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Hidden Leaks</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Identify the silent profit killers and time drains in your daily workflow.</p>
            </div>

            <div className={`p-6 rounded-2xl border transition-colors ${isLight ? 'bg-slate-50 border-slate-200 hover:border-indigo-500/50' : 'bg-slate-900 border-slate-700 hover:border-indigo-500/50'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/20 text-purple-400'}`}>
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Cost of Manual Work</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Calculate exactly how much repetitive tasks are costing your bottom line.</p>
            </div>

            <div className={`p-6 rounded-2xl border transition-colors ${isLight ? 'bg-slate-50 border-slate-200 hover:border-indigo-500/50' : 'bg-slate-900 border-slate-700 hover:border-indigo-500/50'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/20 text-emerald-400'}`}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Immediate Wins</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Discover which hours AI could remove instantly with your personalized score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className={`py-8 text-center border-t relative z-10 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
        <p className="text-sm">
          Designed for SMEs (5-50 employees). Takes 3-5 minutes. No jargon.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;