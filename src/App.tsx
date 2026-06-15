import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Matematikas from './pages/Matematikas';
import Taller from './pages/Taller';
import Lexicon from './pages/Lexicon';
import CodigoMaquina from './pages/CodigoMaquina';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Matematikas />} />
        <Route path="/taller" element={<Taller />} />
        <Route path="/lexicon" element={<Lexicon />} />
        <Route path="/codigo-maquina" element={<CodigoMaquina />} />
      </Routes>
    </BrowserRouter>
  );
}
