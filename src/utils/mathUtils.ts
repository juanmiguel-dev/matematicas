import { FactorNode, PrimeFactor } from "../types";

/**
 * Checks if a number is prime
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Gets a list of all primes up to a limit (using Sieve of Eratosthenes)
 */
export function getPrimesUpTo(limit: number): number[] {
  const sieve = Array(limit + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) primes.push(i);
  }
  return primes;
}

/**
 * Get all prime factors of a number as a flat array of prime numbers (e.g. 12 -> [2, 2, 3])
 */
export function getPrimeFactorsFlat(n: number): number[] {
  if (n <= 1) return [];
  const factors: number[] = [];
  let temp = n;
  
  // Divide by 2
  while (temp % 2 === 0) {
    factors.push(2);
    temp /= 2;
  }
  
  // Divide by odd numbers
  for (let i = 3; i * i <= temp; i += 2) {
    while (temp % i === 0) {
      factors.push(i);
      temp /= i;
    }
  }
  
  // If temp is still > 1, it's prime
  if (temp > 1) {
    factors.push(temp);
  }
  
  return factors.sort((a, b) => a - b);
}

/**
 * Get prime factorization with exponents (e.g. 12 -> [{prime: 2, count: 2}, {prime: 3, count: 1}])
 */
export function getPrimeFactorsExponents(n: number): PrimeFactor[] {
  const flat = getPrimeFactorsFlat(n);
  const map = new Map<number, number>();
  
  for (const p of flat) {
    map.set(p, (map.get(p) || 0) + 1);
  }
  
  const result: PrimeFactor[] = [];
  map.forEach((exponent, prime) => {
    result.push({ prime, exponent });
  });
  
  return result.sort((a, b) => a.prime - b.prime);
}

/**
 * Returns colors and names for the prime number or a default color for general primes
 */
export interface GemMeta {
  color: string;
  name: string;
  type: string;
  glowClass: string;
  bgGradient: string;
  textColor: string;
  borderClass: string;
}

export function getGemMetadata(n: number): GemMeta {
  switch (n) {
    case 2:
      return {
        color: "#EF4444", // red
        name: "Rubí Rojo",
        type: "Gema 2",
        glowClass: "chalk-glow-red",
        bgGradient: "from-red-500/80 to-red-700/90",
        textColor: "text-red-400",
        borderClass: "border-red-500/40"
      };
    case 3:
      return {
        color: "#3B82F6", // blue
        name: "Zafiro Azul",
        type: "Gema 3",
        glowClass: "chalk-glow-blue",
        bgGradient: "from-blue-500/80 to-blue-700/90",
        textColor: "text-blue-400",
        borderClass: "border-blue-500/40"
      };
    case 5:
      return {
        color: "#22C55E", // green
        name: "Esmeralda Verde",
        type: "Gema 5",
        glowClass: "chalk-glow-green",
        bgGradient: "from-green-500/80 to-green-700/90",
        textColor: "text-green-400",
        borderClass: "border-green-500/40"
      };
    case 7:
      return {
        color: "#A855F7", // purple
        name: "Amatista Púrpura",
        type: "Gema 7",
        glowClass: "chalk-glow-purple",
        bgGradient: "from-purple-500/80 to-purple-700/90",
        textColor: "text-purple-400",
        borderClass: "border-purple-500/40"
      };
    case 11:
      return {
        color: "#F59E0B", // amber
        name: "Ámbar Dorado",
        type: "Gema 11",
        glowClass: "chalk-glow-yellow",
        bgGradient: "from-amber-400/80 to-amber-600/90",
        textColor: "text-amber-400",
        borderClass: "border-amber-500/40"
      };
    case 13:
      return {
        color: "#14B8A6", // teal
        name: "Topacio Turquesa",
        type: "Gema 13",
        glowClass: "chalk-glow-teal",
        bgGradient: "from-teal-400/80 to-teal-600/90",
        textColor: "text-teal-400",
        borderClass: "border-teal-500/40"
      };
    case 17:
      return {
        color: "#EC4899", // pink
        name: "Cuarzo Rosa",
        type: "Gema 17",
        glowClass: "chalk-glow-red",
        bgGradient: "from-pink-400/80 to-pink-600/90",
        textColor: "text-pink-400",
        borderClass: "border-pink-500/40"
      };
    case 19:
      return {
        color: "#06B6D4", // cyan
        name: "Crisoprasa Astral",
        type: "Gema 19",
        glowClass: "chalk-glow-blue",
        bgGradient: "from-cyan-400/80 to-cyan-600/90",
        textColor: "text-cyan-400",
        borderClass: "border-cyan-500/40"
      };
    default:
      if (isPrime(n)) {
        return {
          color: "#E2E8F0", // silver / white opal
          name: `Prisma Celestial ${n}`,
          type: "Gema Arcana",
          glowClass: "chalk-glow-rainbow",
          bgGradient: "from-slate-200/80 to-zinc-400/90",
          textColor: "text-slate-200",
          borderClass: "border-slate-300/40"
        };
      } else {
        return {
          color: "#78350F", // rock/stone
          name: "Roca Estructural",
          type: "Compuesto",
          glowClass: "shadow-black/50",
          bgGradient: "from-stone-600 to-amber-950",
          textColor: "text-stone-400",
          borderClass: "border-stone-600"
        };
      }
  }
}

/**
 * Find the two closest factors of a composite number to make a perfectly balanced tree.
 * For example: 30 has factors pairs: (1,30), (2,15), (3,10), (5,6).
 * The closest factor pair is (5,6), so we split 30 -> 5 & 6.
 */
function findClosestFactors(n: number): [number, number] {
  let bestA = 1;
  let bestB = n;
  let minDiff = n;
  
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      const a = i;
      const b = n / i;
      const diff = Math.abs(b - a);
      if (diff < minDiff) {
        minDiff = diff;
        bestA = a;
        bestB = b;
      }
    }
  }
  return [bestA, bestB];
}

/**
 * Build factorization tree structure
 */
export function buildFactorTree(n: number): FactorNode {
  if (isPrime(n) || n <= 1) {
    return {
      value: n,
      isPrime: true
    };
  }
  
  const [leftVal, rightVal] = findClosestFactors(n);
  
  // To match typical tree visual conventions, sort them or assign:
  // Usually, smaller factor or prime goes left, composite goes right.
  // We'll let left = leftVal, right = rightVal (the closest factors).
  
  return {
    value: n,
    isPrime: false,
    left: buildFactorTree(leftVal),
    right: buildFactorTree(rightVal)
  };
}
