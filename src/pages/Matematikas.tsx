import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, BookOpen, ArrowRight, Box, Radio, Cpu, Split, Music, Binary, Layers } from 'lucide-react';
import { MatematikaLogo } from '../components/MatematikaLogo';

export default function Matematikas() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <MatematikaLogo />
        <div className="flex items-center gap-4">
          <Link to="/radiomatika" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold text-indigo-300">
            <Radio className="w-4 h-4" /> RADIOMATIKA
          </Link>
        </div>
      </header>

      {/* Hero Section & Modules Grid */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Title Header (Spans 2 columns on Desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-center items-center text-center mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                Descubre la <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  belleza oculta
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto">
                Bienvenido a MATEMATIKAS, un espacio interactivo para revelar los secretos de los números, geometría y lógica.
              </p>
            </motion.div>
          </div>
            {/* Taller Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/numeros-primos" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    Números Primos
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    Descubre el Teorema Fundamental de la Aritmética construyendo números compuestos a partir de sus bloques fundamentales: los números primos.
                  </p>
                  
                  <div className="flex items-center text-amber-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Ingresar al taller</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Geometria Dimensional Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/geometria-dimensional" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Box className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    Geometría Dimensional
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    Interactúa con prismas 3D, tesseractos 4D y proyecciones de hipercubos 6D. La topología matemática de la creación.
                  </p>
                  
                  <div className="flex items-center text-sky-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Entrar al hiperespacio</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Matematicas Musicales Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/matematicas-musicales" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-300 transition-colors">
                    Matemáticas Musicales
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    La arquitectura oculta de la armonía. Explora el Monocordio de Pitágoras, la Proporción Áurea en el piano y la cimática del sonido.
                  </p>
                  
                  <div className="flex items-center text-fuchsia-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Escuchar armónicos</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Lexicon Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
              transition={{ duration: 0.5, delay: 0.6 }}
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
              transition={{ duration: 0.5, delay: 0.7 }}
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

            {/* P vs NP Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                to="/p-vs-np" 
                className="group block relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f2f1eb]/20 to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Split className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    P vs NP
                  </h3>
                  <p className="text-slate-400 mb-8 line-clamp-3">
                    El Santo Grial de la computación define el alma del universo. Descubre la física de la conciencia y el Libre Albedrío.
                  </p>
                  
                  <div className="flex items-center text-amber-400 font-medium group-hover:gap-2 transition-all mt-auto">
                    <span>Cuestionar la realidad</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
        </div>
      </main>
    </div>
  );
}
