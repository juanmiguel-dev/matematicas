import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Box, Hexagon, Layers, ZoomIn } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Edges, Text, Line } from '@react-three/drei';
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

// 4. Primos Fundamentales 3D (2, 3, 5, 7, 11)
const PrimosFundamentales3D = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  const primes = [
    { num: 2, color: "#ef4444", pos: [-8, 0, 0], desc: "Línea (1D)", segments: 2 },
    { num: 3, color: "#f97316", pos: [-4, 0, 0], desc: "Triángulo", segments: 3 },
    { num: 5, color: "#eab308", pos: [0, 0, 0], desc: "Pentágono", segments: 5 },
    { num: 7, color: "#10b981", pos: [4, 0, 0], desc: "Heptágono", segments: 7 },
    { num: 11, color: "#3b82f6", pos: [8, 0, 0], desc: "Hendecágono", segments: 11 }
  ];

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.7}>
      {primes.map((p, i) => (
        <Float key={p.num} speed={2} rotationIntensity={1.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
          <group position={p.pos as [number, number, number]}>
            {/* 3D Extruded Shape */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              {p.segments === 2 ? (
                 <cylinderGeometry args={[0.2, 0.2, 2.5, 16]} />
              ) : (
                 <cylinderGeometry args={[1.2, 1.2, 0.5, p.segments]} />
              )}
              <meshPhysicalMaterial 
                color={p.color} 
                emissive={p.color}
                emissiveIntensity={0.2}
                transmission={0.5} 
                opacity={0.9} 
                roughness={0.1}
                metalness={0.3}
                ior={1.5}
                transparent={true}
              />
            </mesh>
            {/* Outline wireframe for better shape definition */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              {p.segments === 2 ? (
                 <cylinderGeometry args={[0.2, 0.2, 2.5, 16]} />
              ) : (
                 <cylinderGeometry args={[1.2, 1.2, 0.5, p.segments]} />
              )}
              <meshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.3} />
            </mesh>
            
            {/* Prime Number Text */}
            <Text position={[0, 0, 2]} fontSize={1.2} color="#fff" fontWeight="bold">
              {p.num}
            </Text>
            {/* Prime Description Text */}
            <Text position={[0, -2.2, 0]} fontSize={0.4} color={p.color} letterSpacing={0.1}>
              {p.desc}
            </Text>
          </group>
        </Float>
      ))}
      <gridHelper args={[30, 30, '#475569', '#1e293b']} position={[0, -4, 0]} />
    </group>
  );
};

// 4.5 Tarjeta Individual Fundamental
const FundamentalCard = ({ num, color, desc, segments, name }: { num: number, color: string, desc: string, segments: number, name: string }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-[2rem] p-6 shadow-xl flex flex-col h-[400px] w-full">
      <div className="flex-1 w-full bg-slate-900/50 rounded-2xl overflow-hidden mb-6 relative border border-slate-700/50">
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
           <ambientLight intensity={0.8} />
           <spotLight position={[10, 10, 10]} intensity={2} color="#fff" penumbra={1} />
           <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
              {segments >= 5 ? (
                <group rotation={[Math.PI / 6, 0, 0]}>
                  <mesh>
                    <sphereGeometry args={[1.8, segments, 4]} />
                    <meshPhysicalMaterial 
                      color={color} emissive={color} emissiveIntensity={0.4}
                      transmission={0.8} opacity={1} roughness={0} metalness={0.2} ior={2.2} thickness={1.5} side={THREE.DoubleSide} transparent
                    />
                  </mesh>
                  <mesh scale={0.7}>
                    <sphereGeometry args={[1.8, segments, 3]} />
                    <meshPhysicalMaterial 
                      color="#ffffff" emissive={color} emissiveIntensity={1}
                      transmission={0.2} roughness={0} metalness={0.8} transparent opacity={0.9}
                    />
                  </mesh>
                  <mesh scale={1.05}>
                    <sphereGeometry args={[1.8, segments, 4]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
                  </mesh>
                </group>
              ) : (
                <>
                  <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    {segments === 2 ? (
                       <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                    ) : (
                       <cylinderGeometry args={[1.8, 1.8, 0.6, segments]} />
                    )}
                    <meshPhysicalMaterial 
                      color={color} 
                      emissive={color}
                      emissiveIntensity={0.3}
                      transmission={0.6} 
                      opacity={0.9} 
                      roughness={0.1}
                      metalness={0.4}
                      ior={1.5}
                      transparent={true}
                    />
                  </mesh>
                  <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    {segments === 2 ? (
                       <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                    ) : (
                       <cylinderGeometry args={[1.8, 1.8, 0.6, segments]} />
                    )}
                    <meshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.4} />
                  </mesh>
                </>
              )}
           </Float>
           <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <div>
        <div className="text-3xl font-bold font-mono mb-1" style={{ color }}>
          {num} = ({num})
        </div>
        <div className="text-sm font-bold text-white uppercase tracking-wider mb-2">
          {name}
        </div>
        <div className="text-xs text-slate-400">
          ANALYSIS: SINGULAR. Forma dimensional indivisible. {desc}.
        </div>
      </div>
    </div>
  );
};

