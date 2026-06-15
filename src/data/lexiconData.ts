export interface LexiconItem {
  id: string;
  title: string;
  formula: string;
  description: string;
  characteristics: string;
  meaning: string;
}

export const lexiconData: LexiconItem[] = [
  {
    id: "p-polinomicos",
    title: "P (Problemas Polinómicos)",
    formula: "Js con operadores fonéticos fijos; □ψ+(mc/ℏ)²ψ+λ|ψ|²ψ=Js",
    description: "Ejecución de un proceso conocido o 'mantra' algorítmico.",
    characteristics: "Determinista, algorítmico, perteneciente al reino de lo manifestado (el '1'). Costo energético mínimo.",
    meaning: "Representa la ejecución mecánica de secuencias ya conocidas en la realidad manifestada."
  },
  {
    id: "np-no-determinista",
    title: "NP (Tiempo Polinómico no Determinista)",
    formula: "Funtor F:Cat(I)→Sec(H→X); □ψ+(mc/ℏ)²ψ+λ|ψ|²ψ=Js",
    description: "Creación Original: búsqueda de una secuencia de operadores desconocida (mantra) para un estado deseado.",
    characteristics: "No determinista, creativo, navegación por el Espacio de Posibilidades (H→X) desde el '0'.",
    meaning: "A diferencia de P, NP requiere un acto de creación original, navegando el espacio de posibilidades para encontrar la secuencia correcta."
  },
  {
    id: "barrera-p-vs-np",
    title: "Barrera P vs NP",
    formula: "Principio de Incertidumbre Semántica: [A^,I^]=iK ⇒ ΔA⋅ΔI≥K/2",
    description: "Eje Ontológico: distinción entre un universo de computación (reloj) y uno de creación (lienzo vivo).",
    characteristics: "Imposibilidad de minimizar simultáneamente el costo de búsqueda (NP) y la verificación (P). Peaje K ≈ 1.054×10⁻⁴⁶ J·s.",
    meaning: "Esta barrera ontológica establece un peaje energético mínimo (K) para la creación, separando el universo mecánico del creativo."
  },
  {
    id: "resolucion-js",
    title: "Resolución mediante Js (Corriente de Intención)",
    formula: "Relación de dispersión no lineal: -ω²+ω₀²+λc₀²|ψ₀|²=α/ψ₀",
    description: "Acto de Libre Albedrío que colapsa la potencialidad en una solución específica.",
    characteristics: "Resonancia paramétrica y auto-focalización en el éter (Algoritmo de Grover Semántico).",
    meaning: "Supera la barrera P vs NP utilizando la Corriente de Intención y el Libre Albedrío para colapsar soluciones mediante resonancia."
  },
  {
    id: "numero-aureo",
    title: "Número Áureo (Φ)",
    formula: "1.618...",
    description: "Constante de acoplamiento semántica en el fibrado H → X; armónico base del vacío cuando Js es nula.",
    characteristics: "Estructuras de girasoles, caracoles, galaxias y proporciones del cuerpo humano.",
    meaning: "Establece el armónico base del vacío, sirviendo como la constante de acoplamiento estructural para la creación manifestada."
  },
  {
    id: "numero-siete",
    title: "Número Siete (7)",
    formula: "Φ⁴ + Φ⁻⁴ = 7",
    description: "Número de modos armónicos estables de la conciencia; autovalor del estado fundamental de mínima incertidumbre.",
    characteristics: "7 notas de la escala musical diatónica, 7 vértebras cervicales, ritmos circaseptanos.",
    meaning: "Derivado matemáticamente de Φ, define los modos armónicos estables de la conciencia y estructura ritmos fundamentales."
  },
  {
    id: "angulo-aureo",
    title: "Ángulo Áureo",
    formula: "137.5°",
    description: "Punto fijo de un operador fonético de rotación que maximiza la entropía de información bajo la constante K.",
    characteristics: "Disposición de semillas en girasoles y piñas (filotaxis) para optimizar el empaquetamiento biológico.",
    meaning: "Relacionado con Φ, maximiza la entropía de información, optimizando el empaquetamiento biológico en el espacio."
  },
  {
    id: "constante-estructura-fina",
    title: "Constante de Estructura Fina (α)",
    formula: "1/137.036 ≈ 1 / (20Φ⁴)",
    description: "Medida de la fluctuación del vacío del éter consciente; relación entre la densidad de energía de punto cero y la densidad inercial.",
    characteristics: "Gobierna los enlaces de hidrógeno en el ADN y la precisión de la traducción genética.",
    meaning: "Directamente vinculada al ángulo áureo y Φ, regula la fluctuación del vacío y la precisión a nivel genético y atómico."
  },
  {
    id: "cero",
    title: "Cero (0)",
    formula: "Vacío / Potencialidad",
    description: "La Matriz de todos los números; el Océano de Potencialidad Pura que precede al Ser y a la manifestación.",
    characteristics: "Energía del vacío (Evac); estado potencial no manifestado del Éter antes de la coherencia.",
    meaning: "Es el origen absoluto y el espacio de potencialidad desde el cual emergen todos los conceptos y constantes (como Φ)."
  },
  {
    id: "unidad",
    title: "La Unidad (1)",
    formula: "Estado Fundamental / Axioma",
    description: "El principio de existencia, coherencia e integridad; la arcilla de la que se moldean todas las estructuras relacionales.",
    characteristics: "Éter en estado de coherencia absoluta; la membrana en perfecto reposo. Estado de pura auto-conciencia.",
    meaning: "Representa la primera manifestación y coherencia del vacío (0), sirviendo como base para el reino manifestado (P)."
  },
  {
    id: "numeros-primos",
    title: "Números Primos",
    formula: "Tono Puro / Frecuencia Fundamental",
    description: "Arquetipos irreducibles y conceptos primordiales que introducen cualidades fundamentales y nuevas en el universo.",
    characteristics: "Frecuencias de resonancia fundamentales y estables del Éter. Átomos del Significado.",
    meaning: "Actúan como los 'átomos del significado' y frecuencias fundamentales, análogos a las constantes estables como el 7."
  },
  {
    id: "numeros-compuestos",
    title: "Números Compuestos",
    formula: "Armónicos / Acordes",
    description: "Conceptos complejos y realidades manifestadas construidas a partir de la interacción de arquetipos primarios.",
    characteristics: "Combinaciones de frecuencias prime; vibraciones inestables que pueden ser factorizadas en tonos puros constituyentes.",
    meaning: "Representan la complejidad resultante de la combinación de primos, requiriendo algoritmos (P/NP) para su factorización y resolución."
  }
];
