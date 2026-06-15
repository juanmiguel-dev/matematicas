import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Binary, ArrowLeft, BookOpen, Fingerprint, Sparkles, Infinity, Hexagon } from 'lucide-react';
import { lexiconData } from '../data/lexiconData';

export default function Lexicon() {
  const getIconForConcept = (id: string) => {
    switch (id) {
      case 'cero':
      case 'unidad':
      case 'numero-siete':
      case 'numero-aureo':
      case 'angulo-aureo':
      case 'constante-estructura-fina':
        return <Infinity className="w-5 h-5" />;
      case 'p-polinomicos':
      case 'np-no-determinista':
      case 'barrera-p-vs-np':
      case 'resolucion-js':
        return <Hexagon className="w-5 h-5" />;
      case 'numeros-primos':
      case 'numeros-compuestos':
        return <Fingerprint className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans relative pb-24">
      {/* Background decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 sticky top-0 bg-slate-950/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Binary className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            MATEMATIKAS
          </span>
        </Link>
        <div className="flex items-center gap-2 text-indigo-400">
          <BookOpen className="w-5 h-5" />
          <span className="font-semibold tracking-wide uppercase text-sm">Glosario Cósmico</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16">
        <div className="max-w-3xl mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver al Inicio
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            Las Leyes de la <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Creación
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 leading-relaxed"
          >
            Explora los conceptos fundamentales que rigen el universo de MATEMATIKAS. Desde la barrera ontológica de la creación hasta los armónicos base del vacío.
          </motion.p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {lexiconData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 + 0.2, duration: 0.4 }}
              className="break-inside-avoid relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-indigo-400 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300">
                    {getIconForConcept(item.id)}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Fórmula / Valor</span>
                  <div className="font-mono text-sm text-amber-300 bg-black/30 rounded-lg p-2.5 break-all border border-black/50 shadow-inner">
                    {item.formula}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Descripción</span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Características</span>
                    <p className="text-sm text-indigo-200/80 leading-relaxed">
                      {item.characteristics}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Significado / Relación</span>
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      {item.meaning}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