// 4. Espiral Aurea 3D (Geometría de Reposo vs Corriente de Intención)
const EspiralAurea3D = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const spiralPoints = [];
  const bluePoints = [];
  const numPoints = 300;
  
  // Golden spiral in XZ plane
  const a = 0.2;
  const b = 0.3063489;
  for (let i = 0; i < numPoints; i++) {
    const theta = (i / numPoints) * Math.PI * 8; // 4 full turns
    const r = a * Math.exp(b * theta);
    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    spiralPoints.push(new THREE.Vector3(x, 0, z));
  }

  // Blue curve going up in Y representing Intention Current
  for (let i = 0; i < 50; i++) {
    const t = i / 5;
    const y = Math.pow(t, 1.5);
    const x = -t * 2;
    const z = t;
    bluePoints.push(new THREE.Vector3(x, y, z));
  }

  return (
    <group ref={group} position={[0, -4, 0]}>
      {/* 3D Grid planes to simulate the blueprint aesthetic */}
      <gridHelper args={[30, 30, '#475569', '#1e293b']} position={[0, 0, 0]} />
      <gridHelper args={[30, 30, '#475569', '#1e293b']} position={[0, 15, -15]} rotation={[Math.PI/2, 0, 0]} />
      <gridHelper args={[30, 30, '#475569', '#1e293b']} position={[-15, 15, 0]} rotation={[0, 0, Math.PI/2]} />
      
      {/* Golden Spiral */}
      <Line points={spiralPoints} color="#fbbf24" lineWidth={3} />
      
      {/* Intention Current Curve */}
      <Line points={bluePoints} color="#0ea5e9" lineWidth={5} />
      <Line points={bluePoints} color="#38bdf8" lineWidth={2} dashed dashSize={0.5} gapSize={0.2} />
      
      {/* Central Core */}
      <mesh position={[0, -5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#fff" emissive="#fbbf24" emissiveIntensity={2} />
      </mesh>

      {/* Math Labels */}
      <Text position={[0, -1.5, 0]} color="#fff" fontSize={1}>0</Text>
      <Text position={[0, -3, 0]} color="#38bdf8" fontSize={1.2} rotation={[0, 0, 0]}>Intention Current J_s</Text>
      <Text position={[12, 0.5, 0]} color="#fbbf24" fontSize={1} rotation={[-Math.PI/2, 0, 0]}>Geometría de Reposo</Text>
      <Text position={[3, 0.2, 3]} color="#fbbf24" fontSize={0.8} rotation={[-Math.PI/2, 0, 0]}>Φ²</Text>
    </group>
  );
};

// 5. Gema Pura (Crisoprasa Astral) - 19
const CrisoprasaAstralGema = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh scale={[1, 1.2, 1]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshPhysicalMaterial 
            color="#10b981"
            emissive="#064e3b"
            emissiveIntensity={0.3}
            transmission={0.9}
            opacity={1}
            roughness={0}
            metalness={0.1}
            ior={2.4}
            thickness={1}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
        <mesh scale={[0.8, 0.96, 0.8]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshPhysicalMaterial 
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.6}
            transmission={0.5}
            roughness={0}
            metalness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh scale={[1.02, 1.22, 1.02]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshBasicMaterial color="#6ee7b7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

// 6. Gema Celestial (Celestial Astral) - 29
const CelestialAstralGema = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh scale={[1.1, 1.1, 1.1]}>
          <icosahedronGeometry args={[3, 1]} />
          <meshPhysicalMaterial 
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.4}
            transmission={0.9}
            opacity={1}
            roughness={0}
            metalness={0.2}
            ior={2.2}
            thickness={1.5}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
        <mesh scale={[0.85, 0.85, 0.85]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshPhysicalMaterial 
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.7}
            transmission={0.4}
            roughness={0}
            metalness={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh scale={[1.12, 1.12, 1.12]}>
          <icosahedronGeometry args={[3, 1]} />
          <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
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

        {/* SLIDE 1.5: Los Primeros 5 Primos */}
        <Section>
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-slate-700 h-auto lg:h-[80vh]">
             <div className="flex-1 space-y-8 w-full">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-indigo-300 font-bold text-sm uppercase tracking-widest border border-indigo-700/50">
                 Geometría Pura
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-white">Los 5 Primos Fundamentales</h2>
               <p className="text-xl text-slate-300 leading-relaxed font-light">
                 Antes de construir volúmenes complejos, el universo define sus dimensiones base a partir de polígonos irreductibles. 
               </p>
               <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-white mb-2">Formas Irreductibles</div>
                 <div className="text-lg text-indigo-300 font-mono">2, 3, 5, 7, 11...</div>
                 <div className="text-sm text-slate-400 mt-2">Cada número primo genera una forma geométrica pura extruida en 3D basada en su cantidad de lados.</div>
               </div>
               <p className="text-indigo-400 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> Puedes interactuar y rotar los ladrillos fundacionales.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[500px] lg:h-full bg-black/50 rounded-3xl overflow-hidden cursor-move border border-slate-800 shadow-inner">
               <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
                 <color attach="background" args={['#0f172a']} />
                 <ambientLight intensity={0.6} />
                 <directionalLight position={[10, 10, 10]} intensity={1.5} color="#e0e7ff" />
                 <spotLight position={[-10, -10, -10]} intensity={1} color="#c7d2fe" />
                 <PrimosFundamentales3D />
                 <OrbitControls enableZoom={true} minDistance={10} maxDistance={40} autoRotate autoRotateSpeed={0.5} />
               </Canvas>
             </div>
          </div>
        </Section>

        {/* SLIDE 1.6: Tarjetas Individuales */}
        <section className="relative w-full pb-20 z-10 px-6">
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto">
            {[
              { num: 2, color: "#ef4444", desc: "Línea (1D) pura y fundamental", segments: 2, name: "La Semilla Par" },
              { num: 3, color: "#f97316", desc: "Triángulo dimensional base", segments: 3, name: "La Trinidad" },
              { num: 5, color: "#eab308", desc: "Pentágono dinámico e irreducible", segments: 5, name: "El Quinteto" },
              { num: 7, color: "#10b981", desc: "Heptágono de balance perfecto", segments: 7, name: "Gema Celestial" },
              { num: 11, color: "#3b82f6", desc: "Hendecágono. Estructura de salto de magnitud", segments: 11, name: "El Portal Cristalino" }
            ].map(p => (
               <div key={p.num} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-sm">
                  <FundamentalCard {...p} />
               </div>
            ))}
          </div>
        </section>

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

        {/* SLIDE 4.5: GEMAS */}
        <Section className="items-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-emerald-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-emerald-700 h-auto lg:h-[80vh] w-full">
             <div className="flex-1 space-y-8 w-full z-10">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/80 text-emerald-300 font-bold text-sm uppercase tracking-widest border border-emerald-500/50">
                 Gemas
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-white">Gema Pura (Crisoprasa Astral)</h2>
               <p className="text-xl text-emerald-100/80 leading-relaxed font-light">
                 El número 19 es indivisible. Es una de las gemas básicas del Mundo. Una estructura pura sin división.
               </p>
               <div className="bg-emerald-900/50 border border-emerald-700/50 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-emerald-400 mb-2">Análisis: Singular</div>
                 <div className="text-lg text-emerald-200 font-mono">19 = Crisoprasa Astral</div>
                 <div className="text-sm text-emerald-300/70 mt-2">No-division structure found. Irreducible.</div>
               </div>
               <p className="text-emerald-400 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> Inspecciona la gema pura en el espacio.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[500px] lg:h-full bg-black/40 rounded-3xl overflow-hidden cursor-move border border-emerald-900/50 shadow-inner relative">
               <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                 <color attach="background" args={['#022c22']} />
                 <ambientLight intensity={0.5} />
                 <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={2} color="#6ee7b7" />
                 <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#10b981" />
                 <Environment preset="sunset" />
                 <CrisoprasaAstralGema />
                 <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={true} />
               </Canvas>
             </div>
          </div>
        </Section>

        {/* SLIDE 4.6: GEMAS 29 */}
        <Section className="items-center mt-8 lg:mt-0">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 bg-sky-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-sky-700 h-auto lg:h-[80vh] w-full">
             <div className="flex-1 space-y-8 w-full z-10">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-900/80 text-sky-300 font-bold text-sm uppercase tracking-widest border border-sky-500/50">
                 Gemas
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold font-sans text-white">Gema Celestial (Celestial Astral)</h2>
               <p className="text-xl text-sky-100/80 leading-relaxed font-light">
                 El número 29 presenta un orden de magnitud superior. Una unidad singular que no contiene divisiones.
               </p>
               <div className="bg-sky-900/50 border border-sky-700/50 rounded-2xl p-6">
                 <div className="text-3xl font-bold font-mono text-sky-400 mb-2">Análisis: Singular</div>
                 <div className="text-lg text-sky-200 font-mono">29 = Celestial Astral</div>
                 <div className="text-sm text-sky-300/70 mt-2">Single 29-polygon unit - No sub-units.</div>
               </div>
               <p className="text-sky-400 flex items-center gap-2 text-sm font-medium">
                 <ZoomIn className="w-4 h-4" /> Inspecciona el núcleo hiper-facetado.
               </p>
             </div>
             
             <div className="flex-1 w-full h-[500px] lg:h-full bg-black/40 rounded-3xl overflow-hidden cursor-move border border-sky-900/50 shadow-inner relative">
               <Canvas camera={{ position: [0, 0, 13], fov: 45 }}>
                 <color attach="background" args={['#082f49']} />
                 <ambientLight intensity={0.5} />
                 <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={2} color="#7dd3fc" />
                 <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#0ea5e9" />
                 <Environment preset="sunset" />
                 <CelestialAstralGema />
                 <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={true} />
               </Canvas>
             </div>
          </div>
        </Section>

        {/* SLIDE 5: Espiral Aurea (Geometria de Reposo vs Intention Current) */}
        <section className="relative w-screen h-screen -ml-[calc(50vw-50%)] overflow-hidden bg-[#0b101e]">
          {/* Background Canvas (Full Screen) */}
          <div className="absolute inset-0 w-full h-full cursor-move z-0">
            <Canvas camera={{ position: [20, 15, 25], fov: 45 }}>
              <color attach="background" args={['#0b101e']} />
              <ambientLight intensity={0.8} />
              <EspiralAurea3D />
              <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={true} />
            </Canvas>
          </div>

          {/* Floating UI Card */}
          <div className="absolute z-10 bottom-12 lg:bottom-auto lg:top-1/2 left-6 lg:left-24 lg:-translate-y-1/2 max-w-md w-full pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl pointer-events-auto"
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-900/50 text-teal-300 font-bold text-xs uppercase tracking-widest border border-teal-700/50 mb-6">
                 Fase de Reposo
               </div>
               <h2 className="text-4xl font-bold font-sans text-white mb-4">Espiral Áurea 3D</h2>
               <p className="text-slate-300 leading-relaxed font-light mb-8">
                 Visualización del gráfico tridimensional donde la espiral áurea ($Φ$) yace en el plano de la Geometría de Reposo.
               </p>
               <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 mb-6">
                 <div className="text-2xl font-bold font-serif italic text-amber-400 mb-1">J<sub className="text-sm">s</sub> = 0</div>
                 <div className="text-sm text-teal-300 font-mono mb-2">Corriente de Intención</div>
                 <div className="text-xs text-slate-400">La curva azul representa la irrupción de la intención creativa que rompe el reposo perfecto (P=NP).</div>
               </div>
               <p className="text-teal-400 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                 <ZoomIn className="w-4 h-4" /> Arrastra para rotar en 3D
               </p>
            </motion.div>
          </div>
        </section>
        
      </main>
    </div>
  );
}
