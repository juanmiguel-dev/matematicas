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
import { Sparkles, Key, HelpCircle, Activity, Undo2, Play, GitBranch } from "lucide-react";

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
  const [activeSieveDivisor, setActiveSieveDivisor] = useState<number | null>(null);

  useEffect(() => {
    setTreeData(buildFactorTree(currentNum));
    setIsUnlocked(false);
  }, [currentNum]);

  const handleForgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Math.min(Math.max(2, inputValue), 1000);
    setInputValue(val);
    setCurrentNum(val);
  };

  const presets = [12, 30, 60, 210, 84, 100, 313];

  const initSieve = () => {
    const list = [];
    for (let i = 1; i <= 40; i++) {
      list.push({ value: i, state: "active" as const });
    }
    setSieveNumbers(list);
    setActiveSieveDivisor(null);
  };

  useEffect(() => { initSieve(); }, []);

  const runSieveStep = (divisor: number) => {
    setActiveSieveDivisor(divisor);
    setSieveNumbers(prev =>
      prev.map(item => {
        if (item.value === 1) return { ...item, state: "sieved" as const };
        if (item.value === divisor) return { ...item, state: "prime" as const };
        if (item.value % divisor === 0 && item.value > divisor) return { ...item, state: "sieved" as const };
        return item;
      })
    );
  };

  const markAllPrimes = () => {
    setSieveNumbers(prev =>
      prev.map(item => {
        if (item.value > 1 && isPrime(item.value)) return { ...item, state: "prime" as const };
        return { ...item, state: "sieved" as const };
      })
    );
  };

  const startUnlockSequence = () => {
    if (isUnlocked) { setIsUnlocked(false); return; }
    setUnlockAnimating(true);
    setTimeout(() => { setUnlockAnimating(false); setIsUnlocked(true); }, 1800);
  };

  const isSelectedPrime = isPrime(currentNum);
  const flatFactors = getPrimeFactorsFlat(currentNum);
  const exponentsFactors = getPrimeFactorsExponents(currentNum);

  const renderTreeSvg = (node: FactorNode, x: number, y: number, offset: number): React.ReactNode => {
    const childY = y + 80;
    const leftX = x - offset;
    const rightX = x + offset;

    return (
      <g key={`${node.value}-${x}-${y}`}>
        {node.left && node.right && (
          <>
            <path
              d={`M ${x} ${y + 25} Q ${(x + leftX) / 2} ${(y + childY) / 2 - 15} ${leftX} ${childY - 20}`}
              fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"
            />
            <path
              d={`M ${x} ${y + 25} Q ${(x + rightX) / 2} ${(y + childY) / 2 - 15} ${rightX} ${childY - 20}`}
              fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"
            />
            <circle cx={(x + leftX) / 2 - 10} cy={(y + childY) / 2} r="3" className="fill-emerald-400 opacity-60" />
            <circle cx={(x + rightX) / 2 + 10} cy={(y + childY) / 2} r="3" className="fill-emerald-400 opacity-60" />
            {renderTreeSvg(node.left, leftX, childY, Math.max(25, offset * 0.5))}
            {renderTreeSvg(node.right, rightX, childY, Math.max(25, offset * 0.5))}
          </>
        )}
        <g transform={`translate(${x - 24}, ${y - 24})`}>
          <foreignObject width="48" height="48">
            <div className="w-full h-full flex items-center justify-center">
              {node.isPrime ? (
                <GemIcon value={node.value} size={38} showNumber={true} animate={true} />
              ) : (
                <div
                  onClick={() => setCurrentNum(node.value)}
                  className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  title="Clic para inspeccionar este número"
                >
                  <span className="text-white font-bold text-sm">{node.value}</span>
                </div>
              )}
            </div>
          </foreignObject>
        </g>
      </g>
    );
  };

  return (
    <div id="interactive-taller" className="w-full relative py-10 px-4 md:px-8 bg-white rounded-3xl border border-slate-100 card-shadow-md">

      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Laboratorio Interactivo</span>
        </div>
        <h2 className="text-2xl md:text-3xl text-center font-bold text-slate-800">
          El Taller del Arquitecto
        </h2>
        <p className="text-slate-500 text-center text-base mt-2 max-w-xl">
          ¡Jugá con las joyas matemáticas, descubrí el secreto adentro de cada número y encontrá los primos escondidos con el colador mágico!
        </p>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 mt-6 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("forja")}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === "forja"
                ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            ✧ La Forja de Fórmulas
          </button>
          <button
            onClick={() => setActiveTab("tamiz")}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === "tamiz"
                ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            ✧ El Tamiz de Arena
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: FORJA */}
        {activeTab === "forja" && (
          <motion.div
            key="forja-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left: controls */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Input */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-base font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-amber-500">❖</span> Elige un Número
                </h3>
                <form onSubmit={handleForgeSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Valor (2 al 1000)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="2"
                        max="1000"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseInt(e.target.value) || 2)}
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-mono text-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold flex items-center gap-2 text-sm transition-all shadow-sm"
                      >
                        <Play className="w-4 h-4 fill-current" /> Forjar
                      </button>
                    </div>
                  </div>
                </form>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Preajustes:</span>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setInputValue(p); setCurrentNum(p); }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all ${
                          currentNum === p
                            ? "bg-amber-100 border-amber-300 text-amber-700 font-semibold"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Characterization */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">ADN del Número</span>
                    <h3 className="text-xl font-bold text-slate-800">Número {currentNum}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                    isSelectedPrime
                      ? "bg-violet-50 text-violet-600 border-violet-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>
                    {isSelectedPrime ? "✦ Gema Pura" : "❖ Compuesto"}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {isSelectedPrime
                    ? `El número ${currentNum} es indivisible. Es una de las gemas básicas del Arquitecto.`
                    : `El número ${currentNum} es una aleación formada por la fusión de ${flatFactors.length} gemas primas.`
                  }
                </p>
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {isSelectedPrime ? "Su Singularidad" : "Receta de ADN Cósmico"}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-xl font-bold text-slate-800">{currentNum}</span>
                    <span className="text-slate-400 text-lg font-mono">=</span>
                    {isSelectedPrime ? (
                      <div className="flex items-center gap-2">
                        <GemIcon value={currentNum} size={38} showNumber={false} animate={true} />
                        <span className="text-violet-600 font-medium text-sm">({getGemMetadata(currentNum).name})</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        {flatFactors.map((factor, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <span className="text-slate-400 font-mono text-lg">×</span>}
                            <div className="relative group">
                              <GemIcon value={factor} size={34} showNumber={true} animate={false} />
                              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-800 text-white text-xs rounded-lg py-1 px-2 z-50 whitespace-nowrap shadow-lg">
                                {getGemMetadata(factor).name}
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                  {!isSelectedPrime && (
                    <div className="text-xs font-mono text-slate-400 flex gap-3 pl-1">
                      <span className="font-semibold">CÓDIGO:</span>
                      <span className="text-amber-600 font-semibold">
                        {exponentsFactors.map((f, idx) => (
                          <React.Fragment key={f.prime}>
                            {idx > 0 && " · "}
                            <span>{f.prime}<sup>{f.exponent}</sup></span>
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: visualization */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 min-h-[460px] flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <GitBranch className="w-3.5 h-3.5 text-slate-400" /> El Árbol de Raíces
                </div>
                <div className="text-center pt-1 pb-3">
                  <h4 className="text-slate-500 text-sm font-medium">
                    {isSelectedPrime ? "Visualización de la Piedra Angular" : "Descubriendo las Raíces Cósmicas"}
                  </h4>
                </div>
                <div className="flex-1 flex flex-col lg:flex-row items-center justify-around gap-5 min-h-[300px]">
                  
                  {/* Factor tree */}
                  <div className="w-full max-w-[360px] flex items-center justify-center bg-white rounded-2xl p-4 border border-slate-200">
                    <svg width="340" height="280" className="overflow-visible">
                      {treeData ? renderTreeSvg(treeData, 170, 40, 75) : (
                        <text x="170" y="140" fill="#94a3b8" textAnchor="middle">Cargando...</text>
                      )}
                    </svg>
                  </div>

                  {/* Padlock */}
                  <div className="flex flex-col items-center justify-center p-5 bg-white border border-slate-200 rounded-2xl w-full max-w-[260px] space-y-4">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Caja de Seguridad</span>
                    <div className="relative flex items-center justify-center h-44 w-full">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
                      <motion.div
                        animate={{ scale: isUnlocked ? [1, 1.05, 1] : 1, rotate: unlockAnimating ? [0, -6, 6, -6, 6, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center justify-center"
                      >
                        <div className={`w-14 h-16 rounded-t-full border-4 ${
                          isUnlocked ? "translate-y-[-14px] border-amber-400" : "border-slate-400"
                        } border-b-0 transition-transform duration-500`} />
                        <div className={`w-24 h-20 -mt-1 rounded-2xl flex flex-col items-center justify-center relative p-3 shadow-md transition-all duration-500 ${
                          isUnlocked ? "bg-amber-400 border-2 border-amber-300" : "bg-slate-200 border-2 border-slate-300"
                        }`}>
                          <div className="absolute inset-2 border border-white/40 rounded-lg pointer-events-none" />
                          <span className={`text-2xl font-bold ${isUnlocked ? "text-white" : "text-slate-600"}`}>
                            {currentNum}
                          </span>
                          <div className={`w-4 h-6 mt-1.5 rounded-full ${isUnlocked ? "bg-amber-600" : "bg-slate-400"} flex flex-col items-center justify-start py-1`}>
                            <div className="w-2 h-2 bg-white/70 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                      <AnimatePresence>
                        {!isUnlocked && !unlockAnimating && (
                          <motion.div
                            initial={{ opacity: 0, x: 50, rotate: -25 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: -60, y: -20, rotate: -45 }}
                            className="absolute right-0 bottom-4 z-20 cursor-pointer group"
                            onClick={startUnlockSequence}
                          >
                            <div className="relative p-2 bg-white rounded-xl border border-amber-200 flex items-center shadow-sm hover:border-amber-400 hover:shadow-md active:scale-95 transition-all">
                              <div className="w-7 h-7 rounded-full border-2 border-amber-400 flex items-center justify-center mr-1">
                                <div className="w-3 h-3 rounded-full bg-amber-100" />
                              </div>
                              <div className="h-2 w-14 bg-gradient-to-r from-amber-400 to-amber-300 flex items-center justify-around pr-1 relative">
                                <div className="absolute inset-0 flex items-center justify-between px-2">
                                  {[...new Set(flatFactors)].slice(0, 4).map((f, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: getGemMetadata(f).color }} />
                                  ))}
                                </div>
                              </div>
                              <div className="w-3 h-4 flex flex-col justify-end">
                                <div className="w-2 h-1.5 bg-amber-300 rounded-sm" />
                                <div className="w-1.5 h-1.5 bg-amber-300 rounded-sm mt-0.5" />
                              </div>
                            </div>
                            <span className="text-[10px] text-amber-500 font-medium text-center block mt-1 animate-pulse">▲ Clic para abrir</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={startUnlockSequence}
                      className={`w-full py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                        isUnlocked
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                          : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                      }`}
                    >
                      {isUnlocked ? <>🗏 Volver a Cerrar</> : <><Key className="w-4 h-4" /> Desarmar con la Llave</>}
                    </button>
                  </div>
                </div>

                {/* Hint */}
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 mt-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {isSelectedPrime
                      ? "Este es una gema pura. Las raíces no pueden dividirse más."
                      : "Hacé clic en cualquier piedra numérica en el Árbol para enfocar el taller en ese sub-núcleo."
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TAMIZ */}
        {activeTab === "tamiz" && (
          <motion.div
            key="tamiz-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Intro */}
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-emerald-800">El Tamiz Mágico: Filtrando Compuestos</h3>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Vertí los números por la malla mágica. Al cribar por los múltiplos de cada primo, los compuestos se desintegrarán.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={initSieve}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Undo2 className="w-4 h-4" /> Reiniciar
                </button>
                <button
                  onClick={markAllPrimes}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" /> Revelar Todo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              
              {/* Controls */}
              <div className="md:col-span-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Paso a Paso</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Seleccioná una gema prima. Todos sus múltiplos (excepto ella misma) se disolverán.
                </p>
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Cribar por múltiplos de:</span>
                  {[
                    { p: 2, bg: "bg-red-50", border: "border-red-200", text: "text-red-700", hover: "hover:bg-red-100" },
                    { p: 3, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", hover: "hover:bg-blue-100" },
                    { p: 5, bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", hover: "hover:bg-emerald-100" },
                    { p: 7, bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", hover: "hover:bg-violet-100" },
                  ].map(({ p, bg, border, text, hover }) => (
                    <button
                      key={p}
                      onClick={() => runSieveStep(p)}
                      className={`w-full p-2.5 ${bg} ${hover} border ${border} rounded-xl flex items-center justify-between ${text} transition-all font-medium text-sm`}
                    >
                      <span className="flex items-center gap-2">
                        <GemIcon value={p} size={26} showNumber={false} animate={false} /> Múltiplos del {p}
                      </span>
                      <span className="text-xs font-mono opacity-60">Cribar {p}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Último filtro: <span className="text-amber-600">{activeSieveDivisor ? `Gema ${activeSieveDivisor}` : "Ninguno"}</span>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="md:col-span-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tamiz del 1 al 40</span>
                  <div className="flex gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Prima</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-300" /> Activa</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded border border-dashed border-slate-300 bg-slate-100" /> Deshecho</span>
                  </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5">
                  {sieveNumbers.map((num) => (
                    <motion.div key={num.value} layout className="relative" style={{ perspective: 600 }}>
                      <AnimatePresence mode="wait">
                        {num.state === "sieved" ? (
                          <motion.div
                            key="dissolved"
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ opacity: 0.2, scale: 0.88 }}
                            className="h-10 border border-dashed border-slate-200 text-slate-300 bg-slate-50 rounded-lg flex items-center justify-center font-mono text-xs pointer-events-none"
                          >
                            {num.value}
                          </motion.div>
                        ) : num.state === "prime" ? (
                          <motion.div
                            key="gem"
                            initial={{ scale: 0.7, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="h-10 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center relative p-1 cursor-pointer hover:bg-emerald-100 transition-colors"
                            onClick={() => { setInputValue(num.value); setCurrentNum(num.value); setActiveTab("forja"); }}
                          >
                            <div className="scale-75">
                              <GemIcon value={num.value} size={30} showNumber={true} animate={false} />
                            </div>
                            <div className="absolute right-1 top-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="waiting"
                            onClick={() => { setInputValue(num.value); setCurrentNum(num.value); setActiveTab("forja"); }}
                            className="h-10 hover:border-amber-300 hover:bg-amber-50 bg-white text-slate-600 border border-slate-200 rounded-lg flex items-center justify-center font-bold text-sm select-none cursor-pointer transition-all shadow-sm"
                          >
                            {num.value}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
