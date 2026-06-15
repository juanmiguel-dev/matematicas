import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Matematikas from './pages/Matematikas';
import Taller from './pages/Taller';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Matematikas />} />
        <Route path="/taller" element={<Taller />} />
      </Routes>
    </BrowserRouter>
  );
}
