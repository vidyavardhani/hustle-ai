
import { Send, Users, TrendingUp, Clock, Sparkles } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Graduates', icon: Users },
  { value: '94%', label: 'Placement Rate', icon: TrendingUp },
  { value: '16', label: 'Weeks', icon: Clock },
];

const Admission = () => {

  return (
    <section 
      id="admission" 
      className="relative w-full min-h-screen bg-black py-16 sm:py-20 lg:py-28 flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wider">ADMISSIONS OPEN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2 sm:mb-3">
            JOIN THE FUTURE
          </h2>

          <p className="text-sm sm:text-base text-white/50">
            Limited seats available.
          </p>
        </div>

        {/* Form */}
          <form className="space-y-4 sm:space-y-5">
            <div>
            <a
              href="https://vvdx.in/arena"
              className="group w-full px-6 py-3 sm:py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              
                <>
                  Request Access
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              
            </a>
            </div>
            <p className="text-center text-xs text-white/40">
              By applying, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

        {/* Stats */}
        <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-white/40 mb-1 sm:mb-2">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase">{stat.label}</span>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Admission;
