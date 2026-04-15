import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useESP32 } from "../hooks/useESP32";
import { Menu, X } from "lucide-react";

export default function MainLayout() {
  const { data, isConnected, sendCommand } = useESP32(
    "wss://broker.emqx.io:8084/mqtt",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar
        isConnected={data.connected}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Hamburger button for mobile */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden fixed top-4 left-4 z-50 bg-primary text-on-primary p-2 rounded-lg shadow-lg"
            >
              <Menu size={24} />
            </button>
          )}

          <Header data={data} />

          {/* Inject state via Outlet Context so all pages can use ESP32 data */}
          <Outlet context={{ data, isConnected, sendCommand }} />
        </div>
      </main>
    </div>
  );
}
