import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, ArrowRight, Binary, BookOpen, Cpu, Radio } from 'lucide-react';

export default function Matematikas() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Binary className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            MATEMATIKAS
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Explora el universo de los números</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] mb-6">
              Descubre la <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                belleza oculta
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Bienvenido a MATEMATIKAS, un espacio interactivo diseñado para revelar los secretos de los números, la geometría y la lógica a través de experiencias inmersivas.
            </p>
          </motion.div>
        </div>

        {/* Modules Grid */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
              Módulos Disponibles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Taller Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/numeros-primos" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="font-bold text-white text-2xl">7</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    Números Primos
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-2">
                    Descubre el Teorema Fundamental de la Aritmética construyendo números compuestos a partir de sus bloques fundamentales: los números primos.
                  </p>
                  
                  <div className="flex items-center text-amber-400 font-medium group-hover:gap-2 transition-all">
                    <span>Ingresar al taller</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Lexicon Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/lexicon" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    Las Leyes de la Creación
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    Explora el glosario cósmico: desde la barrera P vs NP, el número áureo y la constante de estructura fina, hasta la distinción entre el uno y el cero.
                  </p>
                  
                  <div className="flex items-center text-indigo-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Explorar conceptos</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Codigo Maquina Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/codigo-maquina" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                    El Código Máquina
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    Adéntrate en el hardware cuántico del reino. Explora la omnipresencia empírica de Φ y el armónico base del vacío.
                  </p>
                  
                  <div className="flex items-center text-teal-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Iniciar secuencia</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Gematria Vibracional Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link 
                to="/gematria-vibracional" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    Gematría Vibracional
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    Los números no son invenciones, son frecuencias fundamentales. Explora la Trilogía del Sistema y el hardware detrás de la creación.
                  </p>
                  
                  <div className="flex items-center text-blue-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Sintonizar frecuencia</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
