import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StorySlide } from "./components/StorySlide";
import { InteractiveWorkshop } from "./components/InteractiveWorkshop";
import { ChalkBorder } from "./components/ChalkBorder";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Compass, 
  HelpCircle, 
  Hammer, 
  SlidersHorizontal,
  Bookmark
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Simple safe standard Web Audio API procedure to synthesize beautiful starry bell notes
  const playCelestialTone = (frequencies: number[]) => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioCtx) {
        setAudioCtx(ctx);
      }
      
      const now = ctx.currentTime;
      frequencies.forEach((freq, idx) => {
        // Create oscillator and filter
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = "sine";
        // Slightly detune to sound vintage/chime-like
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        
        // Soft envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02 + idx * 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.1);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + 1.5 + idx * 0.1);
      });
    } catch (e) {
      console.warn("Audio Context blocked or failed to initialize", e);
    }
  };

  // Play sparkle sound when changing pages/chapters
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Trigonometric or harmonic chords corresponding to page numbers (e.g. 2, 3, 5, 7, 11 frequency ratios)
    const baseFreq = 220; 
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    const primeFactorRatio = primes[(page - 1) % primes.length];
    
    // Play compound chime
    playCelestialTone([baseFreq, baseFreq * (1 + page/10), baseFreq * (1.5 + primeFactorRatio/15)]);
  };

  const handleNextPage = () => {
    if (currentPage < 12) {
      handlePageChange(currentPage + 1);
    } else {
      handlePageChange(1); // loop to beginning
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    } else {
      handlePageChange(12); // loop to end
    }
  };

  // Navigates directly to the workshop, scrolling smoothly down
  const jumpToWorkshop = () => {
    playCelestialTone([293.66, 349.23, 440.00, 523.25]); // Beautiful Dm7 chord
    const workshopEl = document.getElementById("interactive-taller");
    if (workshopEl) {
      workshopEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pre-load audio toggler helper
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      // Trigger instant celestial greeting chord (Ruby, Sapphire harmony)
      setTimeout(() => {
        try {
          const tempCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          setAudioCtx(tempCtx);
          const now = tempCtx.currentTime;
          // Ruby chord
          const osc1 = tempCtx.createOscillator();
          const gain1 = tempCtx.createGain();
          osc1.frequency.setValueAtTime(329.63, now); // E4
          gain1.gain.setValueAtTime(0.08, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 1);
          osc1.connect(gain1);
          gain1.connect(tempCtx.destination);
          osc1.start(now);
          osc1.stop(now + 1);
        } catch(err){}
      }, 50);
    }
  };

  // Key chapters titles index
  const chapters = [
    { page: 1, title: "Inicio" },
    { page: 2, title: "La Materia" },
    { page: 3, title: "El Gran Filtro" },
    { page: 4, title: "Gemas Primas" },
    { page: 5, title: "Compuestos" },
    { page: 6, title: "Dos Linajes" },
    { page: 7, title: "Raíces" },
    { page: 8, title: "Fisión Nuclear" },
    { page: 9, title: "El ADN Único" },
    { page: 10, title: "La Receta" },
    { page: 11, title: "La Escalera" },
    { page: 12, title: "El Comienzo" }
  ];

  return (
    <div id="master-root" className="min-h-screen bg-slate-chalkboard pb-24 text-slate-100 overflow-x-hidden font-sans relative">
      
      {/* Sparkly global background stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-amber-200/40 rounded-full animate-twinkle" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-44 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-twinkle" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[35%] left-[8%] w-2 h-2 bg-blue-300/20 rounded-full animate-twinkle" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[60%] right-[10%] w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-twinkle" style={{ animationDelay: "2.8s" }} />
        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-green-200/30 rounded-full animate-twinkle" style={{ animationDelay: "0.1s" }} />
        <div className="absolute bottom-[10%] right-[25%] w-2 h-2 bg-pink-300/30 rounded-full animate-twinkle" style={{ animationDelay: "1.9s" }} />
        
        {/* Soft floating dust ring representation (galaxy aura) */}
        <div className="absolute top-[10%] left-[85%] w-[380px] h-[380px] rounded-full bg-blue-400/5 blur-[120px]" />
        <div className="absolute bottom-[35%] right-[80%] w-[420px] h-[420px] rounded-full bg-indigo-500/5 blur-[130px]" />
      </div>

      {/* GLOBAL HERO STYLED HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-900/40">
        
        {/* Main Logo */}
        <div className="flex items-center gap-3">
          {/* Logo crystal badge design */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 p-[1px] flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#0d1622] rounded-xl flex items-center justify-center font-serif text-lg font-bold text-amber-300">
              7
            </div>
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-amber-100 tracking-wider">
              El Taller del Arquitecto Cósmico
            </h1>
            <span className="text-[10px] text-stone-500 font-mono tracking-widest block uppercase">
              La Hermosa Ley de los Números Primos
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3.5">
          {/* Audio Chime toggler */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all text-xs font-mono uppercase ${
              soundEnabled
                ? "bg-amber-950/40 border-amber-500/40 text-amber-300 shadow-md"
                : "bg-slate-950/60 border-stone-850 text-stone-500 hover:text-stone-300"
            }`}
            title={soundEnabled ? "Sinfonía celeste activada. Haz clic para silenciar." : "Sinfonía celeste desactivada. Haz clic para activar acordes armónicos."}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "Sonido ON" : "Sonido OFF"}</span>
          </button>

          {/* Jump to workshop */}
          <button
            onClick={jumpToWorkshop}
            className="px-4 py-2 bg-[#1c2c3e] border border-emerald-500/25 hover:border-emerald-500/50 text-emerald-300 hover:text-emerald-200 rounded-xl text-xs font-mono uppercase transition-all flex items-center gap-2 shadow"
          >
            <Hammer className="w-3.5 h-3.5" /> Ir al Taller
          </button>
        </div>

      </header>

      {/* PRIMARY CONTAINER */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        
        {/* STORY CAROUSEL WRAPPER WITH CHAPTER SELECTORS */}
        <section className="space-y-6">
          
          {/* Chapter map timeline bar */}
          <div className="bg-[#0b1018]/80 p-3 rounded-2xl border border-stone-900/60 shadow-inner overflow-x-auto scrollbar-none flex gap-2">
            <div className="flex justify-between w-full min-w-[760px] px-2 items-center">
              <span className="text-[10px] font-mono text-stone-500 mr-2 uppercase tracking-tight shrink-0">Capítulos:</span>
              
              <div className="flex-1 flex justify-around items-center relative">
                {/* Horizontal progress guide line */}
                <div className="absolute inset-x-0 h-[1.5px] bg-stone-800 z-0" />
                <div 
                  className="absolute left-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500 z-0 transition-all duration-300"
                  style={{ width: `${((currentPage - 1) / 11) * 100}%` }}
                />

                {/* Chapter checkpoints bubble list */}
                {chapters.map((ch) => {
                  const isActive = currentPage === ch.page;
                  const isPassed = currentPage > ch.page;
                  
                  return (
                    <button
                      key={ch.page}
                      onClick={() => handlePageChange(ch.page)}
                      className="relative z-10 flex flex-col items-center group pt-1"
                    >
                      {/* Checkpoint Circle */}
                      <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center font-mono text-xs border transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-amber-400 to-orange-600 border-amber-300 text-slate-950 font-bold scale-110 shadow-lg"
                          : isPassed
                            ? "bg-stone-900 border-amber-600/50 text-amber-500/80"
                            : "bg-slate-950 border-stone-850 text-stone-500 hover:text-stone-300 hover:border-stone-700"
                      }`}>
                        {ch.page}
                      </div>

                      {/* Floating Indicator banner */}
                      <span className={`absolute top-full mt-2 text-[10px] font-hand whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950 text-stone-300 px-2 py-0.5 rounded shadow z-40 relative pointer-events-none ${
                        isActive ? "opacity-100 text-amber-400 font-bold" : ""
                      }`}>
                        {ch.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ACTIVE CAROUSEL BOARD SLIDER WITH TRANSITIONS */}
          <div className="relative">
            {/* Carousel navigation controls (Left / Right floating pegs) */}
            <div className="absolute inset-y-0 -left-4 md:-left-6 w-12 flex items-center justify-start z-10 pointer-events-none">
              <button
                onClick={handlePrevPage}
                className="p-3 rounded-full bg-slate-950/85 border border-stone-800 text-stone-400 hover:text-white pointer-events-auto shadow-lg hover:shadow-xl hover:border-stone-700 transition-all active:scale-90"
                title="Página Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute inset-y-0 -right-4 md:-right-6 w-12 flex items-center justify-end z-10 pointer-events-none">
              <button
                onClick={handleNextPage}
                className="p-3 rounded-full bg-slate-950/85 border border-stone-800 text-stone-400 hover:text-white pointer-events-auto shadow-lg hover:shadow-xl hover:border-stone-700 transition-all active:scale-90"
                title="Página Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel screen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <StorySlide pageNumber={currentPage} onNavigateToWorkshop={jumpToWorkshop} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sizing helper footnotes */}
          <div className="flex justify-between items-center px-2 text-stone-500 font-hand text-sm">
            <span>✎ Consejo: Usa las flechas flotantes de los lados para voltear la página.</span>
            <span>✧ El secreto de la materia es indivisible.</span>
          </div>

        </section>

        {/* TRANSITION SPLIT BANNER */}
        <div className="py-6">
          <ChalkBorder variant="vines" color="text-amber-500/15" />
        </div>

        {/* THE CORE INTERACTIVE MATHEMATICS WORKSHOP (SANDBOX & SIENS GAMES) */}
        <section className="relative">
          {/* Dynamic tag frame decoration */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-600/20 via-[#0d1622] to-amber-600/20 border-2 border-amber-500/15 text-center text-xs font-mono text-amber-400 z-10 tracking-widest shadow">
            LABORATORIO COGNITIVO
          </div>

          <InteractiveWorkshop />
        </section>

        {/* PEDAGOGICAL SUMMARY APPENDIX */}
        <section className="p-8 bg-[#0a111a]/85 rounded-3xl border border-stone-900/60 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-serif text-[120px] leading-none text-stone-800/10 pointer-events-none select-none">
            ?
          </div>
          
          <h3 className="text-xl md:text-2xl font-serif text-amber-200 font-bold flex items-center gap-2">
            <span className="text-amber-500">❃</span> Apoyo de Aprendizaje Matemático
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-300 leading-relaxed font-hand text-lg">
            <div className="space-y-3">
              <p>
                Este recorrido dinámico del <strong>"Taller del Arquitecto Cósmico"</strong> expone un teorema sagrado conocido como el <strong>Teorema Fundamental de la Aritmética</strong>.
              </p>
              <p>
                Imagina que cada número entero mayor de 1 es como una sustancia química de la materia. O bien es un elemento químico puro (<strong>un número primo</strong>) que no se puede descomponer en otras porciones, o es una aleación formada por multiplicar un conjunto exclusivo de elementos puros (<strong> números compuestos</strong>).
              </p>
            </div>
            
            <div className="space-y-3">
              <p>
                En el taller puedes comprobar que la receta molecular es única. Es imposible soldar el número 12 con gemas diferentes de <code>2 × 2 × 3</code>. No existe fórmula con cincos o sietes que sume o configure su composición secreta.
              </p>
              <p>
                Este "ADN numérico" es la clave inviolable que rige la criptografía moderna en Internet. Toda la seguridad de tus contraseñas y transacciones se basa en esta hermosa asimetría: es muy fácil juntar gemas cósmicas para fabricar un candado gigante, pero extremadamente difícil desarmarlo sin poseer la clave de sus factores raíces.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 mt-12 border-t border-stone-900/40 text-center text-xs text-stone-500 font-mono space-y-3">
        <ChalkBorder variant="footer" color="stroke-emerald-500/10" className="opacity-40" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-stone-600">
          <span>© 100% Creado bajo la Ley de Primos del Arquitecto Cósmico</span>
          <span>Basado fielmente en el manual de ilustraciones matemáticas</span>
        </div>
      </footer>

    </div>
  );
}
