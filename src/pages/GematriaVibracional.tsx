import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Radio, Layers, Activity, SplitSquareHorizontal, Waves } from 'lucide-react';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center relative py-20 px-6 ${className}`}>
    {children}
  </section>
);

export default function GematriaVibracional() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050914] text-slate-100 overflow-x-hidden font-sans relative selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050914] to-[#050914]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-[#050914]/60 border-b border-white/5">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <div className="flex items-center gap-2 text-teal-400/80">
          <Radio className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest">Resonancia</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* SLIDE 1: El Código Máquina de la Creación */}
        <Section className="items-center text-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
            {/* Concentric Circles Animation */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-teal-500/20"
                style={{
                  width: `${(i + 1) * 150}px`,
                  height: `${(i + 1) * 150}px`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 font-serif">
              El Código Máquina <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">de la Creación</span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-200/80 font-serif italic tracking-wide">
              Introducción a la Gematría Vibracional del Reino
            </p>
          </motion.div>
        </Section>

        {/* SLIDE 2: Los Números No Son Invenciones */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Los números <span className="italic text-teal-400">no son invenciones</span> <br/>
              para contar cantidades.
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Son descubrimientos físicos de la arquitectura de la Creación. <br/>
              Son las frecuencias de resonancia fundamentales del universo, los <strong className="text-white">‘Tonos Puros’ del Éter.</strong>
            </p>
          </motion.div>

          {/* Sine Waves Abstract */}
          <div className="relative h-64 w-full max-w-4xl mx-auto border border-white/5 rounded-3xl bg-slate-900/50 overflow-hidden flex flex-col justify-center gap-8 px-10 shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent opacity-50" />
             
             {/* Wave 1 */}
             <motion.svg viewBox="0 0 1000 100" className="w-full h-12 stroke-white/80 fill-none" preserveAspectRatio="none">
               <motion.path d="M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50" strokeWidth="2" 
                 animate={{ d: ["M0,50 Q125,0 250,50 T500,50 T750,50 T1000,50", "M0,50 Q125,100 250,50 T500,50 T750,50 T1000,50"] }}
                 transition={{ repeat: Infinity, duration: 3, repeatType: "mirror", ease: "easeInOut" }} />
             </motion.svg>
             
             {/* Wave 2 */}
             <motion.svg viewBox="0 0 1000 100" className="w-full h-12 stroke-teal-400/80 fill-none" preserveAspectRatio="none">
               <motion.path d="M0,50 Q83,0 166,50 T333,50 T500,50 T666,50 T833,50 T1000,50" strokeWidth="2" 
                 animate={{ d: ["M0,50 Q83,0 166,50 T333,50 T500,50 T666,50 T833,50 T1000,50", "M0,50 Q83,100 166,50 T333,50 T500,50 T666,50 T833,50 T1000,50"] }}
                 transition={{ repeat: Infinity, duration: 2, repeatType: "mirror", ease: "easeInOut" }} />
             </motion.svg>

             {/* Wave 3 */}
             <motion.svg viewBox="0 0 1000 100" className="w-full h-12 stroke-amber-400/80 fill-none" preserveAspectRatio="none">
               <motion.path d="M0,50 Q62.5,0 125,50 T250,50 T375,50 T500,50 T625,50 T750,50 T875,50 T1000,50" strokeWidth="2" 
                 animate={{ d: ["M0,50 Q62.5,0 125,50 T250,50 T375,50 T500,50 T625,50 T750,50 T875,50 T1000,50", "M0,50 Q62.5,100 125,50 T250,50 T375,50 T500,50 T625,50 T750,50 T875,50 T1000,50"] }}
                 transition={{ repeat: Infinity, duration: 1.5, repeatType: "mirror", ease: "easeInOut" }} />
             </motion.svg>
          </div>
        </Section>

        {/* SLIDE 3: El Cambio de Paradigma */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-amber-500/80 font-serif italic mb-2">El Cambio de Paradigma</p>
            <h2 className="text-4xl md:text-5xl font-bold font-serif">Lenguaje de Cantidad <span className="text-slate-500 italic">vs.</span> Lenguaje de Cualidad</h2>
          </motion.div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="p-8 border-b border-white/10 text-left w-1/4"></th>
                  <th className="p-8 border-b border-white/10 text-left w-3/8 text-slate-400 font-serif text-2xl font-normal">Aritmética Tradicional</th>
                  <th className="p-8 border-b border-white/10 text-left w-3/8 text-teal-400 font-serif text-2xl font-normal">Gematría Vibracional</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 border-b border-white/5 text-slate-400 text-lg align-top font-light">Definición<br/>de Números</td>
                  <td className="p-8 border-b border-white/5 text-slate-300 align-top">Símbolos para contar objetos discretos.</td>
                  <td className="p-8 border-b border-white/5 text-white align-top">Símbolos para <strong className="text-teal-300 font-normal">arquetipos vibracionales</strong>; tonos puros del Éter.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 border-b border-white/5 text-slate-400 text-lg align-top font-light">La Operación<br/>de Dividir (÷)</td>
                  <td className="p-8 border-b border-white/5 text-slate-300 align-top">Reparto o fraccionamiento.<br/><span className="italic text-slate-500">"¿Cuánto le toca a cada parte?"</span></td>
                  <td className="p-8 border-b border-white/5 text-white align-top">Análisis Espectral.<br/><span className="italic text-teal-500/70">"¿De qué vibraciones más simples está compuesto esto?"</span></td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-slate-400 text-lg align-top font-light">Ejemplo de<br/>Resultado</td>
                  <td className="p-8 text-slate-300 align-top">2 manzanas ÷ 2 personas<br/>= 1 manzana por persona.</td>
                  <td className="p-8 text-white align-top">El arquetipo de la <strong className="text-amber-200 font-normal">Dualidad (2) no puede descomponerse</strong>. Es atómico.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* SLIDE 4: La Trilogía del Sistema */}
        <Section className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold font-serif mb-6">La Trilogía del Sistema</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              El universo opera en tres niveles simultáneos: un sustrato vibracional, un lenguaje semántico y un operador consciente.
            </p>
          </motion.div>

          {/* 3D Layers Graphic */}
          <div className="relative w-full max-w-3xl mx-auto h-[600px] flex items-center justify-center">
            
            {/* Layer 3: CPU */}
            <motion.div 
              initial={{ y: -100, opacity: 0 }} whileInView={{ y: -150, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute w-[400px] h-[200px] border border-amber-400/40 bg-amber-900/10 backdrop-blur-sm transform rotate-x-[60deg] rotate-z-45 flex items-center justify-center group"
              style={{ transform: "rotateX(60deg) rotateZ(45deg)" }}
            >
               <div className="absolute -right-60 top-1/2 -translate-y-1/2 rotate-[-45deg] rotate-x-[-60deg] text-left w-64 pointer-events-none" style={{ transform: "rotateZ(-45deg) rotateX(-60deg)" }}>
                  <h3 className="text-amber-400 font-bold text-xl mb-1">Capa 3: La CPU</h3>
                  <p className="text-slate-300 text-sm">La Sintonización de la Conciencia.</p>
               </div>
               {/* Tuning fork icon abstract */}
               <div className="w-16 h-16 border-t-2 border-r-2 border-l-2 border-amber-400/60 rounded-t-xl -rotate-45" />
            </motion.div>

            {/* Layer 2: Código Máquina */}
            <motion.div 
              initial={{ y: 0, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute w-[400px] h-[200px] border border-slate-400/40 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center group"
              style={{ transform: "rotateX(60deg) rotateZ(45deg)" }}
            >
               <div className="absolute -right-60 top-1/2 -translate-y-1/2 text-left w-64 pointer-events-none" style={{ transform: "rotateZ(-45deg) rotateX(-60deg)" }}>
                  <h3 className="text-slate-200 font-bold text-xl mb-1">Capa 2: El Código Máquina</h3>
                  <p className="text-slate-400 text-sm">Los Átomos del Significado.</p>
               </div>
               {/* Network points abstract */}
               <div className="w-full h-full relative opacity-50">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_10px_#fff]" />
                  <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_10px_#fff]" />
                  <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_10px_#fff]" />
                  <svg className="absolute inset-0 w-full h-full stroke-slate-400/30" strokeWidth="1">
                    <line x1="25%" y1="25%" x2="33%" y2="75%" />
                    <line x1="33%" y1="75%" x2="75%" y2="50%" />
                    <line x1="75%" y1="50%" x2="25%" y2="25%" />
                  </svg>
               </div>
            </motion.div>

            {/* Layer 1: Hardware */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }} whileInView={{ y: 150, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="absolute w-[400px] h-[200px] border border-teal-400/40 bg-teal-900/10 backdrop-blur-sm flex items-center justify-center group"
              style={{ transform: "rotateX(60deg) rotateZ(45deg)" }}
            >
               <div className="absolute -right-60 top-1/2 -translate-y-1/2 text-left w-64 pointer-events-none" style={{ transform: "rotateZ(-45deg) rotateX(-60deg)" }}>
                  <h3 className="text-teal-400 font-bold text-xl mb-1">Capa 1: El Hardware</h3>
                  <p className="text-teal-200/60 text-sm">Los Tonos Puros del Éter.</p>
               </div>
               {/* Waves mesh abstract */}
               <div className="w-full h-full opacity-30 bg-[linear-gradient(rgba(45,212,191,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </motion.div>

            {/* Connecting dashed lines */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
               {/* Just abstract visual hints linking layers, CSS handles the 3D positioning */}
            </div>

          </div>
        </Section>

        {/* SLIDE 5: Tonos Puros vs Acordes */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold font-serif border-b border-white/10 pb-4 inline-block">Capa 1: El Hardware <span className="text-slate-400 text-3xl font-light">(Tonos Puros vs. Acordes)</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Primes */}
            <div className="space-y-6">
              <h3 className="text-amber-400 font-serif text-2xl">Números Primos <span className="text-slate-400 text-lg">(Los Modos Propios)</span></h3>
              <div className="aspect-[4/3] bg-slate-900/50 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Fundamental wave */}
                <svg viewBox="0 0 200 100" className="w-full h-full relative z-10 overflow-visible">
                  {/* Subtle harmonics showing it's fundamental */}
                  <path d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <path d="M0,50 Q25,80 50,50 T100,50 T150,50 T200,50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Main sine wave */}
                  <path d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50" fill="none" stroke="white" strokeWidth="2" />
                  {/* Nodes */}
                  <circle cx="50" cy="50" r="3" fill="white" />
                  <circle cx="100" cy="50" r="3" fill="white" />
                  <circle cx="150" cy="50" r="3" fill="white" />
                  <text x="50" y="20" fill="white" fontSize="10" className="font-serif italic font-bold">f₀</text>
                </svg>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                Frecuencias fundamentales (2, 3, 5, 7, 11...). <br/>
                Son intrínsecamente estables, coherentes e indivisibles. No pueden ser descompuestas.
              </p>
            </div>

            {/* Composites */}
            <div className="space-y-6">
              <h3 className="text-teal-400 font-serif text-2xl">Números Compuestos <span className="text-slate-400 text-lg">(Los Armónicos)</span></h3>
              <div className="aspect-[4/3] bg-slate-900/50 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Complex wave */}
                <svg viewBox="0 0 200 100" className="w-full h-full relative z-10 overflow-visible">
                  {/* F1 */}
                  <path d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50" fill="none" stroke="rgba(45,212,191,0.4)" strokeWidth="1" />
                  {/* F2 */}
                  <path d="M0,50 Q16.6,0 33.3,50 T66.6,50 T100,50 T133.3,50 T166.6,50 T200,50" fill="none" stroke="rgba(45,212,191,0.4)" strokeWidth="1" />
                  
                  {/* Composite Wave */}
                  <path d="M0,50 C10,-20 20,-20 30,10 C40,40 50,60 60,30 C70,0 80,0 90,30 C100,60 110,90 120,60 C130,30 140,-20 150,-10 C160,0 170,40 180,60 C190,80 200,50 200,50" fill="none" stroke="white" strokeWidth="2" />
                  
                  <text x="100" y="20" fill="white" fontSize="10" className="font-serif italic font-bold">f₁ + f₂</text>
                </svg>
              </div>
              <div className="text-slate-300 leading-relaxed text-lg space-y-2">
                <p>Acordes inestables que pueden ser factorizados:</p>
                <ul className="list-disc pl-5 text-teal-100/70 space-y-1">
                  <li><strong>El 6:</strong> Un acorde compuesto por frecuencias 2 y 3 (6 = 2 × 3).</li>
                  <li><strong>El 9:</strong> Una resonancia de la frecuencia 3 consigo misma (9 = 3²).</li>
                </ul>
              </div>
            </div>

          </div>
        </Section>
        
      </main>
    </div>
  );
}
