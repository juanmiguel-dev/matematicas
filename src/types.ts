/**
 * Types for El Taller del Mundo Cósmico
 */

export interface PrimeFactor {
  prime: number;
  exponent: number;
}

export interface FactorNode {
  value: number;
  left?: FactorNode;
  right?: FactorNode;
  isPrime: boolean;
  gemColor?: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
}
