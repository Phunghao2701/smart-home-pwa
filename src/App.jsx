import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Energy from './pages/Energy';
import Security from './pages/Security';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="energy" element={<Energy />} />
        <Route path="security" element={<Security />} />
        {/* Route mặc định / 404 cho cài đặt */}
        <Route path="settings" element={<div className="p-10 font-bold text-xl">Setting page coming soon...</div>} />
      </Route>
    </Routes>
  );
}

export default App;
