import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StorySlide } from "../components/StorySlide";
import { InteractiveWorkshop } from "../components/InteractiveWorkshop";
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Hammer
} from "lucide-react";
import { Link } from "react-router-dom";

import { MatematikaLogo } from "../components/MatematikaLogo";

const PrimeBackground = () => {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, duration: number, prime: number, delay: number}[]>([]);

  useEffect(() => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 50 + 30,
      delay: Math.random() * -30,
      prime: primes[Math.floor(Math.random() * primes.length)]
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#07070a]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-white/10 font-mono font-bold select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -200, 0],
            rotate: [0, 360],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        >
          {p.prime}
        </motion.div>
      ))}
    </div>
  );
};

export default function NumerosPrimos() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const playCelestialTone = (frequencies: number[]) => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioCtx) setAudioCtx(ctx);
      const now = ctx.currentTime;
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02 + idx * 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.1);
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + 1.5 + idx * 0.1);
      });
    } catch (e) {
      console.warn("Audio blocked", e);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const baseFreq = 220;
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    const primeFactorRatio = primes[(page - 1) % primes.length];
    playCelestialTone([baseFreq, baseFreq * (1 + page / 10), baseFreq * (1.5 + primeFactorRatio / 15)]);
  };

  const handleNextPage = () => {
    if (currentPage < 12) handlePageChange(currentPage + 1);
    else handlePageChange(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
    else handlePageChange(12);
  };

  const jumpToWorkshop = () => {
    playCelestialTone([293.66, 349.23, 440.00, 523.25]);
    const workshopEl = document.getElementById("interactive-taller");
    if (workshopEl) workshopEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => {
        try {
          const tempCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          setAudioCtx(tempCtx);
          const now = tempCtx.currentTime;
          const osc1 = tempCtx.createOscillator();
          const gain1 = tempCtx.createGain();
          osc1.frequency.setValueAtTime(329.63, now);
          gain1.gain.setValueAtTime(0.07, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 1);
          osc1.connect(gain1);
          gain1.connect(tempCtx.destination);
          osc1.start(now);
          osc1.stop(now + 1);
        } catch (err) {}
      }, 50);
    }
  };

  const chapters = [
    { page: 1, title: "Inicio" },
    { page: 2, title: "La Materia" },
    { page: 3, title: "El Gran Filtro" },
    { page: 4, title: "Gemas Primas" },
    { page: 5, title: "Compuestos" },
    { page: 6, title: "Dos Linajes" },
    { page: 7, title: "Raíces" },
    { page: 8, title: "Fisión" },
    { page: 9, title: "ADN Único" },
    { page: 10, title: "La Receta" },
    { page: 11, title: "La Escalera" },
    { page: 12, title: "El Comienzo" }
  ];

  return (
    <div id="master-root" className="min-h-screen pb-24 text-slate-800 overflow-x-hidden font-sans relative">
      <PrimeBackground />

      {/* HEADER */}
      <header className="w-full bg-[#07070a]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <MatematikaLogo moduleName="Números Primos" />

          {/* Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSound}
              className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${
                soundEnabled
                  ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? "Sonido ON" : "Sonido OFF"}</span>
            </button>

            <button
              onClick={jumpToWorkshop}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Hammer className="w-3.5 h-3.5" /> Ir al Taller
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">

        {/* STORY SECTION */}
        <section className="space-y-5">
          
          {/* Chapter timeline */}
          <div className="bg-[#111] rounded-2xl border border-white/10 card-shadow p-3 overflow-x-auto relative z-10">
            <div className="flex justify-between w-full min-w-[720px] px-2 items-center">
              <span className="text-[11px] font-mono text-slate-400 mr-3 uppercase tracking-wide shrink-0">Capítulos:</span>
              
              <div className="flex-1 flex justify-around items-center relative">
                {/* Track line */}
                <div className="absolute inset-x-0 h-[1.5px] bg-slate-100 z-0" />
                <div 
                  className="absolute left-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-400 z-0 transition-all duration-300"
                  style={{ width: `${((currentPage - 1) / 11) * 100}%` }}
                />

                {chapters.map((ch) => {
                  const isActive = currentPage === ch.page;
                  const isPassed = currentPage > ch.page;
                  return (
                    <button
                      key={ch.page}
                      onClick={() => handlePageChange(ch.page)}
                      className="relative z-10 flex flex-col items-center group pt-1"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                        isActive
                          ? "bg-amber-400 border-amber-400 text-slate-900 scale-110 shadow-md"
                          : isPassed
                            ? "bg-amber-900/50 border-amber-700 text-amber-500"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                      }`}>
                        {ch.page}
                      </div>
                      <span className={`absolute top-full mt-1.5 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-2 py-0.5 rounded-md shadow z-40 pointer-events-none ${
                        isActive ? "opacity-100 !bg-amber-500" : ""
                      }`}>
                        {ch.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="absolute inset-y-0 -left-5 md:-left-7 w-12 flex items-center justify-start z-10 pointer-events-none">
              <button
                onClick={handlePrevPage}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 pointer-events-auto shadow-sm hover:shadow-md hover:border-slate-300 transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute inset-y-0 -right-5 md:-right-7 w-12 flex items-center justify-end z-10 pointer-events-none">
              <button
                onClick={handleNextPage}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 pointer-events-auto shadow-sm hover:shadow-md hover:border-slate-300 transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <StorySlide pageNumber={currentPage} onNavigateToWorkshop={jumpToWorkshop} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center px-1 text-slate-400 text-sm">
            <span>✎ Usa las flechas laterales para pasar de página.</span>
            <span>El secreto de la materia es indivisible. ✧</span>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <span className="text-slate-300 text-xl">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* WORKSHOP */}
        <section className="relative">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-widest card-shadow z-10">
            Laboratorio Cognitivo
          </div>
          <InteractiveWorkshop />
        </section>

        {/* APPENDIX */}
        <section className="p-8 bg-white rounded-3xl border border-slate-100 card-shadow-md space-y-5">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-amber-500">❃</span> Apoyo de Aprendizaje Matemático
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 text-base leading-relaxed">
            <div className="space-y-3">
              <p>
                Este recorrido dinámico del <strong className="text-slate-800">"Taller del Mundo Cósmico"</strong> expone el <strong className="text-slate-800">Teorema Fundamental de la Aritmética</strong>.
              </p>
              <p>
                Cada número entero mayor de 1 es como una sustancia química. O bien es un elemento químico puro (<strong className="text-slate-800">un número primo</strong>) o es una aleación formada por multiplicar un conjunto exclusivo de elementos puros (<strong className="text-slate-800">números compuestos</strong>).
              </p>
            </div>
            <div className="space-y-3">
              <p>
                En el taller podés comprobar que la receta molecular es única. Es imposible construir el número 12 con gemas diferentes de <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-700">2 × 2 × 3</code>.
              </p>
              <p>
                Este "ADN numérico" es la clave que rige la criptografía moderna en Internet. Toda la seguridad de tus contraseñas se basa en esta hermosa asimetría.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-6xl mx-auto px-4 md:px-8 pt-8 mt-8 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© Creado bajo la Ley de Primos del Mundo Cósmico</span>
          <span>Basado fielmente en el manual de ilustraciones matemáticas</span>
        </div>
      </footer>

    </div>
  );
}
