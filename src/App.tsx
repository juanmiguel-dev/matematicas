import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Matematikas from './pages/Matematikas';
import NumerosPrimos from './pages/NumerosPrimos';
import Lexicon from './pages/Lexicon';
import CodigoMaquina from './pages/CodigoMaquina';
import GematriaVibracional from './pages/GematriaVibracional';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Matematikas />} />
        <Route path="/numeros-primos" element={<NumerosPrimos />} />
        <Route path="/lexicon" element={<Lexicon />} />
        <Route path="/codigo-maquina" element={<CodigoMaquina />} />
        <Route path="/gematria-vibracional" element={<GematriaVibracional />} />
      </Routes>
    </BrowserRouter>
  );
}
