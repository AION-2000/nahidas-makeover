import React, { useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isWalkingThrough, setIsWalkingThrough] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Show welcome text slightly after doors start parting
    setTimeout(() => {
      setShowWelcome(true);
    }, 400);

    // Fade out welcome text quickly
    setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    setTimeout(() => {
      setIsWalkingThrough(true);
    }, 2200);

    setTimeout(() => {
      setIsRevealed(true);
    }, 3200);

    setTimeout(() => {
      onComplete();
      setTimeout(() => setShouldRender(false), 1000);
    }, 4200);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white transition-opacity duration-1000 ${isRevealed ? 'opacity-0' : 'opacity-100'} ${isRevealed ? 'pointer-events-none' : ''}`}>

      {/* Refined Contextual Background with Magical Lighting */}
      <div className={`absolute inset-0 transition-all duration-[4000ms] ease-out transform ${isWalkingThrough ? 'scale-[2.2] opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="absolute inset-0 bg-[#fdfcfc]">
          {/* Enhanced Dynamic Ambient Glows */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Prismatic Glow Blobs */}
            <div className="absolute top-[-10%] left-[-20%] w-[120vw] h-[120vw] md:w-[70%] md:h-[70%] bg-gradient-to-br from-rose-100/40 to-transparent rounded-full blur-[100px] md:blur-[160px] animate-float-ethereal"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[110vw] h-[110vw] md:w-[75%] md:h-[75%] bg-gradient-to-tl from-rose-200/30 via-white/40 to-transparent rounded-full blur-[100px] md:blur-[180px] animate-float-ethereal-slow"></div>
            <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] md:w-[40%] md:h-[40%] bg-white/80 rounded-full blur-[60px] md:blur-[120px] animate-pulse-ethereal"></div>

            {/* Prismatic Light Beams */}
            <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-rose-100/10 to-transparent -rotate-45 animate-light-sweep pointer-events-none"></div>

            {/* Ethereal Stardust Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-rose-200 rounded-full blur-[0.5px] animate-stardust"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 12}s`,
                    animationDuration: `${8 + Math.random() * 10}s`,
                    opacity: Math.random() * 0.6 + 0.1,
                    transform: `scale(${0.5 + Math.random()})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Magical Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none"></div>

          {/* Main Light Source from above */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-gradient-to-b from-white via-rose-50/20 to-transparent opacity-80"></div>

          {/* Subtle "Floor" Grounding with soft shadow */}
          <div className="absolute bottom-0 w-full h-[30vh] md:h-[40vh] bg-gradient-to-t from-slate-100/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Welcome Message Popup - Responsive Sizing */}
      <div className={`absolute z-40 transition-all duration-700 ease-out transform flex flex-col items-center px-6 text-center
        ${showWelcome ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
        <span className="text-rose-400 font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px] mb-3 md:mb-4">Welcome to the</span>
        <h2 className="serif italic text-4xl md:text-7xl text-slate-800 font-light tracking-tight">Studio</h2>
        <div className="w-8 md:w-12 h-px bg-rose-200 mt-4 md:mt-6"></div>
      </div>

      {/* Architectural Portal Panels */}
      <div className={`relative w-full h-full perspective-[2000px] md:perspective-[2500px] flex transition-transform duration-[3500ms] ease-in-out ${isWalkingThrough ? 'scale-[2.5]' : ''}`}>

        {/* Left Door */}
        <div
          className={`relative w-1/2 h-full bg-white origin-left transition-transform duration-[2500ms] cubic-bezier(0.65, 0, 0.35, 1) flex items-center justify-end border-r border-slate-100/50
            ${isOpening ? '-rotate-y-[105deg] translate-x-[-15%]' : 'rotate-y-0 shadow-[20px_0_60px_rgba(0,0,0,0.05)] md:shadow-[40px_0_100px_rgba(0,0,0,0.08)]'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 3D Door Thickness Edge */}
          <div className="absolute top-0 right-0 w-[12px] md:w-[24px] h-full bg-slate-200 origin-right rotate-y-[90deg] translate-x-[12px] md:translate-x-[24px]"></div>

          {/* Luxury Molding */}
          <div className="absolute top-[10%] md:top-[5%] right-[5%] bottom-[10%] md:bottom-[5%] left-[15%] md:left-[10%] border-[1px] md:border-[2px] border-slate-50 rounded-sm bg-[#fcfcfc]">
            <div className="absolute top-[6%] right-[6%] bottom-[6%] left-[6%] border border-rose-100/30 rounded-sm">
              <div className="absolute top-2 md:top-4 left-2 md:left-4 w-4 md:w-6 h-4 md:h-6 border-t border-l border-rose-200/30"></div>
              <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-4 md:w-6 h-4 md:h-6 border-b border-r border-rose-200/30"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none">
                <span className="serif italic text-[30vw] md:text-[20vw] font-bold">N</span>
              </div>
            </div>
          </div>

          {/* Door Handle Assembly - Responsive */}
          <div className="relative z-10 mr-4 md:mr-16 flex items-center group">
            <div className="absolute right-0 flex flex-col justify-between h-24 md:h-48 py-1 md:py-2">
              <div className="w-4 md:w-10 h-[2px] md:h-[3px] bg-rose-200/60"></div>
              <div className="w-4 md:w-10 h-[2px] md:h-[3px] bg-rose-200/60"></div>
            </div>
            <div className="w-[3px] md:w-[8px] h-32 md:h-72 bg-gradient-to-b from-rose-50 via-[#b76e79] to-rose-50 rounded-full shadow-[0_10px_20px_rgba(183,110,121,0.15)] border-x border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 w-1/3 h-full bg-white/30 skew-x-[-20deg] translate-x-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Door */}
        <div
          className={`relative w-1/2 h-full bg-white origin-right transition-transform duration-[2500ms] cubic-bezier(0.65, 0, 0.35, 1) flex items-center justify-start border-l border-slate-100/50
            ${isOpening ? 'rotate-y-[105deg] translate-x-[15%]' : 'rotate-y-0 shadow-[-20px_0_60px_rgba(0,0,0,0.05)] md:shadow-[-40px_0_100px_rgba(0,0,0,0.08)]'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 3D Door Thickness Edge */}
          <div className="absolute top-0 left-0 w-[12px] md:w-[24px] h-full bg-slate-200 origin-left -rotate-y-[90deg] translate-x-[-12px] md:translate-x-[-24px]"></div>

          {/* Luxury Molding */}
          <div className="absolute top-[10%] md:top-[5%] left-[5%] bottom-[10%] md:bottom-[5%] right-[15%] md:right-[10%] border-[1px] md:border-[2px] border-slate-50 rounded-sm bg-[#fcfcfc]">
            <div className="absolute top-[6%] left-[6%] bottom-[6%] right-[6%] border border-rose-100/30 rounded-sm">
              <div className="absolute top-2 md:top-4 right-2 md:right-4 w-4 md:w-6 h-4 md:h-6 border-t border-r border-rose-200/30"></div>
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 w-4 md:w-6 h-4 md:h-6 border-b border-l border-rose-200/30"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none">
                <span className="serif italic text-[30vw] md:text-[20vw] font-bold">M</span>
              </div>
            </div>
          </div>

          {/* Door Handle Assembly - Responsive */}
          <div className="relative z-10 ml-4 md:ml-16 flex items-center">
            <div className="absolute left-0 flex flex-col justify-between h-24 md:h-48 py-1 md:py-2">
              <div className="w-4 md:w-10 h-[2px] md:h-[3px] bg-rose-200/60"></div>
              <div className="w-4 md:w-10 h-[2px] md:h-[3px] bg-rose-200/60"></div>
            </div>
            <div className="w-[3px] md:w-[8px] h-32 md:h-72 bg-gradient-to-b from-rose-50 via-[#b76e79] to-rose-50 rounded-full shadow-[0_10px_20px_rgba(183,110,121,0.15)] border-x border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 w-1/3 h-full bg-white/30 skew-x-[-20deg] translate-x-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Center Interaction Hub - Responsive scaling for mobile */}
        {!isOpening && (
          <div
            onClick={handleOpen}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group flex flex-col items-center gap-8 md:gap-12"
          >
            <div className="relative flex items-center justify-center scale-75 md:scale-100">
              {/* Complex Rotating Rings */}
              <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-[0.5px] border-rose-200/30 animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border-[1px] border-dashed border-rose-200/40 animate-[spin_25s_linear_infinite_reverse]"></div>

              {/* Solid Glass Shield with internal glow */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[1px] md:border-[1.5px] border-rose-200/50 group-hover:scale-110 group-hover:border-rose-400 transition-all duration-1000 group-hover:shadow-[0_0_60px_rgba(183,110,121,0.3)] bg-white/10 backdrop-blur-[2px]"></div>

              {/* Core Embossed Disc */}
              <div className="absolute inset-0 m-4 md:m-6 rounded-full bg-white/80 backdrop-blur-3xl border-[1px] border-white/95 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:bg-white transition-all duration-700">
                <div className="flex flex-col items-center">
                  <span className="serif italic text-[50px] md:text-[80px] font-bold text-slate-800 leading-none select-none tracking-tighter">
                    N
                  </span>
                  <div className="h-px w-6 md:w-8 bg-rose-200 mt-[-4px] md:mt-[-8px]"></div>
                </div>
                <div className="absolute inset-3 md:inset-4 rounded-full border border-rose-50/50"></div>
              </div>
            </div>

            {/* Interaction Hint */}
            <div className="text-center animate-fade-in group-hover:translate-y-1 transition-all duration-700">
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[1em] md:tracking-[1.2em] text-slate-400 ml-[1em] group-hover:text-rose-400">
                Nahida's Makeover
              </span>
              <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-5 justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-4 md:w-6 h-px bg-gradient-to-r from-transparent to-rose-300"></div>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#b76e79] shadow-[0_0_10px_rgba(183,110,121,0.5)]"></div>
                <div className="w-4 md:w-6 h-px bg-gradient-to-l from-transparent to-rose-300"></div>
              </div>
            </div>
          </div>
        )}

        {/* Final White Fade Reveal */}
        <div className={`absolute inset-0 z-50 transition-opacity duration-1200 pointer-events-none ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-white"></div>
        </div>
      </div>

      <style>{`
        .perspective-[2000px] { perspective: 2000px; }
        .perspective-[2500px] { perspective: 2500px; }
        .origin-left { transform-origin: left; }
        .origin-right { transform-origin: right; }
        .rotate-y-0 { transform: rotateY(0); }
        .-rotate-y-[105deg] { transform: rotateY(-105deg); }
        .rotate-y-[105deg] { transform: rotateY(105deg); }
        .cubic-bezier(0.65, 0, 0.35, 1) { transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-ethereal {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(3%, 3%) scale(1.02); opacity: 0.5; }
          66% { transform: translate(-2%, 5%) scale(0.98); opacity: 0.4; }
        }

        @keyframes float-ethereal-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(-5%, -3%) rotate(3deg); opacity: 0.6; }
        }

        @keyframes pulse-ethereal {
          0%, 100% { opacity: 0.4; transform: scale(1); filter: blur(60px); }
          50% { opacity: 0.8; transform: scale(1.05); filter: blur(80px); }
        }

        @keyframes stardust {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-150px) scale(0) rotate(180deg); opacity: 0; }
        }

        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
        }

        @keyframes light-sweep {
          0% { transform: translateX(-100%) rotate(-45deg); }
          100% { transform: translateX(100%) rotate(-45deg); }
        }

        .animate-float-ethereal {
          animation: float-ethereal 15s ease-in-out infinite;
        }

        .animate-float-ethereal-slow {
          animation: float-ethereal-slow 22s ease-in-out infinite;
        }

        .animate-pulse-ethereal {
          animation: pulse-ethereal 8s ease-in-out infinite;
        }

        .animate-stardust {
          animation: stardust linear infinite;
        }

        .animate-shimmer-sweep {
          animation: shimmer-sweep 12s linear infinite;
        }

        .animate-light-sweep {
          animation: light-sweep 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;