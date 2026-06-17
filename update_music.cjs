const fs = require('fs');

let file = fs.readFileSync('src/pages/MatematicasMusicales.tsx', 'utf8');

// 1. Imports
if (!file.includes('MusicInteractive')) {
  file = file.replace(
    `import { MatematikaLogo } from '../components/MatematikaLogo';`,
    `import { MatematikaLogo } from '../components/MatematikaLogo';\nimport { GlossaryTooltip, FreqToNote, InteractiveTuner, RhythmVisualizer, ChladniPlate3D } from '../components/MusicInteractive';`
  );
}

// 2. Sections array
file = file.replace(
  `const sections = ['hero', 'monocordio', 'serie-armonica', 'coma', 'fibonacci', 'interferencia', 'cimatica'];`,
  `const sections = ['hero', 'monocordio', 'frecuencia-nota', 'serie-armonica', 'percepcion', 'coma', 'fibonacci', 'interferencia', 'ritmo', 'cimatica', 'historia'];`
);

// 3. Nav buttons
file = file.replace(
  /\{\s*id:\s*'monocordio',\s*label:\s*'Pitágoras'\s*\},/g,
  `{ id: 'monocordio', label: 'Pitágoras' },\n            { id: 'frecuencia-nota', label: 'Notas' },`
);
file = file.replace(
  /\{\s*id:\s*'serie-armonica',\s*label:\s*'Armónicos'\s*\},/g,
  `{ id: 'serie-armonica', label: 'Armónicos' },\n            { id: 'percepcion', label: 'Percepción' },`
);
file = file.replace(
  /\{\s*id:\s*'interferencia',\s*label:\s*'Interferencia'\s*\},/g,
  `{ id: 'interferencia', label: 'Interferencia' },\n            { id: 'ritmo', label: 'Ritmo' },`
);
file = file.replace(
  /\{\s*id:\s*'cimatica',\s*label:\s*'Cimática'\s*\}\n\s*\]/g,
  `{ id: 'cimatica', label: 'Cimática' },\n            { id: 'historia', label: 'Historia' }\n          ]`
);

// 4. Add FreqToNote section after Monocordio
const freqNoteSection = `
        {/* SLIDE: Frecuencia a Nota */}
        <Section id="frecuencia-nota" className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">De la Física a la <br/><span className="text-slate-400 italic font-light">Música Práctica</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Descubre cómo las ondas físicas (medidas en Hertzios) se traducen en el alfabeto musical que conocemos.
            </p>
          </motion.div>
          <div className="w-full max-w-3xl">
            <FreqToNote />
          </div>
        </Section>
`;
file = file.replace(/(<Section id="serie-armonica">)/, freqNoteSection + '\n        $1');

// 5. Tooltips on Monocordio text
file = file.replace(
  /agradables al oído \(consonantes\)/g,
  `<GlossaryTooltip term="Consonancia" definition="Combinación de notas que suena estable y agradable, derivada de proporciones matemáticas simples.">agradables al oído (consonantes)</GlossaryTooltip>`
);

file = file.replace(
  /La Serie Armónica <br\/>\<span className="text-slate-400 italic font-light">Los Sobretonos<\/span>/g,
  `La Serie Armónica <br/><span className="text-slate-400 italic font-light">Los <GlossaryTooltip term="Sobretono" definition="Cualquier frecuencia mayor a la fundamental que resuena simultáneamente.">Sobretonos</GlossaryTooltip></span>`
);

// 6. Add Percepcion Humana after Serie Armonica
const percepcionSection = `
        {/* SLIDE: Percepcion */}
        <Section id="percepcion">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif">El Oído como Analizador <br/><span className="text-slate-400 italic font-light">de Fourier</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Nuestra cóclea, en el oído interno, es un milagro matemático. Funciona como un prisma acústico que descompone las ondas de sonido complejas en frecuencias senoidales simples (armónicos), tal como postula la transformada de Fourier.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Además, no percibimos el volumen de forma lineal. Según las curvas de igual sonoridad (Fletcher-Munson), nuestro oído es altamente sensible a las frecuencias medias (donde reside la voz humana) y muy deficiente en los bajos extremos.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full bg-[#11131a] rounded-3xl p-8 border border-white/5 relative shadow-2xl"
            >
               {/* Abstract cochlea / fourier visual */}
               <svg viewBox="0 0 400 300" className="w-full h-full stroke-fuchsia-400 fill-none opacity-80" preserveAspectRatio="xMidYMid meet">
                 {/* Complex wave entering */}
                 <path d="M0,150 Q50,50 100,150 T200,150" strokeWidth="3" className="stroke-white" />
                 {/* Prism/Ear icon abstract */}
                 <polygon points="200,100 250,200 150,200" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" />
                 {/* Split sine waves outputting */}
                 <path d="M225,150 Q275,100 325,150 T400,150" strokeWidth="1" className="stroke-fuchsia-400" />
                 <path d="M225,150 Q250,120 275,150 T325,150 T375,150 T400,150" strokeWidth="1" className="stroke-indigo-400" />
                 <path d="M225,150 Q237,130 250,150 T275,150 T300,150 T325,150 T350,150 T375,150 T400,150" strokeWidth="1" className="stroke-purple-400" />
                 
                 <text x="350" y="110" fill="white" fontSize="12" className="font-mono">Altas (Agudos)</text>
                 <text x="350" y="160" fill="white" fontSize="12" className="font-mono">Medias (Voz)</text>
                 <text x="350" y="210" fill="white" fontSize="12" className="font-mono">Bajas (Graves)</text>
               </svg>
            </motion.div>
          </div>
        </Section>
`;
file = file.replace(/(<Section id="coma" className="items-center">)/, percepcionSection + '\n        $1');

