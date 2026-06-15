import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Box, Hexagon, Layers, ZoomIn } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Edges, Text } from '@react-three/drei';
import * as THREE from 'three';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center relative py-20 px-6 ${className}`}>
    {children}
  </section>
);

// --- 3D Components ---

// Glass material for cubes
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#e2f8ff',
  transmission: 0.9,
  opacity: 1,
  metalness: 0,
  roughness: 0.1,
  ior: 1.5,
  thickness: 0.5,
  side: THREE.DoubleSide,
  transparent: true
});

const solidMaterial = new THREE.MeshStandardMaterial({
  color: '#dfca88',
  roughness: 0.3,
  metalness: 0.1
});

// A single unit cube
const UnitCube = ({ position, isHighlight = false, scale = 1 }: { position: [number, number, number], isHighlight?: boolean, scale?: number }) => (
  <mesh position={position} scale={scale} material={isHighlight ? solidMaterial : glassMaterial}>
    <boxGeometry args={[0.95, 0.95, 0.95]} />
    <Edges linewidth={1} threshold={15} color={isHighlight ? "#b0953a" : "#8ab4f8"} />
  </mesh>
);

// 1. Prisma 3D (2x3x5 = 30)
const Prisma3D = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const cubes = [];
  // 2 width (x), 5 height (y), 3 depth (z)
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 5; y++) {
      for (let z = 0; z < 3; z++) {
        // Center the grid
        const posX = x - 0.5;
        const posY = y - 2;
        const posZ = z - 1;
        cubes.push(
          <UnitCube 
            key={`3d-${x}-${y}-${z}`} 
            position={[posX, posY, posZ]} 
            isHighlight={y === 2} // Highlight the middle layer
          />
        );
      }
    }
  }

  return <group ref={group}>{cubes}</group>;
};

// 2. Tesseracto 4D Exploded View (5 layers of 2x3x5)
const Tesseracto4D = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  const layers = [];
  // 5 distinct 3D prisms stacked with gaps (Eje W)
  for (let w = 0; w < 5; w++) {
    const wOffset = (w - 2) * 6; // Spacing between layers
    
    const layerCubes = [];
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < 3; z++) {
          const posX = x - 0.5;
          const posY = y - 2 + wOffset;
          const posZ = z - 1;
          layerCubes.push(
             <UnitCube 
               key={`4d-${w}-${x}-${y}-${z}`} 
               position={[posX, posY, posZ]} 
               isHighlight={w % 2 === 1} // Alternate layer colors
             />
          );
        }
      }
    }
    layers.push(
      <group key={`layer-${w}`}>
        {layerCubes}
        <Text position={[2.5, wOffset, 0]} fontSize={0.8} color="#555" anchorX="left" anchorY="middle">
          W = {w + 1}
        </Text>
      </group>
    );
  }

  return <group ref={group} scale={0.4}>{layers}</group>;
};

// 3. Hipercubo 6D Exploded View (64 cubes -> 8 blocks of 2x2x2)
const Hipercubo6D = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.05;
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const blocks = [];
  // 8 corners of a larger cube
  const positions = [
    [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
    [-1, -1, 1],  [1, -1, 1],  [-1, 1, 1],  [1, 1, 1]
  ];

  positions.forEach((pos, i) => {
    const blockCubes = [];
    // 2x2x2 = 8 cubes per block
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let z = 0; z < 2; z++) {
           blockCubes.push(
             <UnitCube 
               key={`6d-${i}-${x}-${y}-${z}`} 
               position={[x - 0.5, y - 0.5, z - 0.5]}
               isHighlight={i === 0 || i === 7} // Highlight some blocks
             />
           );
        }
      }
    }
    blocks.push(
      <Float key={`block-${i}`} speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[pos[0] * 3, pos[1] * 3, pos[2] * 3]}>
          {blockCubes}
        </group>
      </Float>
    );
  });

  return <group ref={group} scale={0.6}>{blocks}</group>;
};


export default function GeometriaDimensional() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-100 text-slate-900 overflow-x-hidden font-sans relative">
      
      {/* Blueprint Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.2)_1px,transparent_1px)] bg-[size:200px_200px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-sky-100 shadow-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <div className="flex items-center gap-2 text-sky-700">
          <Hexagon className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Hiperespacio</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* SLIDE 1: Hero */}
        <Section className="items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-xl border border-white"
          >
            <div className="inline-flex items-center justify-center p-4 bg-sky-50 rounded-2xl mb-8 text-sky-600">
              <Box className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 font-sans text-slate-800 leading-tight">
              Geometría <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Dimensional</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light tracking-wide leading-relaxed">
              Interactúa con las representaciones topológicas 3D, 4D y 6D de la factorización prima. Gira las figuras con tu cursor.
            </p>
          </motion.div>
        </Section>

        {/* SLIDE 2: 3D */}
        <Section>
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white/60 backdrop-blur-sm rounded-[3rem] p-8 lg:p-12 shadow-lg border border-white h-auto lg:h-[80vh]">
             <div className="flex-1 space-y-8 w-full">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-bold text-sm uppercase tracking-widest">
                 Dimensión 3
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-slate-800">Prisma 3D</h2>
               <p className="text-xl text-slate-600 leading-relaxed font-light">
                 Representación del volumen físico tradicional. Sus factores primos conforman las dimensiones espaciales.
               </p>
               <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-slate-800 mb-2">30 Cubos Unitarios</div>
                 <div className="text-lg text-slate-500 font-mono">Volumen = (2 × 3) × 5</div>
                 <div className="text-sm text-slate-400 mt-2">Base: 2x3 = 6. Altura: 5 capas.</div>
               </div>
               <p className="text-sky-600 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> Puedes rotar la figura con el mouse.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[400px] lg:h-full bg-slate-900/5 rounded-3xl overflow-hidden cursor-move border border-slate-200/50 shadow-inner">
               <Canvas camera={{ position: [6, 4, 8], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                 <Environment preset="city" />
                 <Prisma3D />
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
               </Canvas>
             </div>
          </div>
        </Section>

        {/* SLIDE 3: 4D */}
        <Section>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 bg-white/60 backdrop-blur-sm rounded-[3rem] p-8 lg:p-12 shadow-lg border border-white h-auto lg:h-[80vh]">
             <div className="flex-1 space-y-8 w-full">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm uppercase tracking-widest">
                 Dimensión 4
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-slate-800">Tesseracto 4D</h2>
               <p className="text-xl text-slate-600 leading-relaxed font-light">
                 Transición a la cuarta dimensión a través del eje W. Vista "Exploded View" de la extrusión 4D.
               </p>
               <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-slate-800 mb-2">150 Hipercubos</div>
                 <div className="text-lg text-slate-500 font-mono">Hipervolumen = (2 × 3 × 5) × 5</div>
                 <div className="text-sm text-slate-400 mt-2">Extrusión en W: +5 capas adicionales sobre el prisma 3D.</div>
               </div>
               <p className="text-amber-600 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> Explora las capas deslizando el mouse.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[500px] lg:h-full bg-slate-900/5 rounded-3xl overflow-hidden cursor-move border border-slate-200/50 shadow-inner">
               <Canvas camera={{ position: [15, 5, 20], fov: 45 }}>
                 <ambientLight intensity={0.6} />
                 <pointLight position={[10, 10, 10]} intensity={1} />
                 <Environment preset="studio" />
                 <Tesseracto4D />
                 <OrbitControls enableZoom={true} minDistance={10} maxDistance={40} />
               </Canvas>
             </div>
          </div>
        </Section>

        {/* SLIDE 4: 6D */}
        <Section>
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-slate-700 h-auto lg:h-[80vh]">
             <div className="flex-1 space-y-8 w-full">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-indigo-300 font-bold text-sm uppercase tracking-widest border border-indigo-700">
                 Dimensión 6
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-white">Hipercubo 6D</h2>
               <p className="text-xl text-slate-300 leading-relaxed font-light">
                 Visualización del Hesseracto (6D). El espacio geométrico necesario para representar 6 factores primos puros.
               </p>
               <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-white mb-2">64 Células Unitarias</div>
                 <div className="text-lg text-indigo-300 font-mono">2⁶ = 2 × 2 × 2 × 2 × 2 × 2</div>
                 <div className="text-sm text-slate-400 mt-2">8 Bloques Cúbicos (2x2 Tesseractos).</div>
               </div>
               <p className="text-indigo-400 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> La proyección abstracta reacciona a la cámara.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[500px] lg:h-full bg-black/50 rounded-3xl overflow-hidden cursor-move border border-slate-800 shadow-inner">
               <Canvas camera={{ position: [12, 8, 15], fov: 50 }}>
                 <color attach="background" args={['#0f172a']} />
                 <ambientLight intensity={0.2} />
                 <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={2} color="#a5b4fc" />
                 <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#fbbf24" />
                 <Hipercubo6D />
                 <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={true} />
               </Canvas>
             </div>
          </div>
        </Section>
        
      </main>
    </div>
  );
}
