import React from "react";
import { getGemMetadata } from "../utils/mathUtils";

interface GemIconProps {
  value: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
  animate?: boolean;
}

export const GemIcon: React.FC<GemIconProps> = ({
  value,
  size = 64,
  className = "",
  showNumber = true,
  animate = true,
}) => {
  const meta = getGemMetadata(value);
  const isCustomPrime = [2, 3, 5, 7, 11, 13, 17, 19].includes(value);

  // Custom inline SVG facets depending on the prime code
  const renderGemSVG = () => {
    switch (value) {
      case 2: // Rubí Rojo - Diamond shape
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]"
          >
            {/* Base Red Polygon */}
            <polygon points="50,5 95,45 50,95 5,45" fill="url(#ruby-grad)" />
            {/* Upper facets */}
            <polygon points="50,5 72,30 50,45" fill="#FFA3A3" opacity="0.6" />
            <polygon points="50,5 28,30 50,45" fill="#FF8080" opacity="0.8" />
            <polygon points="5,45 28,30 50,45" fill="#EF4444" opacity="0.9" />
            <polygon points="95,45 72,30 50,45" fill="#B91C1C" opacity="0.7" />
            
            {/* Lower facets */}
            <polygon points="5,45 50,95 50,45" fill="#991B1B" opacity="0.8" />
            <polygon points="95,45 50,95 50,45" fill="#7F1D1D" opacity="0.9" />
            {/* Sparkle star */}
            <circle cx="70" cy="25" r="3" fill="#FFFFFF" className="animate-pulse" />
            
            <defs>
              <linearGradient id="ruby-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 3: // Zafiro Azul - Brilliant Round Sphere
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]"
          >
            {/* Circular brilliant cut faceted */}
            <circle cx="50" cy="50" r="45" fill="url(#sapphire-grad)" />
            {/* Star Facets in the center */}
            <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" fill="#93C5FD" opacity="0.4" />
            {/* Diagonal facet cuts */}
            <polygon points="50,5 50,15 38,38 15,50 5,50 38,38" fill="#60A5FA" opacity="0.7" />
            <polygon points="50,5 50,15 62,38 85,50 95,50 62,38" fill="#3B82F6" opacity="0.8" />
            <polygon points="50,95 50,85 38,62 15,50 5,50 38,62" fill="#1E40AF" opacity="0.8" />
            <polygon points="50,95 50,85 62,62 85,50 95,50 62,62" fill="#1D4ED8" opacity="0.9" />
            
            {/* Outer ring */}
            <circle cx="50" cy="50" r="44" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            {/* Glimmer */}
            <circle cx="30" cy="30" r="4" fill="#FFFFFF" className="animate-ping" style={{ animationDuration: "3s" }} />
            <circle cx="30" cy="30" r="2.5" fill="#FFFFFF" />

            <defs>
              <linearGradient id="sapphire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 5: // Esmeralda Verde - Emerald Rectangle Step Cut
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
          >
            {/* Octagonal Frame */}
            <polygon points="25,10 75,10 90,25 90,75 75,90 25,90 10,75 10,25" fill="url(#emerald-grad)" />
            {/* Inner Step 1 */}
            <polygon points="32,20 68,20 78,30 78,70 68,80 32,80 22,70 22,30" fill="#4ADE80" opacity="0.25" />
            {/* Inner Table (center) */}
            <polygon points="40,30 60,30 68,38 68,62 60,70 40,70 32,62 32,38" fill="#86EFAC" opacity="0.4" />
            {/* Step cuts (corners to corners) */}
            <line x1="25" y1="10" x2="32" y2="20" stroke="#15803D" strokeWidth="1.5" />
            <line x1="75" y1="10" x2="68" y2="20" stroke="#15803D" strokeWidth="1.5" />
            <line x1="90" y1="25" x2="78" y2="30" stroke="#15803D" strokeWidth="1.5" />
            <line x1="90" y1="75" x2="78" y2="70" stroke="#15803D" strokeWidth="1.5" />
            <line x1="75" y1="90" x2="68" y2="80" stroke="#15803D" strokeWidth="1.5" />
            <line x1="25" y1="90" x2="32" y2="80" stroke="#15803D" strokeWidth="1.5" />
            <line x1="10" y1="75" x2="22" y2="70" stroke="#15803D" strokeWidth="1.5" />
            <line x1="10" y1="25" x2="22" y2="30" stroke="#15803D" strokeWidth="1.5" />
            
            {/* Glimmer */}
            <circle cx="75" cy="22" r="3" fill="#FFFFFF" />

            <defs>
              <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 7: // Amatista Púrpura - Pointed Rhombic Crystal
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
          >
            {/* Tall pointed double-cone crystal */}
            <polygon points="50,2 85,42 50,98 15,42" fill="url(#amethyst-grad)" stroke="#C084FC" strokeWidth="1" />
            {/* Faceted cuts length-wise */}
            <polygon points="50,2 50,98 85,42" fill="#D8B4FE" opacity="0.3" />
            <polygon points="50,2 50,42 15,42" fill="#C084FC" opacity="0.6" />
            <polygon points="50,42 50,98 15,42" fill="#7E22CE" opacity="0.8" />
            <polygon points="50,42 50,98 85,42" fill="#581C87" opacity="0.9" />
            <polygon points="50,2 50,42 85,42" fill="#E9D5FF" opacity="0.7" />
            
            {/* Highlights */}
            <line x1="50" y1="2" x2="50" y2="98" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="42" r="2.5" fill="#FFFFFF" />

            <defs>
              <linearGradient id="amethyst-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 11: // Ámbar Dorado - Star Pentagonal Crystal
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]"
          >
            {/* Pentagonal crystal shape */}
            <polygon points="50,5 92,36 76,88 24,88 8,36" fill="url(#amber-grad)" />
            <polygon points="50,5 50,50 92,36" fill="#FDE047" opacity="0.6" />
            <polygon points="92,36 50,50 76,88" fill="#F59E0B" opacity="0.8" />
            <polygon points="76,88 50,50 24,88" fill="#D97706" opacity="0.9" />
            <polygon points="24,88 50,50 8,36" fill="#92400E" opacity="0.9" />
            <polygon points="8,36 50,50 50,5" fill="#FBBF24" opacity="0.7" />
            <circle cx="50" cy="50" r="2" fill="#FFF" />
            <defs>
              <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 13: // Topacio Turquesa - Rhombic Hexagonal Prism
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(20,184,166,0.7)]"
          >
            {/* Hexagonal double pyramid */}
            <polygon points="50,5 88,25 88,75 50,95 12,75 12,25" fill="url(#topaz-grad)" />
            <polygon points="50,5 50,95 88,75" fill="#99F6E4" opacity="0.3" />
            <polygon points="50,5 50,50 12,25" fill="#2DD4BF" opacity="0.7" />
            <polygon points="12,25 50,50 12,75" fill="#14B8A6" opacity="0.8" />
            <polygon points="12,75 50,50 50,95" fill="#0F766E" opacity="0.9" />
            <polygon points="50,95 50,50 88,75" fill="#115E59" opacity="0.8" />
            <polygon points="88,75 50,50 88,25" fill="#0D9488" opacity="0.9" />
            <polygon points="88,25 50,50 50,5" fill="#5EEAD4" opacity="0.6" />
            <defs>
              <linearGradient id="topaz-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="50%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#115E59" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 17: // Cuarzo Rosa - Heart or Kite shape
      case 19: // Crisoprasa Astral - Rounded Hexagram
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-[0_0_12px_rgba(${value === 17 ? "236,72,153" : "6,182,212"},0.7)]`}
          >
            {/* Star geometry */}
            <polygon points="50,5 65,35 95,50 65,65 50,95 35,65 5,50 35,35" fill={`url(#custom-prime-${value})`} />
            <polygon points="50,5 50,95 65,65" fill="#F472B6" opacity="0.3" />
            <polygon points="50,5 50,50 35,35" fill="#EC4899" opacity="0.7" />
            <polygon points="35,35 50,50 5,50" fill="#DB2777" opacity="0.8" />
            <polygon points="5,50 50,50 35,65" fill="#9D174D" opacity="0.9" />
            <polygon points="35,65 50,50 50,95" fill="#831843" opacity="0.9" />
            <defs>
              <linearGradient id={`custom-prime-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={value === 17 ? "#F472B6" : "#22D3EE"} />
                <stop offset="50%" stopColor={value === 17 ? "#EC4899" : "#06B6D4"} />
                <stop offset="100%" stopColor={value === 17 ? "#BE185D" : "#0891B2"} />
              </linearGradient>
            </defs>
          </svg>
        );

      default:
        if (getGemMetadata(value).type.includes("Gema Arcana")) {
          // General large Prime - Majestic Rainbow Opal Hexagram
          return (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            >
              <polygon points="50,5 93,30 93,80 50,95 7,80 7,30" fill="url(#opal-grad)" />
              <polygon points="50,5 50,95 93,80" fill="#FFF" opacity="0.25" />
              <polygon points="50,5 50,50 7,30" fill="#FFF" opacity="0.4" />
              <polygon points="7,30 50,50 7,80" fill="#CBD5E1" opacity="0.5" />
              <polygon points="7,80 50,50 50,95" fill="#94A3B8" opacity="0.6" />
              <polygon points="50,95 50,50 93,80" fill="#64748B" opacity="0.7" />
              <polygon points="93,80 50,50 93,30" fill="#475569" opacity="0.5" />
              {/* Inner ring */}
              <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.4" />
              <defs>
                <linearGradient id="opal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="35%" stopColor="#FED7AA" />
                  <stop offset="70%" stopColor="#A7F3D0" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>
            </svg>
          );
        } else {
          // Composite Stone / Rocky block as pictured on Page 7,8
          return (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
            >
              {/* Rocky polyhedron representing a composite block */}
              <polygon points="50,8 88,25 92,68 50,92 8,68 12,25" fill="url(#stone-grad)" stroke="#451A03" strokeWidth="1.5" />
              {/* Cragged facets */}
              <polygon points="50,8 88,25 50,48" fill="#A8A29E" opacity="0.3" />
              <polygon points="88,25 92,68 50,48" fill="#78716C" opacity="0.5" />
              <polygon points="92,68 50,92 50,48" fill="#44403C" opacity="0.8" />
              <polygon points="50,92 8,68 50,48" fill="#292524" opacity="0.9" />
              <polygon points="8,68 12,25 50,48" fill="#57534E" opacity="0.6" />
              <polygon points="12,25 50,8 50,48" fill="#78716C" opacity="0.4" />
              {/* Golden/rainbow cracks revealing inner jewels (the composite aspect) */}
              <path d="M 50,48 L 50,8 M 50,48 L 88,25 M 50,48 L 92,68 M 50,48 L 50,92 M 50,48 L 8,68 M 50,48 L 12,25" stroke="#F59E0B" strokeWidth="1" opacity="0.55" strokeDasharray="3 2" />
              <defs>
                <linearGradient id="stone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#78716C" />
                  <stop offset="50%" stopColor="#44403C" />
                  <stop offset="100%" stopColor="#1C1917" />
                </linearGradient>
              </defs>
            </svg>
          );
        }
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        animate ? "animate-float" : ""
      } ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${(value * 0.15) % 2}s`, // randomize animation timing slightly
      }}
    >
      {/* Gem Vector Drawing */}
      <div className="w-full h-full relative z-10">{renderGemSVG()}</div>

      {/* Embedded Number overlay */}
      {showNumber && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span
            className="text-white font-hand font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center transition-all"
            style={{
              fontSize: `${Math.max(14, size * 0.28)}px`,
              textShadow: "0 0 6px rgba(0,0,0,1), 0 0 2px rgba(0,0,0,1)"
            }}
          >
            {value}
          </span>
        </div>
      )}
    </div>
  );
};
