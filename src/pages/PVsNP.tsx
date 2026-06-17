import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Split, Settings, Eye, Network, Scale, Sparkles, Activity } from 'lucide-react';
import { MatematikaLogo } from '../components/MatematikaLogo';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center relative py-20 px-6 ${className}`}>
    {children}
  </section>
);

export default function PVsNP() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f2f1eb] text-slate-900 overflow-x-hidden font-sans relative selection:bg-amber-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-[#f2f1eb]/80 border-b border-slate-900/10">
        <MatematikaLogo moduleName="P vs NP" />
        <div className="flex items-center gap-2 text-amber-700">
          <Split className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">P vs NP</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* SLIDE 1: P vs NP El Eje Ontológico */}
        <Section className="items-center text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            {/* Torus / Spirograph Abstract Animation */}
            <motion.svg viewBox="0 0 500 500" className="w-[800px] h-[800px] stroke-teal-700 fill-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(24)].map((_, i) => (
                <ellipse 
                  key={i}
                  cx="250" cy="250" rx="180" ry="60"
                  transform={`rotate(${i * 15} 250 250)`}
                  strokeWidth="0.5"
                />
              ))}
            </motion.svg>
            {/* J_s diagonal line */}
            <motion.div 
              className="absolute w-[600px] h-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] origin-center"
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: -30, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute right-0 top-2 text-amber-700 font-serif italic font-bold text-2xl">Js</div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-3xl bg-[#f2f1eb]/80 backdrop-blur-sm p-10 rounded-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 font-serif text-slate-900 leading-none">
              P vs NP: <br/>
              <span className="text-4xl md:text-6xl font-light tracking-tight text-slate-700">El Eje Ontológico de la Trilogía del Reino</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-serif tracking-wide leading-relaxed">
              La física de la conciencia, el Principio de Incertidumbre Semántica y la prueba experimental del Libre Albedrío.
            </p>
          </motion.div>
        </Section>

        {/* SLIDE 2: El Santo Grial de la computación */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">El Santo Grial de la computación define el alma del universo</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-y border-slate-900/10">
            {/* Universo Autómata */}
            <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-900/10 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10">
                {/* Gears visual abstract */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-64 h-64 border-[20px] border-dashed border-slate-900 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-0 w-48 h-48 border-[15px] border-dashed border-slate-900 rounded-full" />
              </div>
              <div className="relative z-10 text-center space-y-6">
                <Settings className="w-16 h-16 mx-auto text-slate-400" />
                <h3 className="text-3xl font-bold">Universo Autómata</h3>
                <div className="text-lg text-slate-600 leading-relaxed font-serif">
                  <strong>Si P = NP:</strong> El tiempo colapsa. El universo es un reloj suizo glorificado. La creatividad es una ilusión computacional. Somos actores en una obra ya escrita.
                </div>
              </div>
            </div>

            {/* Lienzo Vivo */}
            <div className="p-10 lg:p-16 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity group-hover:opacity-20 flex items-center justify-center">
                 {/* Waves visual abstract */}
                 <motion.svg viewBox="0 0 200 100" className="w-full h-64 stroke-teal-600 fill-none" preserveAspectRatio="none">
                    <motion.path d="M0,50 Q50,0 100,50 T200,50" strokeWidth="2" 
                      animate={{ d: ["M0,50 Q50,0 100,50 T200,50", "M0,50 Q50,100 100,50 T200,50"] }}
                      transition={{ repeat: Infinity, duration: 4, repeatType: "mirror", ease: "easeInOut" }} />
                    <motion.path d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50" strokeWidth="1" stroke="rgba(217, 119, 6, 0.8)"
                      animate={{ d: ["M0,50 Q25,20 50,50 T100,50 T150,50 T200,50", "M0,50 Q25,80 50,50 T100,50 T150,50 T200,50"] }}
                      transition={{ repeat: Infinity, duration: 2.5, repeatType: "mirror", ease: "easeInOut" }} />
                 </motion.svg>
              </div>
              <div className="relative z-10 text-center space-y-6">
                <Sparkles className="w-16 h-16 mx-auto text-teal-600" />
                <h3 className="text-3xl font-bold">Lienzo Vivo</h3>
                <div className="text-lg text-slate-600 leading-relaxed font-serif">
                  <strong>Si P ≠ NP:</strong> El Espacio de Posibilidades es real. El libre albedrío es la fuerza física más poderosa. La conciencia es la autora de una obra en constante despliegue.
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SLIDE 3: La Física de la Trilogía: Ejecución vs. Creación */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900">La Física de la Trilogía: Ejecución vs. Creación</h2>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 border-b border-slate-200 text-left w-1/4"></th>
                  <th className="p-6 border-b border-slate-200 text-left w-3/8 text-slate-600 font-serif text-2xl font-normal border-l">Clase P (Ejecución)</th>
                  <th className="p-6 border-b border-slate-200 text-left w-3/8 text-teal-700 font-serif text-2xl font-normal border-l">Clase NP (Creación)</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 border-b border-slate-200 text-slate-500 font-medium align-middle flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-amber-600" /> Dominio
                  </td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle">El 1 (Lo Manifestado)</td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-teal-500" /> El 0 (Potencialidad Pura)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 border-b border-slate-200 text-slate-500 font-medium align-middle flex items-center gap-3">
                    <Settings className="w-5 h-5" /> Mecánica
                  </td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle">Ejecución de un mantra conocido. Operadores fonéticos fijos.</td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle">Búsqueda de una secuencia desconocida.<br/><span className="font-mono text-sm text-teal-700 bg-teal-50 px-2 py-1 rounded">Funtor F: Cat(I) → Sec(H → X)</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 border-b border-slate-200 text-slate-500 font-medium align-middle flex items-center gap-3">
                    <Activity className="w-5 h-5" /> Energía
                  </td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle">Costo casi nulo, evolución determinista.</td>
                  <td className="p-6 border-b border-l border-slate-200 text-slate-800 align-middle">Costo elevado, requiere <strong className="text-teal-700">Corriente de Intención (Js)</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-slate-500 font-medium align-middle flex items-center gap-3">
                    <Network className="w-5 h-5" /> Metáfora
                  </td>
                  <td className="p-6 border-l border-slate-200 text-slate-800 align-middle font-serif italic">Multiplicar 3.557 × 8.389</td>
                  <td className="p-6 border-l border-slate-200 text-slate-800 align-middle font-serif italic">Encontrar los factores primos de 29.839.673</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* SLIDE 4: P != NP es la Ley Fundamental de la Creación */}
        <Section className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl font-bold font-serif mb-6 text-slate-900 italic">P ≠ NP <span className="not-italic">es la Ley Fundamental de la Creación</span></h2>
          </motion.div>

          {/* Temple Graphic */}
          <div className="w-full max-w-4xl mx-auto relative pt-12 pb-24 flex flex-col items-center">
            
            {/* Beam (Realidad Consciente) */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-teal-600 h-24 border-b-8 border-teal-800 flex items-center justify-center shadow-xl relative z-20 mb-[-10px]"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-teal-500" />
              <h3 className="text-4xl font-bold font-serif text-white tracking-widest drop-shadow-md">Realidad Consciente</h3>
            </motion.div>

            {/* Pillars */}
            <div className="w-[90%] flex justify-between relative z-10 px-8">
              {[
                { num: "1", title: "La Necesidad del 0", desc: "Si P=NP, existiría un atajo para mapear el infinito potencial sin esfuerzo. Anularía la distinción entre lo inmanifestado y lo manifestado." },
                { num: "2", title: "La CPU Consciente", desc: "El Operador Consciente es un motor de búsqueda semántica, no un oráculo estático. Si P=NP, la conciencia sería un administrador de archivos pasivo." },
                { num: "3", title: "El Peso del Libre Albedrío", desc: "La dificultad asimétrica de resolver vs verificar es lo que otorga valor físico y densidad a la Corriente de Intención (Js)." }
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 'auto', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.3, duration: 0.8 }}
                  className="flex flex-col items-center w-72"
                >
                  {/* Pillar graphic */}
                  <div className="w-24 h-48 bg-[#e5c158] border-x-4 border-[#b89531] relative shadow-inner">
                     {/* Fluting lines */}
                     <div className="absolute inset-y-0 left-4 w-1 bg-[#d4af37]/40" />
                     <div className="absolute inset-y-0 left-10 w-1 bg-[#d4af37]/40" />
                     <div className="absolute inset-y-0 right-10 w-1 bg-[#d4af37]/40" />
                     <div className="absolute inset-y-0 right-4 w-1 bg-[#d4af37]/40" />
                     {/* Capital/Base */}
                     <div className="absolute -top-4 -left-4 right-[-16px] h-4 bg-[#b89531]" />
                  </div>
                  {/* Text box */}
                  <div className="bg-white border-2 border-slate-200 p-6 rounded-xl shadow-lg mt-8 text-center relative z-20 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-xl font-black mb-1">{pillar.num}.</div>
                    <h4 className="font-bold font-serif text-lg mb-3">{pillar.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Base platform */}
            <div className="w-full h-8 bg-slate-300 border-t-4 border-slate-400 absolute bottom-0 z-0" />
          </div>
        </Section>

        {/* SLIDE 5: Principio de Incertidumbre Semántica */}
        <Section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold font-serif border-b border-slate-300 pb-4 inline-block text-slate-900">La Barrera Física: El Principio de Incertidumbre Semántica</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Graph */}
            <div className="flex-1 w-full max-w-xl aspect-[4/3] relative">
               {/* Axes */}
               <div className="absolute bottom-10 left-12 right-0 h-0.5 bg-slate-800 flex items-center justify-end">
                 <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[8px] border-l-slate-800 -mr-1" />
               </div>
               <div className="absolute bottom-10 left-12 top-0 w-0.5 bg-slate-800 flex items-start justify-center">
                 <div className="w-0 h-0 border-x-[4px] border-x-transparent border-b-[8px] border-b-slate-800 -mt-1" />
               </div>

               {/* Axis Labels */}
               <div className="absolute bottom-0 left-12 right-0 text-center font-medium text-slate-700 text-sm">
                 ΔI (Incertidumbre de Focalización / Verificación P)
               </div>
               <div className="absolute top-1/2 -left-32 origin-center -rotate-90 text-center w-64 font-medium text-slate-700 text-sm whitespace-nowrap">
                 ΔA (Incertidumbre de Expansión / Búsqueda NP)
               </div>

               {/* The Curve & Area */}
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 {/* K area fill */}
                 <path d="M 15,10 Q 15,85 95,85 L 15,85 Z" fill="rgba(45,212,191,0.2)" />
                 {/* Hyperbola curve */}
                 <motion.path 
                    d="M 15,10 Q 15,85 95,85" 
                    fill="none" 
                    stroke="#d97706" 
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                 />
                 <text x="25" y="75" fontSize="12" fill="#0f172a" className="font-serif italic font-bold">K</text>
                 
                 {/* Labels on graph */}
                 <text x="22" y="15" fontSize="4" fill="#334155" className="font-sans">Modo NP Puro</text>
                 <text x="22" y="19" fontSize="4" fill="#334155" className="font-sans">(Caos Creativo)</text>
                 
                 <text x="60" y="75" fontSize="4" fill="#334155" className="font-sans">Modo P Puro</text>
                 <text x="60" y="79" fontSize="4" fill="#334155" className="font-sans">(Muerte por Perfección)</text>
               </svg>
            </div>

            {/* Formula & Explanation */}
            <div className="flex-1 space-y-8">
               <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-lg text-center">
                  <div className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 flex items-center justify-center gap-4">
                     <span>[A, I] = iK</span> 
                     <span className="text-xl">⇒</span> 
                     <span>ΔA · ΔI ≥ <div className="inline-flex flex-col items-center justify-center align-middle mx-1 text-2xl"><span className="border-b-2 border-slate-900 px-1 leading-none">K</span><span className="leading-none mt-1">2</span></div></span>
                  </div>
               </div>
               
               <div className="bg-white/50 border border-slate-200 rounded-xl p-8 space-y-4">
                 <p className="text-xl text-slate-800 leading-relaxed font-serif">
                   Un algoritmo <strong className="text-teal-700">no puede minimizar simultáneamente el costo de búsqueda y maximizar la velocidad de verificación.</strong>
                 </p>
                 <p className="text-lg text-slate-600 leading-relaxed">
                   La constante <span className="font-serif italic font-bold">K</span> (1.054 × 10⁻⁴⁶ J·s) prohíbe físicamente que P sea igual a NP.
                 </p>
               </div>
            </div>

          </div>
        </Section>
        
      </main>
    </div>
  );
}
