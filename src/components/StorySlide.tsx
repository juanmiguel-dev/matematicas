import React from "react";
import { motion } from "motion/react";
import { GemIcon } from "./GemIcon";
import { ChalkBorder } from "./ChalkBorder";
import { getGemMetadata } from "../utils/mathUtils";
import { Sparkles, ArrowRight, HelpCircle, Table, Compass, BookOpen } from "lucide-react";

interface StorySlideProps {
  pageNumber: number;
  onNavigateToWorkshop?: () => void;
}

export const StorySlide: React.FC<StorySlideProps> = ({ pageNumber, onNavigateToWorkshop }) => {
  // We customize the visual layout depending on the page number to remain highly faithful to the PDF screenshots.
  const renderVisuals = () => {
    switch (pageNumber) {
      case 1: // Hero Title slide
        return (
          <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-2xl bg-black/20">
            {/* Ambient background particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_65%)] animate-pulse" />
            
            {/* Glowing vines background graphic */}
            <div className="absolute inset-4 border border-emerald-500/10 rounded-xl" />
            
            {/* Large center title spiral circles */}
            <div className="absolute w-80 h-80 rounded-full border border-dashed border-cyan-500/10 animate-spin" style={{ animationDuration: "120s" }} />
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-amber-500/10 animate-spin" style={{ animationDuration: "85s", animationDirection: "reverse" }} />

            {/* Glowing gems circulating in cosmic wind */}
            <div className="absolute top-[20%] left-[20%] animate-float">
              <GemIcon value={2} size={54} showNumber={true} animate={false} />
            </div>
            <div className="absolute top-[15%] right-[25%] animate-float" style={{ animationDelay: "1s" }}>
              <GemIcon value={3} size={58} showNumber={true} animate={false} />
            </div>
            <div className="absolute bottom-[20%] left-[25%] animate-float" style={{ animationDelay: "1.5s" }}>
              <GemIcon value={5} size={50} showNumber={true} animate={false} />
            </div>
            <div className="absolute bottom-[15%] right-[20%] animate-float" style={{ animationDelay: "2s" }}>
              <GemIcon value={7} size={62} showNumber={true} animate={false} />
            </div>

            {/* Title Block */}
            <div className="text-center z-10 max-w-xl px-4 p-8 bg-slate-900/60 backdrop-blur-sm rounded-3xl border border-stone-850/60 shadow-2xl">
              <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block mb-3">✧ Revelación de los Números Primos ✧</span>
              
              {/* Multicolored title matching chalkboard lettering */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 via-green-400 via-blue-400 to-purple-400 drop-shadow-lg font-hand py-2">
                El Taller del Arquetipo Cósmico
              </h1>
              
              <div className="w-16 h-[2px] bg-amber-500/40 mx-auto my-4" />
              
              <p className="text-stone-300 font-serif text-lg md:text-xl font-light italic text-shadow">
                "El secreto detrás de cada número del universo."
              </p>
            </div>
          </div>
        );

      case 2: // La Materia de las Matemáticas
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-6 bg-slate-950/40 rounded-2xl border border-stone-800 space-y-4">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo I • Las Piedras Basales</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">La Materia de las Matemáticas</h2>
              <p className="text-stone-300 font-hand text-lg leading-relaxed">
                "Imagina que los números no son solo símbolos, sino 'piedras' o 'semillas' reales. Todo en el universo está construido con piezas fundamentales. Para entender cómo se construye cualquier número, primero debemos encontrar sus piezas inquebrantables."
              </p>
            </div>
            
            {/* Interactive gallery of crystals as structured composite atoms */}
            <div className="relative p-6 bg-slate-900/45 rounded-2xl border border-stone-850 h-[280px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_75%)]" />
              
              {/* Cosmic spiral orbit line */}
              <svg className="absolute inset-0 w-full h-full stroke-emerald-500/10 pointer-events-none" viewBox="0 0 400 240">
                <path d="M 50,120 Q 150,10 250,150 T 350,120" fill="none" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Elements */}
              <div className="flex items-center justify-around w-full relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <GemIcon value={3} size={50} showNumber={true} animate={true} />
                  <span className="text-[10px] font-mono text-stone-500">Pura</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <GemIcon value={7} size={55} showNumber={true} animate={true} />
                  <span className="text-[10px] font-mono text-stone-500">Pura</span>
                </div>
                
                {/* Composite crystals (12, 24, 100) */}
                <div className="flex flex-col items-center gap-2">
                  {/* Composite represented with compound styles */}
                  <div className="relative h-14 w-14 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                    <div className="absolute translate-x-[-12px]"><GemIcon value={2} size={30} showNumber={false} animate={false} /></div>
                    <div className="absolute translate-x-[12px]"><GemIcon value={2} size={30} showNumber={false} animate={false} /></div>
                    <div className="absolute translate-y-[-10px]"><GemIcon value={3} size={30} showNumber={false} animate={false} /></div>
                    <span className="text-white text-xs font-bold drop-shadow z-20 font-hand">12</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500/70">Compuesta</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-14 w-14 flex items-center justify-center animate-float" style={{ animationDelay: "1.5s" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-red-500 opacity-20 blur" />
                    <GemIcon value={100} size={55} showNumber={true} animate={false} />
                  </div>
                  <span className="text-[10px] font-mono text-amber-500/70 py-0.5 px-1 bg-stone-900 border border-stone-800 rounded">Gema 100</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Filtrando la Arena del Tiempo
        return (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo II • El Gran Filtro</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">Filtrando la Arena del Tiempo</h2>
              <p className="text-stone-300 font-hand text-lg">
                "Si pasamos todos los números por un tamiz mágico, los números que se pueden dividir se deshacen como polvo. Lo que queda en la malla son las joyas puras del universo."
              </p>
            </div>

            {/* Sieve demonstration box (sieve visual) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Sand Pile Box */}
              <div className="p-5 bg-stone-950/30 rounded-xl border border-stone-850 text-center space-y-4">
                <span className="text-xs font-mono text-stone-500 block uppercase">La Arena de Números</span>
                <div className="grid grid-cols-5 gap-1.5 p-3 bg-stone-900/40 rounded-lg min-h-[140px] items-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(v => (
                    <span key={v} className="text-xs font-mono text-stone-400 bg-stone-800-40 select-none pb-0.5">
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 font-hand">Números sin depurar revueltos en la arena.</p>
              </div>

              {/* Sieve Center representation */}
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-4 relative">
                {/* Sieve ring */}
                <div className="w-32 h-32 rounded-full border-4 border-amber-600/65 bg-slate-900 flex flex-col items-center justify-center relative shadow-lg">
                  {/* Grid mesh effect */}
                  <div className="absolute inset-2 border border-dashed border-amber-500/30 rounded-full opacity-60 flex flex-col justify-around">
                    <div className="border-t border-dashed border-amber-500/30 w-full" />
                    <div className="border-t border-dashed border-amber-500/30 w-full" />
                    <div className="border-t border-dashed border-amber-500/30 w-full" />
                  </div>
                  {/* Falling dust / compounds */}
                  <span className="text-xs font-mono text-stone-500 z-10">TAMIZ</span>
                  <div className="text-[10px] text-stone-400 font-hand z-10 italic">Desintegrando...</div>
                  
                  {/* Falling falling numbers */}
                  <div className="absolute bottom-[-20px] text-stone-500 text-xs font-mono space-x-2 animate-pulse">
                    <span>4</span><span>8</span><span>9</span><span>15</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-500 rotate-90 md:rotate-0" />
              </div>

              {/* Pure Jewels Box */}
              <div className="p-5 bg-emerald-950/10 rounded-xl border border-emerald-500/10 text-center space-y-4">
                <span className="text-xs font-mono text-emerald-400 block uppercase">Joyas que Permanecen</span>
                <div className="flex flex-wrap justify-center gap-2 p-3 bg-slate-900/50 rounded-lg min-h-[140px] items-center">
                  {[2, 3, 5, 7, 11, 13, 17, 19].map(p => (
                    <GemIcon key={p} value={p} size={32} showNumber={true} animate={true} />
                  ))}
                </div>
                <p className="text-[11px] text-emerald-400/80 font-hand">Solo las gemas puras (intocables) resisten el filtro.</p>
              </div>
            </div>
            
            {/* Navigation aid */}
            <div className="text-center">
              <button 
                onClick={onNavigateToWorkshop}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-md font-hand font-bold transition-all shadow-md hover:-translate-y-0.5"
              >
                🎮 ¡Juega con el Tamiz Interactivo en el Laboratorio!
              </button>
            </div>
          </div>
        );

      case 4: // Las Gemas Puras: Los Números Primos
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo III • Los Elementos Indivisibles</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">Las Gemas Puras: Los Números Primos</h2>
              <p className="text-stone-300 font-hand text-lg">
                "Estas piedras preciosas son irrompibles. No pueden ser divididas en piezas más pequeñas. Son los elementos básicos que el Arquitecto usa para construir todo lo demás."
              </p>
            </div>

            {/* Showcase table of first 4 prime gems */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[2, 3, 5, 7].map(g => {
                const meta = getGemMetadata(g);
                return (
                  <div key={g} className="p-5 bg-[#0a111a] rounded-2xl border border-stone-850 flex flex-col items-center text-center space-y-3 shadow-lg hover:border-amber-500/20 transition-all">
                    <span className="text-xs font-mono text-stone-500 uppercase">{meta.type}</span>
                    <GemIcon value={g} size={70} showNumber={true} animate={true} />
                    <h3 className={`font-serif font-bold text-lg ${meta.textColor}`}>{meta.name}</h3>
                    <div className="w-10 h-[1px] bg-stone-800" />
                    <p className="text-xs text-stone-400 font-hand italic leading-relaxed">
                      {g === 2 && "Un rubí rojo esculpido. La gema primordial de la simetría par."}
                      {g === 3 && "Un zafiro de geometría celestial. El constructor trinitario."}
                      {g === 5 && "Una brillante esmeralda de corte octogonal. La base del orden decimal."}
                      {g === 7 && "Una mística amatista bipyramidal. Siete facetas mágicas divinas."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5: // Los Bloques de Construcción: Números Compuestos
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo IV • Aleaciones Químicas</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">Los Bloques de Construcción: Números Compuestos</h2>
              <p className="text-stone-300 font-hand text-lg leading-relaxed">
                "Los demás números no son puros; son estructuras hermosas formadas al fusionar diferentes gemas. El tamaño y la forma de la estructura dependen de las gemas que uses."
              </p>
            </div>

            {/* Mechanical Formulas (Fusions of Gems) */}
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850 space-y-6">
              <h3 className="text-xs font-mono text-stone-500 uppercase text-center block tracking-widest">Ejemplos de Fusión</h3>
              
              {/* Formula 1 */}
              <div className="flex flex-col items-center justify-center p-4 bg-black/25 rounded-xl border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <GemIcon value={2} size={36} showNumber={true} animate={false} />
                    <span className="text-[9px] font-mono text-stone-500 mt-1">Rubí 1</span>
                  </div>
                  <span className="text-xl font-mono text-stone-500">×</span>
                  <div className="flex flex-col items-center">
                    <GemIcon value={3} size={36} showNumber={true} animate={false} />
                    <span className="text-[9px] font-mono text-stone-500 mt-1">Zafiro 2</span>
                  </div>
                  <span className="text-lg font-mono text-stone-505">=</span>
                  
                  {/* Fused 6 */}
                  <div className="p-1 px-3 bg-red-950/20 border border-amber-500/30 rounded-xl flex items-center gap-2">
                    <div className="text-xl font-serif font-bold text-amber-300">6</div>
                    <div className="flex -space-x-2">
                      <GemIcon value={2} size={24} showNumber={false} animate={false} />
                      <GemIcon value={3} size={24} showNumber={false} animate={false} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-400 font-hand">Seis es el compuesto elemental formado por un Rubí uniendo con un Zafiro.</p>
              </div>

              {/* Formula 2 */}
              <div className="flex flex-col items-center justify-center p-4 bg-black/25 rounded-xl border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <GemIcon value={2} size={36} showNumber={true} animate={false} />
                    <span className="text-[9px] font-mono text-stone-500 mt-1">Rubí</span>
                  </div>
                  <span className="text-xl font-mono text-stone-500">×</span>
                  <div className="flex flex-col items-center">
                    <GemIcon value={5} size={36} showNumber={true} animate={false} />
                    <span className="text-[9px] font-mono text-stone-500 mt-1">Esmeralda</span>
                  </div>
                  <span className="text-lg font-mono text-stone-505">=</span>
                  
                  {/* Fused 10 */}
                  <div className="p-1 px-3 bg-green-950/20 border border-amber-500/30 rounded-xl flex items-center gap-2">
                    <div className="text-xl font-serif font-bold text-amber-300">10</div>
                    <div className="flex -space-x-2">
                      <GemIcon value={2} size={24} showNumber={false} animate={false} />
                      <GemIcon value={5} size={24} showNumber={false} animate={false} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-400 font-hand">Diez es un bloque robusto constituido por Rubí y Esmeralda en perfecta cohesión.</p>
              </div>
            </div>
          </div>
        );

      case 6: // Los Dos Linajes de la Aritmética
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo V • Taxonomía Universal</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">Los Dos Linajes de la Aritmética</h2>
              <p className="text-stone-300 font-hand text-lg">
                Cada número del plano numérico pertenece a uno de los dos grandes clanes o linajes de la creación.
              </p>
            </div>

            {/* Table structure (faithfully recreated) */}
            <div className="overflow-x-auto rounded-xl border border-stone-800 shadow-xl">
              <table className="w-full text-left font-sans text-sm border-collapse bg-slate-950/40">
                <thead>
                  <tr className="border-b border-stone-800 bg-[#090f17]">
                    <th className="p-4 font-serif text-stone-400 uppercase tracking-wider text-xs">Propiedad</th>
                    <th className="p-4 font-serif text-purple-300 font-bold text-sm">
                      Los Intocables <span className="block text-xs font-mono font-light text-stone-500">(Números Primos)</span>
                    </th>
                    <th className="p-4 font-serif text-amber-300 font-bold text-sm">
                      Los Constructores <span className="block text-xs font-mono font-light text-stone-500">(Números Compuestos)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850">
                  <tr>
                    <td className="p-4 font-mono text-emerald-500 text-xs font-bold uppercase">Naturaleza</td>
                    <td className="p-4 text-stone-300 font-hand text-md">Solo divisibles de forma exacta por sí mismos y por el 1.</td>
                    <td className="p-4 text-stone-300 font-hand text-md">Divisibles por otros números, permitiendo partición limpia.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-emerald-500 text-xs font-bold uppercase">Metáfora</td>
                    <td className="p-4 text-stone-300 font-hand text-md text-purple-300">Ladrillos base indivisibles y Gemas puras de cristal.</td>
                    <td className="p-4 text-stone-300 font-hand text-md text-amber-300">Castillos, moles de piedra y estructuras formadas por gemas.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-emerald-500 text-xs font-bold uppercase">Ejemplo Visual</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <GemIcon value={7} size={40} showNumber={true} animate={false} />
                        <span className="text-xs text-stone-400 font-hand">Gema 7 (Amatista)</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Composite 12 example */}
                        <div className="p-1 px-3 bg-stone-900 border border-amber-500/20 rounded-xl flex items-center gap-1.5">
                          <span className="text-sm font-bold text-amber-400">12</span>
                          <div className="flex -space-x-1.5">
                            <GemIcon value={2} size={18} showNumber={false} animate={false} />
                            <GemIcon value={2} size={18} showNumber={false} animate={false} />
                            <GemIcon value={3} size={18} showNumber={false} animate={false} />
                          </div>
                        </div>
                        <span className="text-xs text-stone-400 font-hand">Complejo Modular</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 7: // El Sistema de Raíces
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo VI • El Árbol de la Tierra</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">El Sistema de Raíces</h2>
              <p className="text-stone-300 font-hand text-lg leading-relaxed">
                "Para descubrir de qué está hecho un número, debemos seguir sus raíces hacia la tierra. Al final de cada raíz, siempre encontraremos una gema prima esperando."
              </p>
            </div>

            {/* Symmetrical tree illustration representing 30 */}
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850 flex flex-col items-center">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block mb-4">Ejemplo del Árbol de Raíces para el 30</span>
              
              <div className="relative pt-2 pb-6 w-full flex flex-col items-center">
                {/* Stone 30 at the top */}
                <div className="px-6 py-3 rounded-2xl bg-gradient-to-br from-stone-600 to-amber-950 border border-amber-900 flex flex-col items-center justify-center relative shadow-md z-10 animate-pulse">
                  <div className="text-xs font-mono text-amber-500/70">NÚCLEO MAESTRO</div>
                  <span className="text-2xl text-stone-100 font-hand font-extrabold text-shadow">30</span>
                </div>

                {/* SVG connection roots */}
                <svg width="280" height="150" className="overflow-visible mt-1 relative z-0">
                  {/* Left branch to 5 */}
                  <path
                    d="M 140 0 Q 70 40 70 85"
                    fill="none"
                    stroke="#854d0e"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Right branch to 6 */}
                  <path
                    d="M 140 0 Q 210 40 210 85"
                    fill="none"
                    stroke="#854d0e"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Split branches of 6 leading to 2 and 3 */}
                  <path
                    d="M 210 110 Q 170 135 170 170"
                    fill="none"
                    stroke="#854d0e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 210 110 Q 250 135 250 170"
                    fill="none"
                    stroke="#854d0e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Left Row Child (5, Emerald) */}
                <div className="absolute top-[105px] left-[20px] z-15 flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <GemIcon value={5} size={40} showNumber={true} animate={false} />
                  </div>
                  <span className="text-[10px] font-mono text-green-400 font-bold mt-1">Gema Prima</span>
                </div>

                {/* Right Row Child (6, Composite Stone) */}
                <div className="absolute top-[105px] right-[40px] z-15 flex flex-col items-center justify-center">
                  <div className="px-3.5 py-1.5 rounded-lg bg-stone-850 border border-stone-700 flex items-center justify-center">
                    <span className="text-stone-300 font-hand text-sm font-bold">6</span>
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 mt-1">Dividible</span>
                </div>

                {/* Grandchildren under 6 (2, Ruby) and (3, Sapphire) */}
                <div className="absolute top-[185px] right-[88px] z-20 flex flex-col items-center pt-2">
                  <GemIcon value={2} size={30} showNumber={true} animate={false} />
                  <span className="text-[9px] font-mono text-red-400 mt-1">Prima</span>
                </div>
                
                <div className="absolute top-[185px] right-[8px] z-20 flex flex-col items-center pt-2">
                  <GemIcon value={3} size={30} showNumber={true} animate={false} />
                  <span className="text-[9px] font-mono text-blue-400 mt-1">Prima</span>
                </div>
              </div>

            </div>
          </div>
        );

      case 8: // Anatomía de una Estructura
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo VII • Descomposición Atómica</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">Anatomía de una Estructura</h2>
              <p className="text-stone-300 font-hand text-lg">
                "Al 'desarmar' un número compuesto, capa por capa, revelamos su núcleo atómico. Ninguna pieza se pierde, solo se transforma en su forma más pura."
              </p>
            </div>

            {/* Block explosion (illustrated for number 60) */}
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850">
              <h3 className="text-xs font-mono text-stone-500 text-center uppercase block mb-6">Fisión Nuclear del Número 60</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                
                {/* Composite Block 60 */}
                <div className="p-5 bg-stone-900/40 rounded-xl border border-stone-800 text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center text-white text-2xl font-bold font-serif animate-pulse shadow-lg">
                    60
                  </div>
                  <div className="text-xs font-mono text-stone-500">Masa Molecular</div>
                </div>

                {/* Splitting vector arrow decoration */}
                <div className="hidden md:flex flex-col justify-center items-center text-amber-500/50">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase">Separar</span>
                </div>

                {/* Sub-Blocks: 6 & 10 */}
                <div className="flex gap-4">
                  <div className="p-3.5 bg-[#090f17] border border-[#2b1f16] rounded-xl text-center">
                    <span className="w-10 h-10 bg-amber-900/40 border border-amber-800/60 rounded-lg flex items-center justify-center text-stone-200 font-serif font-bold mx-auto mb-1">6</span>
                    <div className="flex gap-1">
                      <GemIcon value={2} size={20} showNumber={false} animate={false} />
                      <GemIcon value={3} size={20} showNumber={false} animate={false} />
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#090f17] border border-[#162b1f] rounded-xl text-center">
                    <span className="w-10 h-10 bg-emerald-950 border border-emerald-800 rounded-lg flex items-center justify-center text-stone-200 font-serif font-bold mx-auto mb-1">10</span>
                    <div className="flex gap-1">
                      <GemIcon value={2} size={20} showNumber={false} animate={false} />
                      <GemIcon value={5} size={20} showNumber={false} animate={false} />
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col justify-center items-center text-amber-500/50">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase">Fusión</span>
                </div>

                {/* Pure Prime components */}
                <div className="p-4 bg-slate-950/40 rounded-xl border border-stone-850 text-center space-y-3">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Núcleo Atómico Neto</span>
                  <div className="flex items-center gap-1.5 p-2 bg-[#090f17] rounded-lg">
                    <GemIcon value={2} size={26} showNumber={true} animate={false} />
                    <span className="text-stone-600 font-mono text-sm">×</span>
                    <GemIcon value={2} size={26} showNumber={true} animate={false} />
                    <span className="text-stone-600 font-mono text-sm">×</span>
                    <GemIcon value={3} size={26} showNumber={true} animate={false} />
                    <span className="text-stone-600 font-mono text-sm">×</span>
                    <GemIcon value={5} size={26} showNumber={true} animate={false} />
                  </div>
                  <p className="text-[10px] text-stone-500 font-hand">Seis gemas elementales fusionadas.</p>
                </div>

              </div>

            </div>
          </div>
        );

      case 9: // El Teorema Fundamental: El ADN Numérico
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo VIII • El Gran Sello</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">El Teorema Fundamental: El ADN Numérico</h2>
              <p className="text-stone-300 font-hand text-lg leading-relaxed">
                "Hay una ley universal en el Taller del Arquitecto. Cada número compuesto tiene una única 'llave' que lo abre: una combinación exacta y secreta de números primos. Ninguna otra combinación funcionará."
              </p>
            </div>

            {/* Vintage Lock & Key drawing/render container */}
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850 flex flex-col items-center text-center space-y-4">
              <h3 className="text-xs font-mono text-stone-500 uppercase">La Llave de Combinación Única</h3>
              
              <div className="flex items-center gap-4 py-8 relative w-full justify-center">
                
                {/* Antique key */}
                <div className="relative p-2.5 bg-[#090f17] border border-amber-500/20 rounded-xl flex items-center shadow-lg">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500" />
                  <div className="h-2 w-14 bg-amber-500 flex items-center justify-around relative px-1">
                    {/* Embedded Gems */}
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
                  </div>
                  <div className="w-3 h-5 bg-amber-500 rounded-r-md flex flex-col justify-between">
                    <div className="w-1.5 h-1 bg-amber-900" />
                    <div className="w-1.5 h-1 bg-amber-900" />
                  </div>
                </div>

                <span className="text-stone-600 font-mono text-lg animate-pulse">➔</span>

                {/* Padlock */}
                <div className="p-3 bg-stone-800 border-2 border-amber-900/60 rounded-xl text-center relative w-24">
                  <div className="w-10 h-8 rounded-t-full border-2 border-stone-400 absolute top-[-10px] left-7 border-b-0" />
                  <span className="text-lg font-serif font-bold text-amber-200">210</span>
                  <div className="w-2.5 h-5 bg-black mx-auto mt-2 rounded-full" />
                </div>

              </div>

              <p className="text-xs text-stone-400 font-hand italic leading-relaxed">
                Ninguna otra combinación de gemas en el universo puede forjar la llave para abrir el cofre del número 210, excepto la perfecta aleación: (2 • 3 • 5 • 7).
              </p>
            </div>
          </div>
        );

      case 10: // La Receta Secreta del Universo
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo IX • Los Códigos Secretos</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">La Receta Secreta del Universo</h2>
              <p className="text-stone-300 font-hand text-lg">
                "Aquí está la magia: es imposible construir el número 12 de otra manera. Cada número en el infinito tiene su propio y exclusivo código de ADN. ¡Nunca se repiten!"
              </p>
            </div>

            {/* Three columns: 12, 18, 20 recipes with beautiful Snowflake gems */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: 12, recipe: [2, 2, 3], style: "from-amber-600/40 to-amber-950/40" },
                { n: 18, recipe: [2, 3, 3], style: "from-blue-600/40 to-blue-950/40" },
                { n: 20, recipe: [2, 2, 5], style: "from-green-600/40 to-green-950/40" }
              ].map(item => (
                <div key={item.n} className={`p-5 bg-gradient-to-b ${item.style} rounded-2xl border border-stone-850 text-center space-y-4 shadow-xl`}>
                  <div className="text-xs font-mono text-stone-400">RECETA DEL NÚMERO</div>
                  <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-amber-500/30 mx-auto flex items-center justify-center text-white font-serif font-bold text-xl">
                    {item.n}
                  </div>
                  
                  {/* Flat formula math */}
                  <div className="font-mono text-sm text-stone-300 bg-slate-950/60 p-2 rounded-lg border border-stone-800">
                    {item.n} = {item.recipe.join(" × ")}
                  </div>

                  {/* Gem layout */}
                  <div className="flex justify-center gap-1.5 pt-2">
                    {item.recipe.map((f, i) => (
                      <GemIcon key={i} value={f} size={30} showNumber={true} animate={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 11: // La Escalera Infinita
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo X • Hacia el Infinitum</span>
              <h2 className="text-3xl font-serif text-amber-200 font-bold">La Escalera Infinita</h2>
              <p className="text-stone-300 font-hand text-lg leading-relaxed">
                "A medida que viajamos hacia los números más grandes, las gemas puras se vuelven más raras y difíciles de encontrar."
              </p>
              <div className="p-4 bg-emerald-950/15 border border-emerald-500/35 rounded-xl">
                <p className="text-md font-serif text-emerald-250 italic font-medium leading-relaxed">
                  "Pero el mayor secreto de todos es este: el universo nunca se queda sin ellas. Son infinitas."
                </p>
              </div>
            </div>

            {/* Dynamic steps spiral climbing representation */}
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850 h-[320px] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.06)_0%,transparent_70%)]" />
              
              {/* Climbing spiral ladder line */}
              <svg className="absolute inset-0 w-full h-full stroke-emerald-500/20" viewBox="0 0 300 300">
                <path d="M 40,260 C 140,260 260,200 240,120 C 220,40 100,50 150,150" fill="none" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Glowing steps representation */}
              <div className="absolute bottom-[40px] left-[40px] flex flex-col items-center">
                <GemIcon value={2} size={28} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-stone-500">Paso 2</span>
              </div>
              <div className="absolute bottom-[80px] left-[100px] flex flex-col items-center">
                <GemIcon value={3} size={28} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-stone-500">Paso 3</span>
              </div>
              <div className="absolute bottom-[110px] right-[40px] flex flex-col items-center">
                <GemIcon value={5} size={28} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-stone-500">Paso 5</span>
              </div>
              <div className="absolute top-[80px] right-[80px] flex flex-col items-center">
                <GemIcon value={7} size={28} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-stone-500">Paso 7</span>
              </div>
              <div className="absolute top-[30px] left-[120px] flex flex-col items-center">
                <GemIcon value={11} size={28} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-stone-500">Paso 11</span>
              </div>
              
              <div className="absolute top-[140px] left-[140px] animate-pulse text-2xl text-amber-500">
                ★
              </div>
            </div>
          </div>
        );

      case 12: // El Fin del Misterio, El Comienzo del Juego
        return (
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-mono text-emerald-500/80 uppercase">Capítulo Final • La Visión del Arquitecto</span>
            <h2 className="text-3xl md:text-4xl font-serif text-amber-200 font-bold leading-tight">
              El Fin del Misterio, El Comienzo del Juego
            </h2>
            
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-stone-850 shadow-xl space-y-4">
              <BookOpen className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
              <p className="text-stone-200 font-hand text-xl md:text-2xl leading-relaxed">
                "Ahora posees la visión del Arquitecto. Cada vez que mires un número, ya no verás una simple figura en una página; verás la hermosa estructura de gemas irrompibles que se esconde en su interior."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToWorkshop}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 hover:text-white rounded-2xl font-hand font-extrabold text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 duration-300 flex items-center gap-3 mx-auto"
              >
                🎮 ¡Entrar al Gran Taller Interactivo! ✧
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full p-6 md:p-10 rounded-3xl bg-[#0e1724]/90 border border-emerald-500/10 shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
      {/* Dynamic Vine boarder to emphasize classroom-like illustrated feel */}
      <ChalkBorder variant="frame" color="stroke-emerald-500/15" />
      
      {/* Decorative Slide header vine */}
      <ChalkBorder variant="header" color="stroke-emerald-500/10" className="opacity-40" />

      {/* Main Slide custom visual render */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
        {renderVisuals()}
      </div>

      {/* Floating page number indicators */}
      <div className="relative z-10 flex justify-between items-center text-xs text-stone-500 font-mono mt-4 pt-2 border-t border-stone-900/45">
        <span>EL TALLER DEL ARQUITECTO CÓSMICO</span>
        <span className="py-1 px-3.5 bg-slate-950/80 rounded-full border border-stone-850 font-bold text-amber-500/80">
          PÁGINA {pageNumber} / 12
        </span>
      </div>
    </div>
  );
};
