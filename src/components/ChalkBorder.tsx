import React from "react";

interface ChalkBorderProps {
  variant?: "frame" | "header" | "footer" | "vines" | "divider";
  color?: string;
  className?: string;
}

export const ChalkBorder: React.FC<ChalkBorderProps> = ({
  variant = "frame",
  color = "stroke-emerald-500/30",
  className = "",
}) => {
  // We can render custom hand-drawn-like chalk SVGs to frame or divide elements beautifully
  switch (variant) {
    case "frame":
      return (
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main outer slightly squiggly chalk frame */}
          <rect
            x="8"
            y="8"
            width="calc(100% - 16)"
            height="calc(100% - 16)"
            rx="16"
            fill="none"
            className={`${color} stroke-[1.5] chalk-dashed`}
          />
          {/* Inner details representing swirling vines on the corners like the PDF */}
          {/* Top-Left Corner Vine */}
          <path
            d="M 12,40 C 14,24 24,14 40,12 C 30,18 24,30 25,45 C 20,35 15,38 12,40 Z"
            fill="none"
            className={`${color} stroke-[1.5]`}
          />
          {/* Top-Right Corner Vine */}
          <path
            d="M calc(100% - 12),40 C calc(100% - 14),24 calc(100% - 24),14 calc(100% - 40),12 C calc(100% - 30),18 calc(100% - 24),30 calc(100% - 25),45"
            fill="none"
            className={`${color} stroke-[1.5]`}
          />
          {/* Bottom-Left Corner Vine */}
          <path
            d="M 12,calc(100% - 40) C 14,calc(100% - 24) 24,calc(100% - 14) 40,calc(100% - 12) C 30,calc(100% - 18) 24,calc(100% - 30) 25,calc(100% - 45)"
            fill="none"
            className={`${color} stroke-[1.5]`}
          />
          {/* Bottom-Right Corner Vine */}
          <path
            d="M calc(100% - 12),calc(100% - 40) C calc(100% - 14),calc(100% - 24) calc(100% - 24),calc(100% - 14) calc(100% - 40),calc(100% - 12) C calc(100% - 30),calc(100% - 18) calc(100% - 24),calc(100% - 30) calc(100% - 25),calc(100% - 45)"
            fill="none"
            className={`${color} stroke-[1.5]`}
          />
          
          {/* Little starry sparkles in corners */}
          <g className="fill-amber-400/50 animate-pulse">
            <path d="M18,18 L20,22 L18,26 L16,22 Z" />
            <path d="Mcalc(100% - 18),18 Lcalc(100% - 16),22 Lcalc(100% - 18),26 Lcalc(100% - 20),22 Z" />
            <path d="M18,calc(100% - 18) L20,calc(100% - 22) L18,calc(100% - 26) L16,calc(100% - 22) Z" />
            <path d="Mcalc(100% - 18),calc(100% - 18) Lcalc(100% - 16),calc(100% - 22) Lcalc(100% - 18),calc(100% - 26) Lcalc(100% - 20),calc(100% - 22) Z" />
          </g>
        </svg>
      );

    case "header":
      return (
        <svg
          className={`w-full h-8 pointer-events-none ${className}`}
          viewBox="0 0 1000 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Flowing horizontal vines with leaves in chalk style */}
          <path
            d="M 10,15 C 200,5 300,25 500,15 C 700,5 800,25 990,15"
            className={`${color} stroke-[1.5] chalk-dashed`}
            fill="none"
          />
          {/* Leaves along the vine */}
          <path d="M 150,14 C 160,5 170,10 175,15 C 165,20 155,18 150,14 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 350,18 C 340,25 330,22 325,17 C 335,12 345,15 350,18 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 520,15 C 530,5 540,8 545,13 C 535,20 525,18 520,15 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 750,12 C 740,5 730,8 725,13 C 735,20 745,18 750,12 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
        </svg>
      );

    case "footer":
      return (
        <svg
          className={`w-full h-8 pointer-events-none ${className}`}
          viewBox="0 0 1000 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 10,15 C 150,25 350,5 500,15 C 650,25 850,5 990,15"
            className={`${color} stroke-[1.5] chalk-dashed`}
            fill="none"
          />
          {/* Leaves along the vine */}
          <path d="M 220,15 C 230,25 240,20 245,15 C 235,10 225,12 220,15 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 450,12 C 440,5 430,8 425,13 C 435,20 445,18 450,12 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 680,18 C 690,25 700,22 705,17 C 695,12 685,15 680,18 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
          <path d="M 850,14 C 840,20 830,18 825,13 C 835,8 845,10 850,14 Z" className="fill-emerald-400/20 stroke-emerald-500/30 stroke-[0.5]" />
        </svg>
      );

    case "divider":
      return (
        <div className="flex items-center justify-center py-6">
          <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent to-emerald-500/30" />
          <span className="mx-4 text-emerald-500/30 font-hand text-xl">✧ ✦ ✧</span>
          <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent to-emerald-500/30" />
        </div>
      );

    case "vines":
      return (
        <div className={`flex justify-between items-center w-full px-2 pointer-events-none select-none ${className}`}>
          {/* Swirling flourish */}
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className={color}>
            <path d="M 4,20 C 14,4 28,12 24,20 C 20,24 16,18 18,12 C 22,4 40,8 44,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="flex-1 border-t border-dashed mx-4 border-current opacity-20" />
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className={`${color} scale-x-[-1]`}>
            <path d="M 4,20 C 14,4 28,12 24,20 C 20,24 16,18 18,12 C 22,4 40,8 44,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
