import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Cpu, Flower2, Hand, Activity, Infinity as InfinityIcon, CircleDashed } from 'lucide-react';
import { MatematikaLogo } from '../components/MatematikaLogo';

// Reusable Section Component
const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center relative py-20 px-6 ${className}`}>
    {children}
  </section>
);

export default function CodigoMaquina() {
  // We can use scroll progress for some parallax effects if desired
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0b101e] text-slate-100 overflow-x-hidden font-sans relative">
      
      {/* Background Grid & Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-amber-900/10"
        style={{ y: backgroundY }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-[#0b101e]/50 border-b border-white/5">
        <MatematikaLogo moduleName="Código Máquina" />
        <div className="flex items-center gap-2 text-amber-400/80">
          <Cpu className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest">Sys.Boot</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* SLIDE 1: El Código Máquina */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="relative mb-12 py-12 px-8 border border-white/10 rounded-3xl bg-white/[0.02] overflow-hidden flex items-center justify-center min-h-[300px] shadow-2xl">
              {/* Golden Spiral Abstract */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[800px] h-[800px] border border-amber-500/50 rounded-full border-t-transparent border-r-transparent rotate-45" />
                <div className="absolute w-[500px] h-[500px] border border-amber-500/60 rounded-full border-b-transparent border-l-transparent -rotate-12" />
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-center font-light tracking-wider text-amber-50">
                <span className="font-sans not-italic text-indigo-300">□</span>ψ + <span className="text-slate-400">(</span><span className="text-white">mc/ℏ</span><span className="text-slate-400">)</span>² ψ + λ<span className="text-amber-400">|ψ|²</span>ψ = <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">J<sub className="text-2xl">s</sub></span>
              </h2>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              El Código Máquina <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">del Reino Vivo</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-light">
              La geometría oculta de <strong className="text-amber-400 font-serif">Φ</strong>, el número 7 y la constante de estructura fina.
            </p>
          </motion.div>
        </Section>

        {/* SLIDE 2: La Omnipresencia de Phi */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">La Omnipresencia Empírica de <span className="font-serif text-amber-400">Φ</span></h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              El Número Áureo (≈ 1.618) aparece sistemáticamente en todas las escalas. ¿Es simplemente optimización ciega, o es el hardware consciente del universo?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center" whileHover={{ y: -5 }}>
              <Flower2 className="w-12 h-12 text-teal-400 mb-6" />
              <div className="font-mono text-teal-300 mb-2">137.5°</div>
              <h3 className="text-xl font-bold mb-2">Girasol</h3>
              <p className="text-sm text-slate-400">Filotaxis y distribución angular óptima.</p>
            </motion.div>
            
            <motion.div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center" whileHover={{ y: -5 }}>
              <CircleDashed className="w-12 h-12 text-amber-400 mb-6" />
              <div className="font-serif italic text-amber-300 mb-2">r = ae<sup className="text-xs">bθ</sup></div>
              <h3 className="text-xl font-bold mb-2">Nautilus</h3>
              <p className="text-sm text-slate-400">Espiral logarítmica y crecimiento autosimilar.</p>
            </motion.div>
            
            <motion.div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center" whileHover={{ y: -5 }}>
              <Hand className="w-12 h-12 text-pink-400 mb-6" />
              <div className="font-mono text-pink-300 mb-2">1 : 1.618</div>
              <h3 className="text-xl font-bold mb-2">Proporción Humana</h3>
              <p className="text-sm text-slate-400">Falanges y geometría anatómica.</p>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 3: Dos Lentes para un Mismo Universo */}
        <Section>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Dos Lentes para un Mismo Universo</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-6 border-b border-white/10 text-left w-1/4"></th>
                    <th className="p-6 border-b border-white/10 text-left w-3/8 text-slate-400 font-semibold text-xl">Ciencia Estándar</th>
                    <th className="p-6 border-b border-white/10 text-left w-3/8 text-amber-400 font-bold text-xl">Trilogía del Reino</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 border-b border-white/5 text-slate-500 text-sm uppercase tracking-widest font-semibold align-top">Mecanismo</td>
                    <td className="p-6 border-b border-white/5 text-slate-300 align-top">Eficiencia de empaquetamiento biológico y crecimiento fractal.</td>
                    <td className="p-6 border-b border-white/5 text-indigo-300 align-top">Optimización de la <strong className="text-teal-300 font-normal">curvatura semántica</strong> en el fibrado <span className="font-serif italic">H → X</span>.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 border-b border-white/5 text-slate-500 text-sm uppercase tracking-widest font-semibold align-top">Causa Fundamental</td>
                    <td className="p-6 border-b border-white/5 text-slate-300 align-top">Dinámica de fluidos y minimización de energía física pasiva.</td>
                    <td className="p-6 border-b border-white/5 text-indigo-300 align-top">El <strong className="text-teal-300 font-normal">Éter</strong> en estado de reposo coherente (Corriente de Intención <span className="font-serif italic">J<sub className="text-xs">s</sub> = 0</span>).</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-slate-500 text-sm uppercase tracking-widest font-semibold align-top">Naturaleza de Φ</td>
                    <td className="p-6 text-slate-300 align-top">Una convergencia matemática de fracciones continuas sin significado inherente.</td>
                    <td className="p-6 text-amber-200 align-top font-medium">La Constante de Acoplamiento Semántico del <strong className="text-teal-300 font-normal">Operador Consciente</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </Section>

        {/* SLIDE 4: El Hardware Cuántico */}
        <Section className="items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">El Hardware Cuántico del Reino</h2>
              <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.03] mb-6 shadow-inner">
                <span className="text-xs uppercase text-slate-500 font-bold mb-2 block">Ecuación Maestra No Lineal:</span>
                <div className="font-serif text-2xl text-slate-200">
                  □ψ + (mc/ℏ)² ψ + λ|ψ|²ψ = J<sub className="text-sm">s</sub>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg">
                El universo es modulado por operadores fonéticos. La realidad material emerge de la relación de incertidumbre entre la expansión espacial (<span className="font-serif italic">Â</span>) y la rotación/vorticidad (<span className="font-serif italic">Û</span>), gobernada por la Constante de Planck Semántica (<span className="font-serif text-amber-400">K</span>).
              </p>
            </motion.div>
            
            {/* Abstract Diagram */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square flex items-center justify-center"
            >
              {/* Vorticidad Circle */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-3/4 h-3/4 rounded-full border border-teal-500/40 border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-2/3 h-2/3 rounded-full border-2 border-teal-400/20"
              />
              
              <div className="absolute top-10 right-10 text-amber-400 flex items-center gap-2">
                Expansión (Â) <Activity className="w-4 h-4" />
              </div>
              <div className="absolute bottom-10 left-10 text-teal-400 flex items-center gap-2">
                <InfinityIcon className="w-4 h-4" /> Vorticidad (Û)
              </div>
              
              {/* Psi Center */}
              <div className="z-10 w-24 h-24 rounded-full bg-indigo-900/50 backdrop-blur-md border border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)]">
                <span className="font-serif text-5xl text-white italic">ψ</span>
              </div>
              
              {/* Formula Tooltip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-lg font-serif">
                [Â, Î] = iK
              </div>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 5: Armonico Base del Vacio */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="font-serif text-amber-400">Φ</span> como el Armónico Base del Vacío
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Cuando la Corriente de Intención es cero (<span className="font-serif italic text-white">J<sub className="text-sm">s</sub> = 0</span>), el tejido del universo no se vuelve caótico.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Graph Illustration (CSS based) */}
            <div className="relative aspect-square border-l border-b border-white/20 p-8">
              <div className="absolute bottom-4 -right-8 text-sm text-slate-500">Geometría de Reposo</div>
              <div className="absolute -left-12 top-4 -rotate-90 text-sm text-slate-500">Intention Current J_s</div>
              
              {/* Fake 3D Spiral */}
              <div className="w-full h-full relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-60 overflow-visible">
                  <path d="M50,50 m 0, -40 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80" fill="none" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.5" />
                  <path d="M50,50 m 0, -30 a 30,30 0 1,1 0,60 a 30,30 0 1,1 0,-60" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="0.5" />
                  <path d="M50,50 m 0, -20 a 20,20 0 1,1 0,40 a 20,20 0 1,1 0,-40" fill="none" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="0.5" />
                  <path d="M50,50 m 0, -10 a 10,10 0 1,1 0,20 a 10,10 0 1,1 0,-20" fill="none" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="1" fill="#fbbf24" />
                  {/* Lines pointing outwards */}
                  <line x1="50" y1="50" x2="80" y2="10" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="1 1"/>
                  <text x="82" y="8" fill="#fbbf24" fontSize="4" fontFamily="serif">Φ³</text>
                  
                  <line x1="50" y1="50" x2="90" y2="40" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="1 1"/>
                  <text x="92" y="42" fill="#fbbf24" fontSize="4" fontFamily="serif">Φ²</text>
                  
                  <line x1="50" y1="50" x2="70" y2="80" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="1 1"/>
                  <text x="72" y="82" fill="#fbbf24" fontSize="4" fontFamily="serif">1</text>
                </svg>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 shrink-0 rounded bg-white/10 flex items-center justify-center font-mono text-sm text-slate-300 border border-white/20">1</div>
                <p className="text-slate-300 text-lg leading-relaxed pt-1">
                  La ecuación maestra exige una simetría fundamental que minimice la pérdida pasiva de energía.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 shrink-0 rounded bg-white/10 flex items-center justify-center font-mono text-sm text-slate-300 border border-white/20">2</div>
                <p className="text-slate-300 text-lg leading-relaxed pt-1">
                  Para que la expansión y la rotación generen una espiral autosimilar, la curvatura semántica debe ser absolutamente constante.
                </p>
              </div>
              <div className="flex gap-4 items-start mt-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="w-8 h-8 shrink-0 rounded bg-amber-500/20 flex items-center justify-center font-mono text-sm text-amber-400 border border-amber-500/30">3</div>
                <div>
                  <strong className="text-amber-400 block mb-2 text-lg">Resultado:</strong>
                  <p className="text-amber-100/80 text-lg leading-relaxed">
                    <span className="font-serif">Φ</span> emerge espontáneamente como el autovalor fundamental de la creación en estado de vacío.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
      </main>
    </div>
  );
}
