import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  isPrime, 
  getPrimeFactorsFlat, 
  getPrimeFactorsExponents, 
  getGemMetadata, 
  buildFactorTree 
} from "../utils/mathUtils";
import { GemIcon } from "./GemIcon";
import { FactorNode } from "../types";
import { Sparkles, Key, Lock, HelpCircle, Activity, Undo2, Play, GitBranch, ShieldAlert } from "lucide-react";

export const InteractiveWorkshop: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"forja" | "tamiz">("forja");

  // Forge state
  const [inputValue, setInputValue] = useState<number>(30);
  const [currentNum, setCurrentNum] = useState<number>(30);
  const [treeData, setTreeData] = useState<FactorNode | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [unlockAnimating, setUnlockAnimating] = useState<boolean>(false);
  
  // Sieve state
  const [sieveNumbers, setSieveNumbers] = useState<{ value: number; state: "active" | "sieved" | "prime" }[]>([]);
  const [sieveStep, setSieveStep] = useState<number>(1);
  const [activeSieveDivisor, setActiveSieveDivisor] = useState<number | null>(null);

  // Initialize and update tree data
  useEffect(() => {
    setTreeData(buildFactorTree(currentNum));
    setIsUnlocked(false);
  }, [currentNum]);

  // Handle forge number changes
  const handleForgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Math.min(Math.max(2, inputValue), 1000);
    setInputValue(val);
    setCurrentNum(val);
  };

  // Preset selectors
  const presets = [12, 30, 60, 210, 84, 100, 313];

  // Sieve initializer
  const initSieve = () => {
    const list = [];
    for (let i = 1; i <= 40; i++) {
      list.push({ value: i, state: "active" as const });
    }
    setSieveNumbers(list);
    setSieveStep(1);
    setActiveSieveDivisor(null);
  };

  useEffect(() => {
    initSieve();
  }, []);

  // Sieve step filtering
  const runSieveStep = (divisor: number) => {
    setActiveSieveDivisor(divisor);
    setSieveStep(prev => prev + 1);
    
    setSieveNumbers(prev =>
      prev.map(item => {
        if (item.value === 1) {
          return { ...item, state: "sieved" as const };
        }
        if (item.value === divisor) {
          return { ...item, state: "prime" as const };
        }
        if (item.value % divisor === 0 && item.value > divisor) {
          return { ...item, state: "sieved" as const };
        }
        return item;
      })
    );
  };

  const markAllPrimes = () => {
    setSieveNumbers(prev =>
      prev.map(item => {
        if (item.value > 1 && isPrime(item.value)) {
          return { ...item, state: "prime" as const };
        } else if (item.value > 1) {
          return { ...item, state: "sieved" as const };
        }
        return { ...item, state: "sieved" as const };
      })
    );
  };

  // Unlock animation
  const startUnlockSequence = () => {
    if (isUnlocked) {
      setIsUnlocked(false);
      return;
    }
    setUnlockAnimating(true);
    setTimeout(() => {
      setUnlockAnimating(false);
      setIsUnlocked(true);
    }, 1800);
  };

  // Find factors and flat factors
  const isSelectedPrime = isPrime(currentNum);
  const flatFactors = getPrimeFactorsFlat(currentNum);
  const exponentsFactors = getPrimeFactorsExponents(currentNum);

  // Render Factor Tree nodes recursively with root vine connections
  const renderTreeSvg = (node: FactorNode, x: number, y: number, offset: number): React.ReactNode => {
    const childY = y + 80;
    const leftX = x - offset;
    const rightX = x + offset;

    const metadata = getGemMetadata(node.value);

    return (
      <g key={`${node.value}-${x}-${y}`}>
        {/* Connection root vines */}
        {node.left && node.right && (
          <>
            {/* Left branch vine curve */}
            <path
              d={`M ${x} ${y + 25} Q ${(x + leftX) / 2} ${(y + childY) / 2 - 15} ${leftX} ${childY - 20}`}
              fill="none"
              stroke="#854d0e" // Wood brown
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-75"
            />
            <path
              d={`M ${x} ${y + 25} Q ${(x + leftX) / 2} ${(y + childY) / 2 - 15} ${leftX} ${childY - 20}`}
              fill="none"
              stroke="#a16207" // Light gold wood brown
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-90 stroke-dashed"
            />
            {/* Right branch vine curve */}
            <path
              d={`M ${x} ${y + 25} Q ${(x + rightX) / 2} ${(y + childY) / 2 - 15} ${rightX} ${childY - 20}`}
              fill="none"
              stroke="#854d0e"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-75"
            />
            <path
              d={`M ${x} ${y + 25} Q ${(x + rightX) / 2} ${(y + childY) / 2 - 15} ${rightX} ${childY - 20}`}
              fill="none"
              stroke="#a16207"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-90 stroke-dashed"
            />
            
            {/* Sprout little leaf details along lines */}
            <circle cx={(x + leftX) / 2 - 10} cy={(y + childY) / 2} r="3" className="fill-emerald-400 opacity-60" />
            <circle cx={(x + rightX) / 2 + 10} cy={(y + childY) / 2} r="3" className="fill-emerald-400 opacity-60" />

            {/* Recurse left and right */}
            {renderTreeSvg(node.left, leftX, childY, Math.max(25, offset * 0.5))}
            {renderTreeSvg(node.right, rightX, childY, Math.max(25, offset * 0.5))}
          </>
        )}

        {/* Current Node Stone/Gem */}
        <g transform={`translate(${x - 24}, ${y - 24})`}>
          <foreignObject width="48" height="48">
            <div className="w-full h-full flex items-center justify-center">
              {node.isPrime ? (
                <GemIcon value={node.value} size={38} showNumber={true} animate={true} />
              ) : (
                <div 
                  onClick={() => setCurrentNum(node.value)}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-600 to-amber-950 border border-amber-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  title="Haz clic para inspeccionar este número"
                >
                  <span className="text-stone-300 font-hand font-bold text-sm text-shadow">
                    {node.value}
                  </span>
                </div>
              )}
            </div>
          </foreignObject>
        </g>
      </g>
    );
  };

  return (
    <div id="interactive-taller" className="w-full relative py-12 px-4 md:px-8 bg-slate-900/90 rounded-3xl border-2 border-dashed border-amber-500/20 shadow-2xl backdrop-blur">
      
      {/* Visual Vine flourishes in the corners */}
      <div className="absolute top-4 left-4 text-emerald-500/10 pointer-events-none text-4xl">❀</div>
      <div className="absolute top-4 right-4 text-emerald-500/10 pointer-events-none text-4xl">❀</div>

      {/* Tabs Header */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-amber-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-mono text-amber-500/80">Laboratorio Interactivo</span>
        </div>
        <h2 className="text-3xl md:text-4xl text-center font-serif text-amber-100 font-bold tracking-wide">
          El Taller del Arquitecto
        </h2>
        <p className="text-stone-400 font-hand text-center text-lg mt-2 max-w-xl">
          "De lo simple a lo complejo. Manipula las joyas primas, forja las llaves de ADN de cada número, o filtra la arena del tiempo."
        </p>

        {/* Tab buttons */}
        <div className="flex gap-4 p-1 mt-6 bg-[#090f17] rounded-full border border-orange-500/20 shadow-inner">
          <button
            onClick={() => setActiveTab("forja")}
            className={`px-6 py-2.5 rounded-full font-hand text-lg transition-all ${
              activeTab === "forja"
                ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            ✧ La Forja de Fórmulas
          </button>
          <button
            onClick={() => setActiveTab("tamiz")}
            className={`px-6 py-2.5 rounded-full font-hand text-lg transition-all ${
              activeTab === "tamiz"
                ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            ✧ El Tamiz de Arena
          </button>
        </div>
      </div>

      {/* TAB 1: LA FORJA COMPOSER */}
      <AnimatePresence mode="wait">
        {activeTab === "forja" && (
          <motion.div
            key="forja-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Left Controls & Formulation Panel */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Slate panel for input */}
              <div className="p-6 bg-[#0a111a] rounded-2xl border border-orange-500/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-orange-500/5 text-orange-500/20 text-6xl font-serif select-none">
                  N°
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-200 mb-4 flex items-center gap-2">
                  <span className="text-orange-500">❖</span> Elige un Número
                </h3>
                
                <form onSubmit={handleForgeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-stone-400 font-mono mb-1">
                      VALOR (2 al 1000)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="2"
                        max="1000"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseInt(e.target.value) || 2)}
                        className="flex-1 px-4 py-3 bg-slate-900 border border-orange-500/20 rounded-xl text-amber-100 font-mono focus:outline-none focus:border-amber-500/50 text-xl"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 font-hand text-lg"
                      >
                        <Play className="w-4 h-4 fill-current" /> Forjar
                      </button>
                    </div>
                  </div>
                </form>

                {/* Presets */}
                <div className="mt-4">
                  <span className="text-xs text-stone-500 font-mono uppercase block mb-2">Preajustes Sugeridos:</span>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setInputValue(p);
                          setCurrentNum(p);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all ${
                          currentNum === p
                            ? "bg-amber-650 border-amber-500 text-white shadow"
                            : "bg-[#0c1420] border-stone-800 text-stone-300 hover:border-stone-700"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Characterization Display */}
              <div className="p-6 bg-[#0a111a] rounded-2xl border border-orange-500/10 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-mono tracking-wider text-stone-500">Clon Genético</span>
                    <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                      Número {currentNum}
                    </h3>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full font-hand text-lg font-bold border ${
                    isSelectedPrime 
                      ? "bg-purple-950/40 text-purple-300 border-purple-500/30" 
                      : "bg-amber-950/40 text-amber-300 border-amber-500/30"
                  }`}>
                    {isSelectedPrime ? "✦ Gema Pura (Número Primo)" : "❖ Compuesto Estructural"}
                  </span>
                </div>

                <p className="text-stone-300 text-sm italic font-hand leading-relaxed">
                  {isSelectedPrime 
                    ? `El número ${currentNum} es indivisible. Es una de las gemas básicas del Arquitecto, inmune al tamiz de la división.`
                    : `El número ${currentNum} es una hermosa aleación estructural formada por la fusión cósmica de ${flatFactors.length} gemas primas.`
                  }
                </p>

                {/* Receta Secreta */}
                <div className="border-t border-stone-800 pt-4 space-y-3">
                  <h4 className="text-sm uppercase font-mono tracking-wider text-amber-500/70">
                    {isSelectedPrime ? "Su Singularidad" : "Receta de ADN Cósmico"}
                  </h4>
                  
                  {/* Visual formula representation */}
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-900/60 rounded-xl border border-stone-800">
                    <span className="text-2xl font-serif text-white font-bold">{currentNum}</span>
                    <span className="text-stone-505 text-lg font-mono">=</span>

                    {isSelectedPrime ? (
                      <div className="flex items-center gap-2">
                        <GemIcon value={currentNum} size={40} showNumber={false} animate={true} />
                        <span className="font-hand text-purple-400 text-lg">({getGemMetadata(currentNum).name})</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        {flatFactors.map((factor, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <span className="text-stone-600 font-mono text-xl">×</span>}
                            <div className="flex items-center gap-1 group relative">
                              <GemIcon value={factor} size={36} showNumber={true} animate={false} />
                              {/* Hover tooltip for gem info */}
                              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-stone-950 text-white text-xs rounded py-1 px-2 z-50 whitespace-nowrap shadow-xl">
                                {getGemMetadata(factor).name}
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Exponential DNA coding (e.g. 2^2 * 3^1) */}
                  {!isSelectedPrime && (
                    <div className="text-xs font-mono text-stone-500 flex gap-4 mt-1 pl-1">
                      <span>CÓDIGO SECRETO:</span>
                      <span className="text-amber-500">
                        {exponentsFactors.map((f, idx) => (
                          <React.Fragment key={f.prime}>
                            {idx > 0 && " • "}
                            <span>{f.prime}<sup>{f.exponent}</sup></span>
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Display Area splits into factor tree or Lock & Key */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic visualization canvas */}
              <div className="p-6 bg-[#0a111a] rounded-3xl border border-orange-500/10 shadow-lg min-h-[460px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 left-4 flex gap-3 z-10">
                  <div className="text-[#a16207] text-xs font-mono flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5" /> El Árbol de Raíces
                  </div>
                </div>

                {/* Sub-header inside visualizer */}
                <div className="text-center pt-2 pb-4">
                  <h4 className="text-stone-400 font-hand text-lg">
                    {isSelectedPrime ? "Visualización de la Piedra Angular" : "Descubriendo las Raíces Cósmicas"}
                  </h4>
                </div>

                {/* TREE AND LOCK CANVAS OVERLAY */}
                <div className="flex-1 flex flex-col lg:flex-row items-center justify-around gap-6 relative p-2 min-h-[300px]">
                  
                  {/* Part A: The root factor tree (Page 7) */}
                  <div className="w-full max-w-[360px] flex items-center justify-center bg-black/10 rounded-2xl p-4 border border-stone-800/40">
                    <svg width="340" height="280" className="overflow-visible">
                      {treeData ? (
                        renderTreeSvg(treeData, 170, 40, 75)
                      ) : (
                        <text x="170" y="140" fill="#a8a29e" textAnchor="middle" className="font-hand">
                          Cargando Árbol...
                        </text>
                      )}
                    </svg>
                  </div>

                  {/* Part B: The Magic Padlock & Key (Page 9) */}
                  <div className="flex flex-col items-center justify-center p-6 bg-slate-900/40 border border-stone-800/60 rounded-2xl w-full max-w-[280px]">
                    <span className="text-[10px] text-stone-500 font-mono mb-4 block uppercase">Caja de Seguridad Cósmica</span>
                    
                    <div className="relative mb-6 flex items-center justify-center h-44 w-full">
                      {/* Animated stars */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] animate-pulse" />
                      
                      {/* The Padlock (Page 9) */}
                      <motion.div
                        animate={{ 
                          scale: isUnlocked ? [1, 1.05, 1] : 1,
                          rotate: unlockAnimating ? [0, -6, 6, -6, 6, 0] : 0
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center justify-center"
                      >
                        {/* Shackle */}
                        <div className={`w-14 h-16 rounded-t-full border-4 ${
                          isUnlocked ? "translate-y-[-14px] border-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]" : "border-stone-400"
                        } border-b-0 transition-transform duration-550`} />
                        
                        {/* Padlock Body */}
                        <div className={`w-28 h-24 -mt-1 rounded-2xl bg-gradient-to-br ${
                          isUnlocked ? "from-amber-400 to-amber-700 text-stone-900" : "from-stone-700 to-stone-900 text-stone-400"
                        } border-2 border-stone-600/40 flex flex-col items-center justify-center relative p-3 shadow-xl transition-all duration-500`}>
                          
                          {/* Inner gold engravings */}
                          <div className="absolute inset-2 border border-amber-500/30 rounded-lg pointer-events-none" />
                          <span className={`text-2xl font-serif font-bold ${
                            isUnlocked ? "text-stone-950 font-extrabold" : "text-amber-200"
                          } drop-shadow`}>
                            {currentNum}
                          </span>
                          
                          {/* Keyhole */}
                          <div className={`w-4 h-7 mt-2 rounded-full ${
                            isUnlocked ? "bg-amber-950" : "bg-black"
                          } flex flex-col items-center justify-start py-1`}>
                            <div className="w-2.5 h-2.5 bg-stone-500 rounded-full" />
                            <div className="w-1.5 h-3 bg-stone-500 rounded-b mt-0.5" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating Key fitting the prime colors */}
                      <AnimatePresence>
                        {!isUnlocked && !unlockAnimating && (
                          <motion.div 
                            initial={{ opacity: 0, x: 50, rotate: -25 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: -60, y: -20, rotate: -45 }}
                            className="absolute right-0 bottom-4 z-20 cursor-pointer group"
                            onClick={startUnlockSequence}
                            title="Haz clic para usar esta llave de ADN y abrir el candado"
                          >
                            <div className="relative p-2 bg-slate-950 rounded-xl border border-amber-500/10 flex items-center shadow-lg hover:border-amber-500/50 hover:bg-slate-900 active:scale-95 transition-all">
                              {/* Head of the Key */}
                              <div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center mr-1">
                                <div className="w-4 h-4 rounded-full bg-amber-600/20" />
                              </div>
                              {/* Shaft of the Key representing the prime gems teeth */}
                              <div className="h-2 w-16 bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-around pr-1 relative">
                                {/* Gems matching the factors embedded in the key teeth */}
                                <div className="absolute inset-0 flex items-center justify-between px-2">
                                  {[...new Set(flatFactors)].slice(0, 4).map((f, i) => (
                                    <div 
                                      key={i} 
                                      className="w-2.5 h-2.5 rounded-full" 
                                      style={{ backgroundColor: getGemMetadata(f).color }} 
                                    />
                                  ))}
                                </div>
                              </div>
                              {/* Key Teeth */}
                              <div className="w-4 h-5 flex flex-col justify-end">
                                <div className="w-2 h-1.5 bg-amber-400 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-sm mt-0.5" />
                              </div>
                            </div>
                            <span className="text-[10px] text-amber-500/80 font-hand text-center block mt-1 animate-pulse">▲ Haz clic para abrir</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Floating Key Unlocking Animation Overlay */}
                      {unlockAnimating && (
                        <motion.div
                          animate={{ 
                            x: [60, 20, 20, 0, 40],
                            y: [10, 15, 15, 20, 10], 
                            rotate: [0, -10, 90, 90, 45],
                            opacity: [1, 1, 1, 0]
                          }}
                          transition={{ duration: 1.8 }}
                          className="absolute z-30 pointer-events-none"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center mr-1" />
                            <div className="h-3 w-20 bg-amber-400 relative" />
                            <div className="w-4 h-6 bg-amber-400" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <button
                      onClick={startUnlockSequence}
                      className={`w-full py-2 px-4 rounded-xl flex items-center justify-center gap-2 font-hand text-md font-bold transition-all ${
                        isUnlocked 
                          ? "bg-stone-850 hover:bg-stone-800 text-amber-200 border border-stone-700" 
                          : "bg-amber-600 hover:bg-amber-500 text-slate-950"
                      }`}
                    >
                      {isUnlocked ? (
                        <>🗏 Volver a Cerrar</>
                      ) : (
                        <>
                          <Key className="w-4 h-4" /> Desarmar con su LLave
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Bottom interactive guide banner */}
                <div className="p-4 bg-slate-900 border border-stone-800 rounded-2xl flex items-center gap-3">
                  <HelpCircle className="w-10 h-10 text-amber-500/70 shrink-0" />
                  <p className="text-xs text-stone-400 leading-relaxed font-hand text-sm">
                    {isSelectedPrime 
                      ? "Este es una gema pura. Las raíces no pueden dividirse más. ¡Un candado de número primo solo necesita una llave con su propia joya!"
                      : `Haz clic en cualquier piedra numérica redonda en el Árbol de Raíces para enfocar de inmediato tu taller en ese sub-núcleo dividible.`
                    }
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: EL TAMIZ DE ARENA */}
        {activeTab === "tamiz" && (
          <motion.div
            key="tamiz-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Introductory chalk alert */}
            <div className="p-5 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-serif text-emerald-200 font-semibold">El Tamiz Mágico: Filtrando Compuestos</h3>
                <p className="text-sm text-stone-300 font-hand">
                  Vierte los números por la malla mágica. Al cribar por los múltiplos de cada primo, los números compuestos se desintegrarán en polvo estelar, revelando la pureza de las gemas ocultas.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={initSieve}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-lg text-sm font-hand transition-all flex items-center gap-1.5"
                >
                  <Undo2 className="w-4 h-4" /> Reiniciar Tamiz
                </button>
                <button
                  onClick={markAllPrimes}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-hand font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Revelar Todo
                </button>
              </div>
            </div>

            {/* Sieve Game Core */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Sieve Controls (Left) */}
              <div className="md:col-span-4 p-5 bg-[#0a111a] border border-emerald-500/10 rounded-2xl shadow space-y-4">
                <h4 className="text-sm uppercase font-mono tracking-wider text-emerald-400">Paso a Paso del Arquitecto</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Para purificar los números del 1 al 40, selecciona una gema prima. Todos sus múltiplos (excepto ella misma, ya que es la creadora pura) se disolverán en arena y caerán por la rejilla.
                </p>

                {/* Filter buttons */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs text-stone-500 font-mono block">CRIBAR POR MULTIPLOS DE:</span>
                  
                  <button
                    onClick={() => runSieveStep(2)}
                    className="w-full p-2.5 bg-red-950/30 hover:bg-red-950/50 border border-red-500/20 hover:border-red-500/50 rounded-xl flex items-center justify-between text-red-200 transition-all font-hand text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <GemIcon value={2} size={28} showNumber={false} animate={false} /> Multiplos del 2 (Pares)
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Cribar 2</span>
                  </button>

                  <button
                    onClick={() => runSieveStep(3)}
                    className="w-full p-2.5 bg-blue-950/30 hover:bg-blue-950/50 border border-blue-500/20 hover:border-blue-500/50 rounded-xl flex items-center justify-between text-blue-200 transition-all font-hand text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <GemIcon value={3} size={28} showNumber={false} animate={false} /> Multiplos del 3
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Cribar 3</span>
                  </button>

                  <button
                    onClick={() => runSieveStep(5)}
                    className="w-full p-2.5 bg-green-950/30 hover:bg-green-950/50 border border-green-500/30 hover:border-green-500/50 rounded-xl flex items-center justify-between text-green-200 transition-all font-hand text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <GemIcon value={5} size={28} showNumber={false} animate={false} /> Multiplos del 5
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Cribar 5</span>
                  </button>

                  <button
                    onClick={() => runSieveStep(7)}
                    className="w-full p-2.5 bg-purple-950/30 hover:bg-purple-950/50 border border-purple-500/20 hover:border-purple-500/50 rounded-xl flex items-center justify-between text-purple-200 transition-all font-hand text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <GemIcon value={7} size={28} showNumber={false} animate={false} /> Multiplos del 7
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Cribar 7</span>
                  </button>
                </div>

                <div className="border-t border-stone-800 pt-3">
                  <div className="text-xs text-stone-500 font-mono">
                    ÚLTIMO FILTRO:{" "}
                    <span className="text-amber-500">
                      {activeSieveDivisor ? `Gema ${activeSieveDivisor}` : "Ninguno"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sieve Grid Rendering (Right) */}
              <div className="md:col-span-8 p-5 bg-[#0a111a] border border-emerald-500/10 rounded-2xl shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-emerald-400">Tamiz del 1 al 40</span>
                  <div className="flex gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Prima</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500/40" /> Espera</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#1c2c3e] border border-dashed border-stone-700" /> Deshecho (Polvo)</span>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                  {sieveNumbers.map((num) => {
                    const isNumPrime = isPrime(num.value);
                    const meta = getGemMetadata(num.value);
                    
                    return (
                      <motion.div
                        key={num.value}
                        layout
                        className="relative"
                        style={{ perspective: 600 }}
                      >
                        <AnimatePresence mode="wait">
                          {num.state === "sieved" ? (
                            // Dust / dissolved block representing sand falling through
                            <motion.div
                              key="dissolved"
                              initial={{ opacity: 0.8, scale: 1 }}
                              animate={{ opacity: 0.15, scale: 0.85, rotate: [0, 5, -5, 0] }}
                              className="h-10 border border-dashed border-stone-700/55 text-stone-600 bg-slate-950/20 rounded-lg flex items-center justify-center font-mono text-xs transition-all pointer-events-none"
                            >
                              {num.value}
                            </motion.div>
                          ) : num.state === "prime" ? (
                            // Pure beautiful gem
                            <motion.div
                              key="gem"
                              initial={{ scale: 0.7, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="h-10 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-center relative p-1 cursor-pointer group hover:bg-emerald-900/10"
                              onClick={() => {
                                setInputValue(num.value);
                                setCurrentNum(num.value);
                                setActiveTab("forja");
                              }}
                            >
                              <div className="scale-75">
                                <GemIcon value={num.value} size={32} showNumber={true} animate={false} />
                              </div>
                              <div className="absolute right-1 top-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                            </motion.div>
                          ) : (
                            // Active, waiting state or composite block
                            <motion.div
                              key="waiting"
                              onClick={() => {
                                // If clicked, show details in the Forge!
                                setInputValue(num.value);
                                setCurrentNum(num.value);
                                setActiveTab("forja");
                              }}
                              className="h-10 hover:border-amber-400/50 bg-[#121c27] text-stone-300 border border-stone-800 rounded-lg flex items-center justify-center font-hand font-bold text-lg select-none cursor-pointer transition-colors shadow-inner"
                            >
                              {num.value}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
