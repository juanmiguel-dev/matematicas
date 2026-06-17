import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- GLOSSARY TOOLTIP ---
export const GlossaryTooltip = ({ term, definition, children }: { term: string, definition: string, children: React.ReactNode }) => {
  return (
    <span className="relative inline-block group cursor-help border-b border-dashed border-fuchsia-400/50 hover:border-fuchsia-400 text-fuchsia-300 transition-colors">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="bg-[#11131a] text-slate-200 text-sm p-3 rounded-xl border border-white/10 shadow-2xl">
          <strong className="text-fuchsia-400 block mb-1">{term}</strong>
          {definition}
        </div>
      </div>
    </span>
  );
};

// --- FREQUENCY TO NOTE CALCULATOR ---
export const FreqToNote = () => {
  const [freq, setFreq] = useState<number>(440);
  const A4 = 440;
  const noteNames = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
  
  const getNoteData = (frequency: number) => {
    if (!frequency || frequency <= 0) return { note: "-", cents: 0, octave: 0 };
    const halfStepsFromA4 = 12 * Math.log2(frequency / A4);
    const nearestStep = Math.round(halfStepsFromA4);
    const centsOff = Math.round((halfStepsFromA4 - nearestStep) * 100);
    
    let noteIndex = (9 + nearestStep) % 12;
    if (noteIndex < 0) noteIndex += 12;
    const octave = 4 + Math.floor((9 + nearestStep) / 12);
    
    return {
      note: noteNames[noteIndex],
      cents: centsOff,
      octave
    };
  };

  const data = getNoteData(freq);

  const playFreq = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) { console.warn("Audio blocked"); }
  };

  return (
    <div className="bg-[#11131a] border border-white/5 rounded-3xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold font-serif mb-4 text-slate-200">De Frecuencia a Nota</h3>
      <p className="text-slate-400 text-sm mb-6">El temperamento igual divide la octava en 12 pasos iguales de $\sqrt[12]{2}$.</p>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <label className="text-xs font-mono text-slate-400 mb-2 block uppercase">Frecuencia (Hz)</label>
          <input 
            type="number" 
            value={freq}
            onChange={e => setFreq(Number(e.target.value))}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-2xl font-bold text-fuchsia-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
          />
          <input 
            type="range" min="50" max="2000" 
            value={freq} onChange={e => setFreq(Number(e.target.value))}
            className="w-full mt-4 accent-fuchsia-500"
          />
        </div>
        
        <div className="flex-1 flex items-center justify-center relative w-full h-32 bg-slate-950/50 rounded-2xl border border-white/5">
          <div className="text-center">
            <div className="text-5xl font-black font-serif text-white mb-1">
              {data.note}<span className="text-3xl text-slate-500">{data.octave}</span>
            </div>
            <div className={`text-sm font-mono ${data.cents === 0 ? 'text-emerald-400' : (data.cents > 0 ? 'text-amber-400' : 'text-blue-400')}`}>
              {data.cents === 0 ? "Afinación Perfecta" : `${data.cents > 0 ? '+' : ''}${data.cents} cents`}
            </div>
          </div>
        </div>
        
        <button 
          onClick={playFreq}
          className="w-14 h-14 shrink-0 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] active:scale-95"
        >
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    </div>
  );
};

// --- INTERACTIVE TUNER (COMMA) ---
export const InteractiveTuner = () => {
  const baseFreq = 220; // A3 (220 Hz)
  
  // La Coma Pitagórica es la diferencia entre subir 12 quintas y bajar 7 octavas
  // Frecuencia 1: Nota original (A3)
  const f1 = baseFreq;
  // Frecuencia 2: Nota después de 12 quintas (reduciéndola 7 octavas para compararla con la original)
  const f2 = baseFreq * Math.pow(1.5, 12) * Math.pow(0.5, 7);
  
  const playComparison = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.frequency.value = f1; 
      osc2.frequency.value = f2;
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      // Mantener el sonido durante 6 segundos para que el batido sea bien claro
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 6);
      osc2.stop(ctx.currentTime + 6);
    } catch (e) { console.warn("Audio blocked"); }
  };

  return (
    <div className="bg-[#11131a] border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center mt-8 w-full max-w-md mx-auto relative z-10">
      <h3 className="text-xl font-bold font-serif mb-2 text-slate-200">El Batido de la Coma</h3>
      <p className="text-sm text-slate-400 mb-6">Si afinamos apilando 12 quintas perfectas y regresamos a la octava original, la nota no coincide. Esta pequeñísima diferencia genera un "batido" (wah-wah) rítmico audible.</p>
      
      <div className="flex justify-center gap-4 mb-6 w-full">
        <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 flex-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Nota Base (A3)</div>
          <div className="text-xl font-bold text-white">{f1.toFixed(2)} <span className="text-xs text-slate-500">Hz</span></div>
        </div>
        <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 flex-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Círculo de 12 Quintas</div>
          <div className="text-xl font-bold text-fuchsia-400">{f2.toFixed(2)} <span className="text-xs text-fuchsia-500/50">Hz</span></div>
        </div>
      </div>
      
      <button 
        onClick={playComparison}
        className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(217,70,239,0.3)] active:scale-95"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        Escuchar Disonancia
      </button>
    </div>
  );
};

