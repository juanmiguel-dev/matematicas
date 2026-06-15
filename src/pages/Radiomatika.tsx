import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2, Radio, Disc3 } from 'lucide-react';

// Import audio files
import audio1 from '../radiomatika/Cuánto_pesa_el_libre_albedrío.mp3';
import audio2 from '../radiomatika/Los_números_como_frecuencias_de_la_realidad.mp3';
import audio3 from '../radiomatika/Phi_y_el_código_fuente_del_universo.mp3';

const playlist = [
  { id: 1, title: 'Cuánto pesa el libre albedrío', src: audio1, duration: '08:21', color: 'from-amber-400 to-orange-600' },
  { id: 2, title: 'Los números como frecuencias de la realidad', src: audio2, duration: '10:37', color: 'from-indigo-400 to-purple-600' },
  { id: 3, title: 'Phi y el código fuente del universo', src: audio3, duration: '10:15', color: 'from-teal-400 to-emerald-600' },
];

export default function Radiomatika() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const playSpecificTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const activeTrack = playlist[currentTrack];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 overflow-x-hidden font-sans relative selection:bg-indigo-500/30">
      
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          className={`w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 bg-gradient-to-tr ${activeTrack.color} transition-colors duration-1000`}
          animate={{
            scale: isPlaying ? [1, 1.2, 1] : 1,
            opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
        <div className="flex items-center gap-2 text-slate-300">
          <Radio className="w-5 h-5 text-indigo-400" />
          <span className="font-bold tracking-widest uppercase">Radiomatika</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row gap-16 items-center lg:items-start min-h-screen">
        
        {/* Left: Player Disc & Visualizer */}
        <div className="flex-1 w-full flex flex-col items-center justify-center mt-10">
          <div className="relative group perspective-1000">
            {/* Spinning Disc */}
            <motion.div 
              className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr ${activeTrack.color} p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center relative overflow-hidden">
                {/* Grooves */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute rounded-full border border-white/5" style={{ width: `${100 - i * 15}%`, height: `${100 - i * 15}%` }} />
                ))}
                {/* Center Label */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${activeTrack.color} flex items-center justify-center shadow-inner`}>
                  <div className="w-6 h-6 rounded-full bg-[#111] border-2 border-black/50" />
                </div>
                {/* Holographic reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rotate-45 pointer-events-none" />
              </div>
            </motion.div>
            
            {/* Play/Pause overlay for disc */}
            <button 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="w-16 h-16 text-white" /> : <Play className="w-16 h-16 text-white ml-2" />}
            </button>
          </div>

          {/* Visualizer Bars (Fake but beautiful) */}
          <div className="flex items-end gap-1.5 h-16 mt-12 w-full max-w-[250px] justify-center">
            {[...Array(16)].map((_, i) => (
              <motion.div 
                key={i}
                className={`w-2 md:w-3 rounded-full bg-gradient-to-t ${activeTrack.color}`}
                initial={{ height: 4 }}
                animate={{ 
                  height: isPlaying ? [4, Math.random() * 40 + 10, 4] : 4,
                  opacity: isPlaying ? 1 : 0.3
                }}
                transition={{ 
                  duration: 0.5 + Math.random() * 0.5, 
                  repeat: Infinity, 
                  repeatType: "mirror",
                  delay: i * 0.05
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: Controls & Playlist */}
        <div className="flex-1 w-full flex flex-col">
          <div className="mb-10 text-center lg:text-left">
            <motion.div 
              key={activeTrack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400 mb-6 uppercase tracking-widest border border-white/10"
            >
              <Disc3 className="w-3 h-3" /> Pista {activeTrack.id} de {playlist.length}
            </motion.div>
            <motion.h1 
              key={`title-${activeTrack.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-black mb-4 leading-tight"
            >
              {activeTrack.title}
            </motion.h1>
            <p className="text-slate-400 text-lg">Trilogía del Reino</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 group">
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer hover:bg-slate-700 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
              style={{
                backgroundSize: `${(progress / (duration || 100)) * 100}% 100%`,
                backgroundImage: 'linear-gradient(white, white)',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="flex justify-between mt-2 text-xs font-mono text-slate-500">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center lg:justify-start gap-6 mb-12">
            <button onClick={prevTrack} className="p-3 text-slate-400 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <button 
              onClick={togglePlay} 
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${activeTrack.color} hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
            <button onClick={nextTrack} className="p-3 text-slate-400 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
            <div className="ml-4 p-3 text-slate-500 flex items-center gap-2 hidden sm:flex">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-bold text-slate-500 mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4" /> Emisiones Disponibles
            </h3>
            {playlist.map((track, index) => (
              <div 
                key={track.id}
                onClick={() => playSpecificTrack(index)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
                  currentTrack === index 
                    ? `bg-white/10 border-white/20 shadow-sm` 
                    : `bg-transparent border-transparent hover:bg-white/5`
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    currentTrack === index ? `bg-gradient-to-tr ${track.color} text-white` : 'bg-slate-900 text-slate-500'
                  }`}>
                    {currentTrack === index && isPlaying ? (
                       <motion.div className="flex gap-0.5 items-end h-4">
                         {[1,2,3].map(i => (
                           <motion.div key={i} className="w-1 bg-white rounded-t" animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.1 }} />
                         ))}
                       </motion.div>
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${currentTrack === index ? 'text-white' : 'text-slate-300'}`}>{track.title}</h4>
                  </div>
                </div>
                <div className="text-sm font-mono text-slate-500">{track.duration}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