// 7. Replace Coma SVG with InteractiveTuner
const comaSvgRegex = /<div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center bg-\[#11131a\] rounded-full border border-white\/5 shadow-\[0_0_50px_rgba\(192,132,252,0\.1\)\]">[\s\S]*?<\/div>/;
file = file.replace(comaSvgRegex, '<InteractiveTuner />');

// 8. Add Ritmo Fraccionario after interferencia
const ritmoSection = `
        {/* SLIDE: Ritmo */}
        <Section id="ritmo" className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">El Ritmo es una <br/><span className="text-slate-400 italic font-light">Fracción del Tiempo</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Los compases musicales (3/4, 4/4) organizan matemáticamente el tiempo. Al superponer fracciones diferentes, creamos polirritmias complejas.
            </p>
          </motion.div>
          <div className="w-full max-w-4xl">
            <RhythmVisualizer />
          </div>
        </Section>
`;
file = file.replace(/(<Section id="cimatica" className="items-center">)/, ritmoSection + '\n        $1');

// 9. Replace Cymatic SVGs with ChladniPlate3D
const chladniBlockRegex = /<div className="w-48 h-48 relative flex items-center justify-center mb-8">[\s\S]*?<\/div>\n\s*<h3/g;
let chladniIndex = 0;
const chladniNodes = [4, 6, 8];
file = file.replace(chladniBlockRegex, (match) => {
  const nodes = chladniNodes[chladniIndex++];
  return `<div className="w-full h-48 relative mb-8 rounded-full overflow-hidden border border-white/10 shadow-inner">
                  <ChladniPlate3D activeNodes={${nodes}} />
                </div>\n                <h3`;
});

// Add Solfeggio Context to Cimatica
const solfeggioContext = `
          <div className="mt-12 w-full max-w-3xl mx-auto p-6 bg-fuchsia-900/10 border border-fuchsia-500/20 rounded-2xl text-center">
            <h4 className="text-fuchsia-400 font-bold mb-2">✦ Un Apunte sobre las Frecuencias "Solfeggio" (432Hz, 528Hz)</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Aunque la cultura popular atribuye propiedades mágicas o curativas a estas afinaciones, no existe evidencia científica rigurosa que lo respalde. Sin embargo, su valor como <strong>fenómeno estético y cultural</strong> es innegable. Preferir A=432Hz sobre A=440Hz es una elección subjetiva de color armónico, una fascinación humana por alinear nuestro arte con números simbólicamente "bellos".
            </p>
          </div>
`;
file = file.replace(/(<\/Section>)\s*(?=<\/main>)/, solfeggioContext + '\n        $1');

// 10. Add Historia Timeline before </main>
const historiaSection = `
        {/* SLIDE: Historia */}
        <Section id="historia" className="items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">Línea del Tiempo <br/><span className="text-slate-400 italic font-light">Matemático-Musical</span></h2>
          </motion.div>
          
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/50 to-fuchsia-500/0 -translate-x-1/2" />
            
            <div className="space-y-20 relative z-10">
              {[
                { year: "500 a.C.", name: "Pitágoras", desc: "Descubrimiento de las proporciones enteras (1:2, 2:3) en el monocordio. Nace la afinación pitagórica." },
                { year: "1619", name: "Johannes Kepler", desc: "Publica 'Harmonices Mundi', conectando las órbitas planetarias (Geometría) con proporciones musicales (Armonía de las Esferas)." },
                { year: "1739", name: "Leonhard Euler", desc: "Desarrolla la primera teoría matemática de la música (Tentamen novae theoriae musicae), asignando 'grados de suavidad' a los acordes." },
                { year: "1863", name: "Hermann von Helmholtz", desc: "Funda la psicoacústica moderna al publicar 'Sobre las sensaciones de tono', conectando física, anatomía del oído y percepción musical." },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={\`flex items-center gap-8 w-full \${idx % 2 === 0 ? 'flex-row-reverse' : ''}\`}
                >
                  <div className={\`flex-1 \${idx % 2 === 0 ? 'text-left' : 'text-right'}\`}>
                    <div className="text-fuchsia-400 font-mono font-bold mb-1">{item.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#11131a] border-2 border-fuchsia-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
`;

file = file.replace(/(<\/main>)/, historiaSection + '\n      $1');

fs.writeFileSync('src/pages/MatematicasMusicales.tsx', file);
