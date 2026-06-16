import React from "react";
import { motion } from "motion/react";
import { GemIcon } from "./GemIcon";
import { getGemMetadata } from "../utils/mathUtils";
import { ArrowRight, BookOpen } from "lucide-react";

interface StorySlideProps {
  pageNumber: number;
  onNavigateToWorkshop?: () => void;
}

export const StorySlide: React.FC<StorySlideProps> = ({ pageNumber, onNavigateToWorkshop }) => {

  const renderVisuals = () => {
    switch (pageNumber) {
      case 1:
        return (
          <div className="relative w-full min-h-[380px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
            {/* Ambient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.12)_0%,transparent_65%)]" />
            
            {/* Orbit rings */}
            <div className="absolute w-72 h-72 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "120s" }} />
            <div className="absolute w-52 h-52 rounded-full border border-dashed border-amber-400/15 animate-spin" style={{ animationDuration: "85s", animationDirection: "reverse" }} />

            {/* Floating gems */}
            <div className="absolute top-[18%] left-[18%] animate-float"><GemIcon value={2} size={52} showNumber={true} animate={false} /></div>
            <div className="absolute top-[14%] right-[22%] animate-float" style={{ animationDelay: "1s" }}><GemIcon value={3} size={56} showNumber={true} animate={false} /></div>
            <div className="absolute bottom-[18%] left-[22%] animate-float" style={{ animationDelay: "1.5s" }}><GemIcon value={5} size={48} showNumber={true} animate={false} /></div>
            <div className="absolute bottom-[14%] right-[18%] animate-float" style={{ animationDelay: "2s" }}><GemIcon value={7} size={60} showNumber={true} animate={false} /></div>

            {/* Title block */}
            <div className="text-center z-10 max-w-lg px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-3">✧ Revelación de los Números Primos ✧</span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-3">
                El Taller del Mundo Cósmico
              </h1>
              <div className="w-12 h-0.5 bg-amber-400/60 mx-auto my-3" />
              <p className="text-white/70 text-lg font-medium">
                "El secreto detrás de cada número del universo."
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo I · Las Piedras Basales</span>
              <h2 className="text-2xl font-bold text-slate-800">La Materia de las Matemáticas</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Imagina que los números no son solo símbolos, sino "piedras" o "semillas" reales. Todo en el universo está construido con piezas fundamentales. Para entender cómo se construye cualquier número, primero debemos encontrar sus piezas inquebrantables.
              </p>
            </div>

            <div className="relative p-6 bg-slate-800 rounded-2xl min-h-[260px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_75%)]" />
              <svg className="absolute inset-0 w-full h-full stroke-emerald-400/15 pointer-events-none" viewBox="0 0 400 240">
                <path d="M 50,120 Q 150,10 250,150 T 350,120" fill="none" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              <div className="flex items-center justify-around w-full relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <GemIcon value={3} size={50} showNumber={true} animate={true} />
                  <span className="text-[10px] font-mono text-slate-400">Pura</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <GemIcon value={7} size={55} showNumber={true} animate={true} />
                  <span className="text-[10px] font-mono text-slate-400">Pura</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-14 w-14 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                    <div className="absolute translate-x-[-12px]"><GemIcon value={2} size={28} showNumber={false} animate={false} /></div>
                    <div className="absolute translate-x-[12px]"><GemIcon value={2} size={28} showNumber={false} animate={false} /></div>
                    <div className="absolute translate-y-[-10px]"><GemIcon value={3} size={28} showNumber={false} animate={false} /></div>
                    <span className="text-white text-xs font-bold drop-shadow z-20">12</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">Compuesta</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-float" style={{ animationDelay: "1.5s" }}>
                    <GemIcon value={100} size={52} showNumber={true} animate={false} />
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">Gema 100</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo II · El Gran Filtro</span>
              <h2 className="text-2xl font-bold text-slate-800">Filtrando la Arena del Tiempo</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Si pasamos todos los números por un tamiz mágico, los que se pueden dividir se deshacen como polvo. Lo que queda en la malla son las joyas puras del universo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
              <div className="p-4 bg-white rounded-xl border border-slate-200 card-shadow text-center space-y-3">
                <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">La Arena de Números</span>
                <div className="grid grid-cols-5 gap-1.5 p-3 bg-slate-50 rounded-lg min-h-[130px] items-center">
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(v => (
                    <span key={v} className="text-xs font-mono text-slate-500">{v}</span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">Números sin depurar.</p>
              </div>

              <div className="flex flex-col items-center justify-center p-4 text-center space-y-3">
                <div className="w-28 h-28 rounded-full border-4 border-amber-400 bg-white flex flex-col items-center justify-center relative shadow-md card-shadow">
                  <div className="absolute inset-2 border border-dashed border-amber-300 rounded-full flex flex-col justify-around">
                    <div className="border-t border-dashed border-amber-300 w-full" />
                    <div className="border-t border-dashed border-amber-300 w-full" />
                    <div className="border-t border-dashed border-amber-300 w-full" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 z-10">TAMIZ</span>
                  <div className="text-[10px] text-slate-400 z-10">Desintegrando...</div>
                  <div className="absolute bottom-[-18px] text-slate-400 text-xs font-mono space-x-1 animate-pulse">
                    <span>4</span><span>8</span><span>9</span><span>15</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400 rotate-90 md:rotate-0 mt-3" />
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 card-shadow text-center space-y-3">
                <span className="text-xs font-semibold text-emerald-600 block uppercase tracking-wider">Joyas que Permanecen</span>
                <div className="flex flex-wrap justify-center gap-2 p-3 bg-white rounded-lg min-h-[130px] items-center">
                  {[2,3,5,7,11,13,17,19].map(p => (
                    <GemIcon key={p} value={p} size={30} showNumber={true} animate={false} />
                  ))}
                </div>
                <p className="text-[11px] text-emerald-600">Solo las gemas puras resisten el filtro.</p>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={onNavigateToWorkshop}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:-translate-y-0.5"
              >
                🎮 ¡Jugá con el Tamiz Interactivo en el Laboratorio!
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo III · Los Elementos Indivisibles</span>
              <h2 className="text-2xl font-bold text-slate-800">Las Gemas Puras: Los Números Primos</h2>
              <p className="text-slate-600 text-base">
                Estas piedras preciosas son irrompibles. No pueden ser divididas en piezas más pequeñas. Son los elementos básicos que el Mundo usa para construir todo lo demás.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[2, 3, 5, 7].map(g => {
                const meta = getGemMetadata(g);
                return (
                  <div key={g} className="p-5 bg-white rounded-2xl border border-slate-100 card-shadow flex flex-col items-center text-center space-y-3 hover:border-amber-200 hover:shadow-md transition-all">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{meta.type}</span>
                    <GemIcon value={g} size={68} showNumber={true} animate={true} />
                    <h3 className={`font-bold text-base ${meta.textColor}`}>{meta.name}</h3>
                    <div className="w-8 h-px bg-slate-200" />
                    <p className="text-xs text-slate-500 leading-relaxed">
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

      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo IV · Aleaciones Químicas</span>
              <h2 className="text-2xl font-bold text-slate-800">Los Bloques de Construcción: Números Compuestos</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Los demás números no son puros; son estructuras hermosas formadas al fusionar diferentes gemas. El tamaño y la forma de la estructura dependen de las gemas que uses.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow space-y-5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Ejemplos de Fusión</h3>
              {[
                { a: 2, b: 3, result: 6, aLabel: "Rubí 1", bLabel: "Zafiro 2", desc: "Seis: un Rubí unido con un Zafiro." },
                { a: 2, b: 5, result: 10, aLabel: "Rubí", bLabel: "Esmeralda", desc: "Diez: Rubí y Esmeralda en perfecta cohesión." }
              ].map(item => (
                <div key={item.result} className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <GemIcon value={item.a} size={34} showNumber={true} animate={false} />
                      <span className="text-[9px] font-mono text-slate-400 mt-1">{item.aLabel}</span>
                    </div>
                    <span className="text-lg font-mono text-slate-400">×</span>
                    <div className="flex flex-col items-center">
                      <GemIcon value={item.b} size={34} showNumber={true} animate={false} />
                      <span className="text-[9px] font-mono text-slate-400 mt-1">{item.bLabel}</span>
                    </div>
                    <span className="text-base font-mono text-slate-400">=</span>
                    <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
                      <div className="text-lg font-bold text-amber-700">{item.result}</div>
                      <div className="flex -space-x-2">
                        <GemIcon value={item.a} size={20} showNumber={false} animate={false} />
                        <GemIcon value={item.b} size={20} showNumber={false} animate={false} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo V · Taxonomía Universal</span>
              <h2 className="text-2xl font-bold text-slate-800">Los Dos Linajes de la Aritmética</h2>
              <p className="text-slate-600 text-base">Cada número pertenece a uno de los dos grandes linajes de la creación.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 card-shadow">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="p-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">Propiedad</th>
                    <th className="p-4 font-bold text-violet-600 text-sm">Los Intocables <span className="block text-xs font-normal text-slate-400">(Números Primos)</span></th>
                    <th className="p-4 font-bold text-amber-600 text-sm">Los Constructores <span className="block text-xs font-normal text-slate-400">(Números Compuestos)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="p-4 font-semibold text-emerald-600 text-xs uppercase">Naturaleza</td>
                    <td className="p-4 text-slate-600 text-sm">Solo divisibles por sí mismos y por el 1.</td>
                    <td className="p-4 text-slate-600 text-sm">Divisibles por otros números, permitiendo partición limpia.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-4 font-semibold text-emerald-600 text-xs uppercase">Metáfora</td>
                    <td className="p-4 text-violet-600 text-sm font-medium">Ladrillos base indivisibles y gemas puras de cristal.</td>
                    <td className="p-4 text-amber-600 text-sm font-medium">Castillos y estructuras formadas por gemas.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-emerald-600 text-xs uppercase">Ejemplo Visual</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <GemIcon value={7} size={38} showNumber={true} animate={false} />
                        <span className="text-xs text-slate-500">Gema 7 (Amatista)</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5">
                          <span className="text-sm font-bold text-amber-600">12</span>
                          <div className="flex -space-x-1.5">
                            <GemIcon value={2} size={16} showNumber={false} animate={false} />
                            <GemIcon value={2} size={16} showNumber={false} animate={false} />
                            <GemIcon value={3} size={16} showNumber={false} animate={false} />
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">Complejo Modular</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo VI · El Árbol de la Tierra</span>
              <h2 className="text-2xl font-bold text-slate-800">El Sistema de Raíces</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Para descubrir de qué está hecho un número, debemos seguir sus raíces hacia la tierra. Al final de cada raíz, siempre encontraremos una gema prima esperando.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow flex flex-col items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-4">Árbol de Raíces para el 30</span>
              <div className="relative pt-2 pb-6 w-full flex flex-col items-center">
                <div className="px-6 py-3 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex flex-col items-center justify-center relative shadow-md z-10">
                  <div className="text-xs font-mono text-slate-400">NÚCLEO MAESTRO</div>
                  <span className="text-2xl text-white font-extrabold">30</span>
                </div>
                <svg width="280" height="150" className="overflow-visible mt-1 relative z-0">
                  <path d="M 140 0 Q 70 40 70 85" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 140 0 Q 210 40 210 85" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 210 110 Q 170 135 170 170" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 210 110 Q 250 135 250 170" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div className="absolute top-[105px] left-[20px] z-10 flex flex-col items-center justify-center">
                  <GemIcon value={5} size={38} showNumber={true} animate={false} />
                  <span className="text-[10px] font-semibold text-emerald-600 mt-1">Gema Prima</span>
                </div>
                <div className="absolute top-[105px] right-[40px] z-10 flex flex-col items-center justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <span className="text-slate-700 text-sm font-bold">6</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">Dividible</span>
                </div>
                <div className="absolute top-[185px] right-[88px] z-20 flex flex-col items-center pt-2">
                  <GemIcon value={2} size={28} showNumber={true} animate={false} />
                  <span className="text-[9px] font-semibold text-red-500 mt-1">Prima</span>
                </div>
                <div className="absolute top-[185px] right-[8px] z-20 flex flex-col items-center pt-2">
                  <GemIcon value={3} size={28} showNumber={true} animate={false} />
                  <span className="text-[9px] font-semibold text-blue-500 mt-1">Prima</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo VII · Descomposición Atómica</span>
              <h2 className="text-2xl font-bold text-slate-800">Anatomía de una Estructura</h2>
              <p className="text-slate-600 text-base">
                Al "desarmar" un número compuesto, capa por capa, revelamos su núcleo atómico.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow">
              <h3 className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider mb-6">Fisión Nuclear del Número 60</h3>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-md">60</div>
                  <div className="text-xs font-semibold text-slate-400">Masa Molecular</div>
                </div>
                <div className="hidden md:flex flex-col items-center text-amber-400">
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Separar</span>
                </div>
                <div className="flex gap-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                    <span className="w-9 h-9 bg-amber-100 border border-amber-300 rounded-lg flex items-center justify-center text-amber-700 font-bold mx-auto mb-2">6</span>
                    <div className="flex gap-1"><GemIcon value={2} size={18} showNumber={false} animate={false} /><GemIcon value={3} size={18} showNumber={false} animate={false} /></div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <span className="w-9 h-9 bg-emerald-100 border border-emerald-300 rounded-lg flex items-center justify-center text-emerald-700 font-bold mx-auto mb-2">10</span>
                    <div className="flex gap-1"><GemIcon value={2} size={18} showNumber={false} animate={false} /><GemIcon value={5} size={18} showNumber={false} animate={false} /></div>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-center text-amber-400">
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Fusión</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-2">
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase block">Núcleo Atómico Neto</span>
                  <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-100">
                    <GemIcon value={2} size={24} showNumber={true} animate={false} />
                    <span className="text-slate-400 font-mono text-sm">×</span>
                    <GemIcon value={2} size={24} showNumber={true} animate={false} />
                    <span className="text-slate-400 font-mono text-sm">×</span>
                    <GemIcon value={3} size={24} showNumber={true} animate={false} />
                    <span className="text-slate-400 font-mono text-sm">×</span>
                    <GemIcon value={5} size={24} showNumber={true} animate={false} />
                  </div>
                  <p className="text-[10px] text-slate-400">Cuatro gemas elementales fusionadas.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo VIII · El Gran Sello</span>
              <h2 className="text-2xl font-bold text-slate-800">El Teorema Fundamental: El ADN Numérico</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Cada número compuesto tiene una única "llave" que lo abre: una combinación exacta y secreta de números primos. Ninguna otra combinación funcionará.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow flex flex-col items-center text-center space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">La Llave de Combinación Única</h3>
              <div className="flex items-center gap-5 py-6 relative w-full justify-center">
                <div className="relative p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400" />
                  <div className="h-2 w-14 bg-amber-400 flex items-center justify-around relative px-1">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
                  </div>
                  <div className="w-3 h-5 bg-amber-400 rounded-r-md" />
                </div>
                <span className="text-slate-400 font-mono text-xl animate-pulse">➔</span>
                <div className="p-3 bg-slate-100 border-2 border-slate-300 rounded-xl text-center relative w-24">
                  <div className="w-10 h-7 rounded-t-full border-2 border-slate-500 absolute top-[-10px] left-7 border-b-0" />
                  <span className="text-lg font-bold text-slate-700">210</span>
                  <div className="w-2.5 h-5 bg-slate-400 mx-auto mt-1 rounded-full" />
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ninguna otra combinación puede forjar la llave para el número 210, excepto la perfecta aleación: <strong className="text-slate-700">(2 · 3 · 5 · 7)</strong>.
              </p>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo IX · Los Códigos Secretos</span>
              <h2 className="text-2xl font-bold text-slate-800">La Receta Secreta del Universo</h2>
              <p className="text-slate-600 text-base">¡Cada número en el infinito tiene su propio y exclusivo código de ADN!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: 12, recipe: [2, 2, 3], bg: "bg-amber-50", border: "border-amber-200", label: "text-amber-700" },
                { n: 18, recipe: [2, 3, 3], bg: "bg-blue-50", border: "border-blue-200", label: "text-blue-700" },
                { n: 20, recipe: [2, 2, 5], bg: "bg-emerald-50", border: "border-emerald-200", label: "text-emerald-700" }
              ].map(item => (
                <div key={item.n} className={`p-5 ${item.bg} rounded-2xl border ${item.border} card-shadow text-center space-y-4`}>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Receta del Número</div>
                  <div className={`w-14 h-14 rounded-full bg-white border-2 ${item.border} mx-auto flex items-center justify-center font-bold text-xl ${item.label}`}>
                    {item.n}
                  </div>
                  <div className={`font-mono text-sm ${item.label} bg-white p-2 rounded-lg border ${item.border}`}>
                    {item.n} = {item.recipe.join(" × ")}
                  </div>
                  <div className="flex justify-center gap-2 pt-1">
                    {item.recipe.map((f, i) => (
                      <GemIcon key={i} value={f} size={28} showNumber={true} animate={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 11:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo X · Hacia el Infinitum</span>
              <h2 className="text-2xl font-bold text-slate-800">La Escalera Infinita</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A medida que viajamos hacia los números más grandes, las gemas puras se vuelven más raras y difíciles de encontrar.
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-base text-emerald-700 font-medium leading-relaxed">
                  "Pero el mayor secreto de todos es este: el universo nunca se queda sin ellas. Son infinitas."
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow h-[300px] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.04)_0%,transparent_70%)]" />
              <svg className="absolute inset-0 w-full h-full stroke-slate-200" viewBox="0 0 300 300">
                <path d="M 40,260 C 140,260 260,200 240,120 C 220,40 100,50 150,150" fill="none" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
              <div className="absolute bottom-[40px] left-[40px] flex flex-col items-center">
                <GemIcon value={2} size={26} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-slate-400">Paso 2</span>
              </div>
              <div className="absolute bottom-[80px] left-[100px] flex flex-col items-center">
                <GemIcon value={3} size={26} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-slate-400">Paso 3</span>
              </div>
              <div className="absolute bottom-[110px] right-[40px] flex flex-col items-center">
                <GemIcon value={5} size={26} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-slate-400">Paso 5</span>
              </div>
              <div className="absolute top-[80px] right-[80px] flex flex-col items-center">
                <GemIcon value={7} size={26} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-slate-400">Paso 7</span>
              </div>
              <div className="absolute top-[30px] left-[120px] flex flex-col items-center">
                <GemIcon value={11} size={26} showNumber={true} animate={true} />
                <span className="text-[8px] font-mono text-slate-400">Paso 11</span>
              </div>
              <div className="absolute top-[140px] left-[140px] animate-pulse text-xl text-amber-500">★</div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Capítulo Final · La Visión del Mundo</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              El Fin del Misterio, El Comienzo del Juego
            </h2>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 card-shadow-md space-y-4">
              <BookOpen className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-slate-700 text-xl leading-relaxed font-medium">
                "Ahora posees la visión del Mundo. Cada vez que mires un número, ya no verás una simple figura; verás la hermosa estructura de gemas irrompibles que se esconde en su interior."
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onNavigateToWorkshop}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-2xl font-bold text-lg shadow-lg transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-3 mx-auto"
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
    <div className="relative w-full p-6 md:p-10 rounded-3xl bg-white border border-slate-100 card-shadow-md overflow-hidden min-h-[440px] flex flex-col justify-between">
      
      {/* Main slide content */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
        {renderVisuals()}
      </div>

      {/* Page number */}
      <div className="relative z-10 flex justify-between items-center text-xs text-slate-400 font-mono mt-4 pt-3 border-t border-slate-100">
        <span className="font-semibold tracking-wider">EL TALLER DEL MUNDO CÓSMICO</span>
        <span className="py-1 px-3 bg-slate-50 rounded-full border border-slate-200 font-bold text-slate-600">
          PÁGINA {pageNumber} / 12
        </span>
      </div>
    </div>
  );
};
