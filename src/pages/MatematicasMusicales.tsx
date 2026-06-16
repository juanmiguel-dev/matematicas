import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Music, Activity } from 'lucide-react';

const Section = ({ id, children, className = "" }: { id?: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center relative py-20 px-6 ${className}`}>
    {children}
  </section>
);

export default function MatematicasMusicales() {
  const [activeSection, setActiveSection] = useState('hero');
  const [monochordRatio, setMonochordRatio] = useState<number>(1);
  const [activeHarmonics, setActiveHarmonics] = useState<boolean[]>([true, false, false, false]);
  const [interferenceRatio, setInterferenceRatio] = useState<number>(1.5);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = ['hero', 'monocordio', 'serie-armonica', 'coma', 'fibonacci', 'interferencia', 'cimatica'];
      let current = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const monochordRatios = [
    { label: "1:1", name: "Tónica", value: 1, color: "text-white" },
    { label: "3:4", name: "Cuarta Justa", value: 0.75, color: "text-fuchsia-400" },
    { label: "2:3", name: "Quinta Justa", value: 0.666, color: "text-purple-400" },
    { label: "1:2", name: "Octava", value: 0.5, color: "text-indigo-400" },
  ];

  const currentRatio = monochordRatios.reduce((prev, curr) => 
    Math.abs(curr.value - monochordRatio) < Math.abs(prev.value - monochordRatio) ? curr : prev
  );

  return (
    <div className="bg-[#0b0c10] text-slate-100 overflow-x-hidden font-sans relative selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-[#0b0c10] to-[#0b0c10]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-[#0b0c10]/70 border-b border-fuchsia-500/10 shadow-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-fuchsia-400 transition-colors font-medium whitespace-nowrap">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">Inicio</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {[
            { id: 'hero', label: 'Inicio' },
            { id: 'monocordio', label: 'Pitágoras' },
            { id: 'serie-armonica', label: 'Armónicos' },
            { id: 'coma', label: 'Coma' },
            { id: 'fibonacci', label: 'Áurea' },
            { id: 'interferencia', label: 'Interferencia' },
            { id: 'cimatica', label: 'Cimática' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollTo(item.id)} 
              className={`text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeSection === item.id 
                  ? 'text-fuchsia-400 scale-110 drop-shadow-md' 
                  : 'text-slate-500 hover:text-fuchsia-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-fuchsia-600">
          <Music className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold hidden sm:inline">Armónicos</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* SLIDE 1: Hero */}
        <Section id="hero" className="items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-sm font-medium text-fuchsia-300 mb-8">
              <Activity className="w-4 h-4" />
              <span>La Arquitectura Oculta</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 font-serif leading-[1.1]">
              Matemáticas <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400">Musicales</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Descubre cómo las frecuencias, las proporciones y la geometría dictan lo que percibimos como armonía.
            </p>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none -z-10">
            <motion.svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-fuchsia-500" strokeWidth="0.5">
              {[...Array(20)].map((_, i) => (
                <motion.circle 
                  key={i} 
                  cx="50" cy="50" r={10 + i * 4} 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.svg>
          </div>
        </Section>

        {/* SLIDE 2: El Monocordio de Pitágoras */}
        <Section id="monocordio">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif">El Monocordio <br/><span className="text-slate-400 italic font-light">de Pitágoras</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Hace más de 2500 años, Pitágoras descubrió que los intervalos musicales agradables al oído (consonantes) correspondían a fracciones matemáticas simples de la longitud de una cuerda vibrante.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Al dividir la cuerda en proporciones enteras exactas (1:2, 2:3, 3:4), nacen los pilares fundamentales de la armonía.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full bg-[#11131a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
              
              <div className="mb-12 relative">
                <div className="h-6 w-full bg-slate-900 rounded-full relative shadow-inner overflow-hidden border border-white/10">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${monochordRatio * 100}%` }}
                  />
                  {/* Frets */}
                  {monochordRatios.map(r => (
                    <div 
                      key={r.label}
                      className="absolute top-0 bottom-0 w-0.5 bg-white/20 z-10"
                      style={{ left: `${r.value * 100}%` }}
                    />
                  ))}
                </div>
                <input 
                  type="range" 
                  min="0.5" max="1" step="0.001" 
                  value={monochordRatio} 
                  onChange={(e) => setMonochordRatio(parseFloat(e.target.value))}
                  className="absolute top-0 left-0 w-full h-6 opacity-0 cursor-pointer z-20"
                />
                
                <div className="flex justify-between mt-4 text-xs font-mono text-slate-500">
                  <span>Octava (1:2)</span>
                  <span>Tónica (1:1)</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentRatio.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    <div className={`text-5xl font-bold font-serif ${currentRatio.color}`}>
                      {currentRatio.label}
                    </div>
                    <div className="text-xl text-slate-300 tracking-widest uppercase">
                      {currentRatio.name}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="h-32 mt-8 relative overflow-hidden border border-white/5 rounded-2xl bg-slate-950/50 flex items-center justify-center">
                  {/* Visual Wave generated based on ratio */}
                  <svg viewBox="0 0 400 100" className="w-full h-full stroke-fuchsia-400/80 fill-none opacity-80" preserveAspectRatio="none">
                    <motion.path 
                      d={`M0,50 Q${50 * monochordRatio},0 ${100 * monochordRatio},50 T${200 * monochordRatio},50 T${300 * monochordRatio},50 T${400 * monochordRatio},50 T${500 * monochordRatio},50 T${600 * monochordRatio},50 T${700 * monochordRatio},50 T${800 * monochordRatio},50 T${900 * monochordRatio},50`}
                      strokeWidth="2" 
                      animate={{ 
                        d: [
                          `M0,50 Q${50 * monochordRatio},0 ${100 * monochordRatio},50 T${200 * monochordRatio},50 T${300 * monochordRatio},50 T${400 * monochordRatio},50 T${500 * monochordRatio},50 T${600 * monochordRatio},50 T${700 * monochordRatio},50 T${800 * monochordRatio},50 T${900 * monochordRatio},50`,
                          `M0,50 Q${50 * monochordRatio},100 ${100 * monochordRatio},50 T${200 * monochordRatio},50 T${300 * monochordRatio},50 T${400 * monochordRatio},50 T${500 * monochordRatio},50 T${600 * monochordRatio},50 T${700 * monochordRatio},50 T${800 * monochordRatio},50 T${900 * monochordRatio},50`
                        ] 
                      }}
                      transition={{ repeat: Infinity, duration: monochordRatio, repeatType: "mirror", ease: "easeInOut" }} 
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 2B: La Serie Armonica */}
        <Section id="serie-armonica">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif">La Serie Armónica <br/><span className="text-slate-400 italic font-light">Los Sobretonos</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Cuando tocas una sola nota, el universo no genera una sola frecuencia. Se desata una serie matemática infinita: la fundamental ($f$), el doble ($2f$), el triple ($3f$).
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Esta síntesis aditiva es lo que le da "color" o timbre a los instrumentos. Enciende los armónicos para ver cómo se construye una onda compleja.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full bg-[#11131a] rounded-3xl p-8 border border-white/5 relative shadow-2xl"
            >
              <div className="space-y-4 mb-8">
                {['Fundamental (f)', '2º Armónico (2f)', '3º Armónico (3f)', '4º Armónico (4f)'].map((label, idx) => (
                  <button 
                    key={label}
                    onClick={() => {
                      const newHarmonics = [...activeHarmonics];
                      newHarmonics[idx] = !newHarmonics[idx];
                      if (newHarmonics.every(h => !h)) newHarmonics[0] = true; // prevent all off
                      setActiveHarmonics(newHarmonics);
                    }}
                    className={`w-full text-left px-6 py-3 rounded-xl border transition-all ${
                      activeHarmonics[idx] ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="h-48 relative overflow-hidden border border-white/5 rounded-2xl bg-slate-950/50 flex items-center justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full stroke-fuchsia-400 fill-none" preserveAspectRatio="none">
                  {activeHarmonics.map((active, idx) => active && (
                    <motion.path 
                      key={idx}
                      d={`M0,50 Q${50/(idx+1)},0 ${100/(idx+1)},50 T${200/(idx+1)},50 T${300/(idx+1)},50 T${400/(idx+1)},50 T${500/(idx+1)},50 T${600/(idx+1)},50 T${700/(idx+1)},50 T${800/(idx+1)},50 T${900/(idx+1)},50 T${1000/(idx+1)},50 T${1100/(idx+1)},50 T${1200/(idx+1)},50 T${1300/(idx+1)},50 T${1400/(idx+1)},50 T${1500/(idx+1)},50 T${1600/(idx+1)},50`}
                      strokeWidth="1" 
                      className="opacity-30 mix-blend-screen"
                      animate={{ 
                        d: [
                          `M0,50 Q${50/(idx+1)},0 ${100/(idx+1)},50 T${200/(idx+1)},50 T${300/(idx+1)},50 T${400/(idx+1)},50 T${500/(idx+1)},50 T${600/(idx+1)},50 T${700/(idx+1)},50 T${800/(idx+1)},50 T${900/(idx+1)},50 T${1000/(idx+1)},50 T${1100/(idx+1)},50 T${1200/(idx+1)},50 T${1300/(idx+1)},50 T${1400/(idx+1)},50 T${1500/(idx+1)},50 T${1600/(idx+1)},50`,
                          `M0,50 Q${50/(idx+1)},100 ${100/(idx+1)},50 T${200/(idx+1)},50 T${300/(idx+1)},50 T${400/(idx+1)},50 T${500/(idx+1)},50 T${600/(idx+1)},50 T${700/(idx+1)},50 T${800/(idx+1)},50 T${900/(idx+1)},50 T${1000/(idx+1)},50 T${1100/(idx+1)},50 T${1200/(idx+1)},50 T${1300/(idx+1)},50 T${1400/(idx+1)},50 T${1500/(idx+1)},50 T${1600/(idx+1)},50`
                        ] 
                      }}
                      transition={{ repeat: Infinity, duration: 1/(idx+1), repeatType: "mirror", ease: "easeInOut" }} 
                    />
                  ))}
                  
                  {activeHarmonics.filter(Boolean).length > 1 && (
                     <motion.path 
                       d="M0,50 C20,10 40,90 60,30 C80,-10 100,110 120,40 C140,0 160,100 180,60 C200,10 220,90 240,30 C260,-10 280,110 300,40 C320,0 340,100 360,60 C380,10 400,90 400,50"
                       strokeWidth="2" 
                       className="stroke-white"
                       animate={{ 
                         d: [
                           "M0,50 C20,10 40,90 60,30 C80,-10 100,110 120,40 C140,0 160,100 180,60 C200,10 220,90 240,30 C260,-10 280,110 300,40 C320,0 340,100 360,60 C380,10 400,90 400,50",
                           "M0,50 C20,90 40,10 60,70 C80,110 100,-10 120,60 C140,100 160,0 180,40 C200,90 220,10 240,70 C260,110 280,-10 300,60 C320,100 340,0 360,40 C380,90 400,10 400,50"
                         ] 
                       }}
                       transition={{ repeat: Infinity, duration: 2, repeatType: "mirror", ease: "easeInOut" }} 
                     />
                  )}
                </svg>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 2C: La Coma Pitagorica */}
        <Section id="coma" className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">La Coma Pitagórica <br/><span className="text-slate-400 italic font-light">El Defecto Perfecto</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Si apilas 12 quintas perfectas, no encajan exactamente con 7 octavas. Hay una minúscula diferencia matemática: <span className="font-mono text-fuchsia-400">(3/2)¹² ≠ 2⁷</span>.
              Este desajuste obligó a la humanidad a "desafinar" deliberadamente el piano moderno usando números irracionales.
            </p>
          </motion.div>

          <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center bg-[#11131a] rounded-full border border-white/5 shadow-[0_0_50px_rgba(192,132,252,0.1)]">
            <motion.svg viewBox="0 0 200 200" className="w-full h-full overflow-visible p-8">
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              
              <motion.path 
                d="M100,20 A80,80 0 0,1 180,100 A80,80 0 0,1 100,180 A80,80 0 0,1 20,100 A80,80 0 0,1 100,22" 
                fill="none" 
                stroke="url(#spiralGrad)" 
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="spiralGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              
              <motion.circle 
                cx="100" cy="21" r="3" fill="#f472b6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4 }}
              />
              <motion.circle 
                cx="100" cy="20" r="2" fill="white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4.2 }}
              />
              <motion.text 
                x="100" y="5" fill="#f472b6" fontSize="8" textAnchor="middle" className="font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4.5 }}
              >
                Coma Pitagórica
              </motion.text>
            </motion.svg>
          </div>
        </Section>

        {/* SLIDE 3: La Proporcion Aurea */}
        <Section id="fibonacci">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif">La Proporción Áurea <br/><span className="text-slate-400 italic font-light">en el Teclado</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                La secuencia de Fibonacci (1, 1, 2, 3, 5, 8, 13...) está codificada en la propia estructura de la escala musical occidental.
              </p>
              <ul className="space-y-4 text-slate-300 mt-6">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold border border-slate-700">13</div>
                  <span>Teclas en total para conformar una Octava completa.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold">8</div>
                  <span>Teclas blancas (la escala diatónica fundamental).</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold border border-slate-700">5</div>
                  <span>Teclas negras (la escala pentatónica).</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full bg-[#11131a] rounded-3xl p-10 border border-white/5 relative shadow-2xl"
            >
              {/* Abstract Piano Keyboard SVG */}
              <svg viewBox="0 0 400 200" className="w-full drop-shadow-xl overflow-visible">
                <defs>
                  <linearGradient id="whiteKey" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                  <linearGradient id="blackKey" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>
                
                {/* 8 White Keys */}
                {[...Array(8)].map((_, i) => (
                  <g key={`w-${i}`}>
                    <rect x={i * 50} y="0" width="48" height="200" fill="url(#whiteKey)" rx="4" />
                    <text x={i * 50 + 24} y="180" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                      {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'][i]}
                    </text>
                  </g>
                ))}
                
                {/* 5 Black Keys */}
                <rect x="35" y="0" width="26" height="120" fill="url(#blackKey)" rx="3" />
                <rect x="85" y="0" width="26" height="120" fill="url(#blackKey)" rx="3" />
                
                <rect x="185" y="0" width="26" height="120" fill="url(#blackKey)" rx="3" />
                <rect x="235" y="0" width="26" height="120" fill="url(#blackKey)" rx="3" />
                <rect x="285" y="0" width="26" height="120" fill="url(#blackKey)" rx="3" />
                
                {/* Annotations */}
                <path d="M0,210 L398,210" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                <text x="200" y="230" textAnchor="middle" fill="#cbd5e1" fontSize="14" className="font-serif italic">1 Octava = 13 Teclas (8 Blancas + 5 Negras)</text>
              </svg>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 3B: Interferencia */}
        <Section id="interferencia">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif">Consonancia y Disonancia <br/><span className="text-slate-400 italic font-light">Matemática de la Interferencia</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                ¿Por qué un intervalo suena "bien" o "mal" al oído? Es pura física geométrica.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Ratios matemáticos simples (como 3:2) hacen que las ondas se alineen periódicamente (consonancia). Ratios complejos causan que las ondas choquen desordenadamente, creando "batidos" o disonancia.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full bg-[#11131a] rounded-3xl p-8 border border-white/5 relative shadow-2xl"
            >
              <div className="mb-8">
                <input 
                  type="range" 
                  min="1" max="2" step="0.01" 
                  value={interferenceRatio} 
                  onChange={(e) => setInterferenceRatio(parseFloat(e.target.value))}
                  className="w-full accent-fuchsia-500 cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs font-mono text-slate-500">
                  <span>1:1</span>
                  <span className="text-fuchsia-400 font-bold text-lg">Ratio Actual: {interferenceRatio.toFixed(2)}</span>
                  <span>1:2</span>
                </div>
              </div>

              <div className="h-48 relative overflow-hidden border border-white/5 rounded-2xl bg-slate-950/50 flex flex-col justify-center gap-2 p-2">
                {/* Wave 1 (Fixed Fundamental) */}
                <svg viewBox="0 0 400 40" className="w-full h-12 stroke-indigo-400/50 fill-none" preserveAspectRatio="none">
                  <motion.path 
                    d="M0,20 Q25,0 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20"
                    strokeWidth="2" 
                    animate={{ d: ["M0,20 Q25,0 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20", "M0,20 Q25,40 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20"] }}
                    transition={{ repeat: Infinity, duration: 1, repeatType: "mirror", ease: "easeInOut" }} 
                  />
                </svg>
                {/* Wave 2 (Variable) */}
                <svg viewBox="0 0 400 40" className="w-full h-12 stroke-fuchsia-400/50 fill-none" preserveAspectRatio="none">
                  <motion.path 
                    d={`M0,20 Q${25/interferenceRatio},0 ${50/interferenceRatio},20 T${100/interferenceRatio},20 T${150/interferenceRatio},20 T${200/interferenceRatio},20 T${250/interferenceRatio},20 T${300/interferenceRatio},20 T${350/interferenceRatio},20 T${400/interferenceRatio},20 T${450/interferenceRatio},20 T${500/interferenceRatio},20 T${550/interferenceRatio},20 T${600/interferenceRatio},20 T${650/interferenceRatio},20 T${700/interferenceRatio},20 T${750/interferenceRatio},20 T${800/interferenceRatio},20`}
                    strokeWidth="2" 
                    animate={{ 
                      d: [
                        `M0,20 Q${25/interferenceRatio},0 ${50/interferenceRatio},20 T${100/interferenceRatio},20 T${150/interferenceRatio},20 T${200/interferenceRatio},20 T${250/interferenceRatio},20 T${300/interferenceRatio},20 T${350/interferenceRatio},20 T${400/interferenceRatio},20 T${450/interferenceRatio},20 T${500/interferenceRatio},20 T${550/interferenceRatio},20 T${600/interferenceRatio},20 T${650/interferenceRatio},20 T${700/interferenceRatio},20 T${750/interferenceRatio},20 T${800/interferenceRatio},20`,
                        `M0,20 Q${25/interferenceRatio},40 ${50/interferenceRatio},20 T${100/interferenceRatio},20 T${150/interferenceRatio},20 T${200/interferenceRatio},20 T${250/interferenceRatio},20 T${300/interferenceRatio},20 T${350/interferenceRatio},20 T${400/interferenceRatio},20 T${450/interferenceRatio},20 T${500/interferenceRatio},20 T${550/interferenceRatio},20 T${600/interferenceRatio},20 T${650/interferenceRatio},20 T${700/interferenceRatio},20 T${750/interferenceRatio},20 T${800/interferenceRatio},20`
                      ] 
                    }}
                    transition={{ repeat: Infinity, duration: 1/interferenceRatio, repeatType: "mirror", ease: "easeInOut" }} 
                  />
                </svg>
                {/* Visual indicator of alignment (Beat) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-50 mix-blend-screen">
                  <div 
                    className="w-full h-full transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(217,70,239,0.2) 0%, rgba(217,70,239,0) 70%)',
                      opacity: Math.abs(interferenceRatio - 1.5) < 0.05 || Math.abs(interferenceRatio - 1.25) < 0.05 ? 0.1 : 0.8
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* SLIDE 4: Cimática */}
        <Section id="cimatica" className="items-center">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">Cimática: <br/><span className="text-slate-400 italic font-light">La Forma del Sonido</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              El sonido no es solo algo que escuchamos; tiene forma geométrica. Las placas de Chladni demuestran cómo diferentes frecuencias organizan la materia en mandalas perfectos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { freq: "432 Hz", desc: "La frecuencia del universo", nodes: 4, color: "text-purple-400" },
              { freq: "528 Hz", desc: "Reparación del ADN", nodes: 6, color: "text-indigo-400" },
              { freq: "639 Hz", desc: "Conexión relacional", nodes: 8, color: "text-fuchsia-400" },
            ].map((pattern, idx) => (
              <motion.div 
                key={pattern.freq}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-[#11131a] rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center shadow-lg group hover:border-white/10 transition-colors"
              >
                <div className="w-48 h-48 relative flex items-center justify-center mb-8">
                  {/* Plate background */}
                  <div className="absolute inset-0 bg-slate-900 rounded-full shadow-inner border border-white/5" />
                  
                  {/* Cymatic Pattern (Abstract SVG) */}
                  <motion.svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    {[...Array(pattern.nodes)].map((_, i) => (
                      <g key={i} transform={`rotate(${(360 / pattern.nodes) * i} 50 50)`}>
                        <ellipse cx="50" cy="25" rx="15" ry="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="10" r="2" fill="currentColor" />
                        <path d="M 50 50 L 50 15" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                      </g>
                    ))}
                    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  </motion.svg>
                  
                  {/* Active scanning effect */}
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(192,132,252,0.3)_360deg)] animate-[spin_4s_linear_infinite] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className={`text-3xl font-bold font-serif mb-2 ${pattern.color}`}>{pattern.freq}</h3>
                <p className="text-slate-400 text-sm tracking-wide uppercase">{pattern.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
        
      </main>
    </div>
  );
}