// --- RHYTHM VISUALIZER ---
export const RhythmVisualizer = () => {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [activeDots3, setActiveDots3] = useState(-1);
  const [activeDots2, setActiveDots2] = useState(-1);

  const toggleRhythm = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      setActiveDots3(-1);
      setActiveDots2(-1);
    } else {
      setPlaying(true);
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      const BPM = 60;
      const beatDuration = 60 / BPM; // 1 second per cycle
      const updateInterval = 50; // ms
      
      let startTime = ctx.currentTime;
      
      intervalRef.current = setInterval(() => {
        const now = ctx.currentTime;
        const elapsed = (now - startTime) % beatDuration;
        const progress = elapsed / beatDuration;
        
        // 3 against 2
        const p3 = Math.floor(progress * 3);
        const p2 = Math.floor(progress * 2);
        
        setActiveDots3(p3);
        setActiveDots2(p2);
      }, updateInterval);
    }
  };
  
  useEffect(() => {
    // Only play sound on boundaries if needed, but it's easier to just visualize strictly
    // and rely on a strict scheduler for audio. For simplicity, we just visualize here.
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-[#11131a] border border-white/5 rounded-3xl p-8 shadow-2xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold font-serif text-slate-200">Polirritmia: 3 contra 2</h3>
          <p className="text-slate-400 text-sm mt-1">El ritmo son fracciones del tiempo. Aquí superponemos $\frac{1}{3}$ y $\frac{1}{2}$.</p>
        </div>
        <button 
          onClick={toggleRhythm}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${playing ? 'bg-slate-800 text-white border border-slate-700' : 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.3)]'}`}
        >
          {playing ? 'Detener' : 'Animar Fracciones'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative h-16 bg-slate-900/50 rounded-xl border border-white/5 flex items-center px-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800 flex items-center justify-center font-bold text-white border-r border-white/10 z-10">3</div>
          <div className="flex-1 flex justify-between ml-12 relative z-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 flex justify-center relative">
                <div className={`w-8 h-8 rounded-full transition-all duration-75 ${activeDots3 === i ? 'bg-fuchsia-500 scale-125 shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-slate-800'}`} />
                {i < 2 && <div className="absolute right-0 top-1/2 w-px h-8 -translate-y-1/2 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-16 bg-slate-900/50 rounded-xl border border-white/5 flex items-center px-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800 flex items-center justify-center font-bold text-white border-r border-white/10 z-10">2</div>
          <div className="flex-1 flex justify-between ml-12 relative z-0">
            {[0, 1].map((i) => (
              <div key={i} className="flex-1 flex justify-center relative">
                <div className={`w-8 h-8 rounded-full transition-all duration-75 ${activeDots2 === i ? 'bg-indigo-500 scale-125 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`} />
                {i < 1 && <div className="absolute right-0 top-1/2 w-px h-8 -translate-y-1/2 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3D CHLADNI PLATE ---
// A custom shader material to simulate cymatics
const ChladniShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: 4 }, // N, M nodes
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uFrequency;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv * 2.0 - 1.0;
      float x = st.x * 3.14159;
      float y = st.y * 3.14159;
      
      // Chladni equation approximation: cos(n*x)*cos(m*y) - cos(m*x)*cos(n*y)
      float n = uFrequency;
      float m = uFrequency * 0.5;
      
      float chladni = cos(n * x) * cos(m * y) - cos(m * x) * cos(n * y);
      
      // Add animated noise/vibration
      float noise = fract(sin(dot(st.xy, vec2(12.9898,78.233)) + uTime) * 43758.5453);
      
      // Enhance the nodal lines (where chladni is close to 0)
      float nodes = smoothstep(0.1, 0.0, abs(chladni));
      
      // Color
      vec3 sandColor = vec3(0.9, 0.8, 0.6);
      vec3 plateColor = vec3(0.05, 0.05, 0.08);
      
      // Mix with noise for sand texture
      vec3 finalColor = mix(plateColor, sandColor, nodes * (0.5 + 0.5 * noise));
      
      // Circular mask
      float mask = step(length(st), 0.98);
      
      gl_FragColor = vec4(finalColor, mask);
    }
  `
};

const ChladniMesh = ({ frequency }: { frequency: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly transition frequency
      materialRef.current.uniforms.uFrequency.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uFrequency.value, 
        frequency, 
        0.05
      );
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]}>
      <circleGeometry args={[2, 64]} />
      <shaderMaterial 
        ref={materialRef}
        args={[ChladniShaderMaterial]} 
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const ChladniPlate3D = ({ activeNodes = 4 }: { activeNodes?: number }) => {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 3, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <ChladniMesh frequency={activeNodes} />
      </Canvas>
    </div>
  );
};
