import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Zap, Shield, Settings, X } from "lucide-react";

export default function Sidebar({
  isConnected = false,
  isOpen = false,
  onClose,
}) {
  const navItems = [
    { icon: <LayoutGrid size={20} />, label: "Dashboard", path: "/" },
    { icon: <Home size={20} />, label: "Phòng", path: "/rooms" },
    { icon: <Zap size={20} />, label: "Năng Lượng", path: "/energy" },
    { icon: <Shield size={20} />, label: "An Ninh", path: "/security" },
    { icon: <Settings size={20} />, label: "Cài Đặt", path: "/settings" },
  ];

  return (
    <div
      className={`md:w-64 w-[85vw] bg-surface-container-low h-full flex flex-col pt-8 px-6 border-r border-outline-variant/30 fixed md:relative z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${isOpen ? "block" : "hidden md:flex"}`}
    >
      <div className="relative flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
          L
        </div>
        <h1 className="font-heading font-bold text-xl tracking-tight text-on-surface">
          Luminous
        </h1>
        {isOpen && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-0 right-0 mt-2 mr-0 p-2 rounded-lg bg-surface-container shadow-lg text-on-surface"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">
        TỔNG QUAN
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            onClick={() => isOpen && onClose()} // Close on mobile when clicking nav
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-surface-container-lowest shadow-ambient text-primary font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-lowest/50 hover:text-on-surface"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto mb-8 bg-surface-container-lowest p-4 rounded-xl shadow-ambient">
        <h3 className="text-sm font-semibold mb-1">Hub Trạng Thái</h3>
        <p className="text-xs text-on-surface-variant flex items-center gap-1">
          {isConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-ambient-glow"></span>{" "}
              Đã Kết Nối MQTT
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>{" "}
              Mất Kết Nối
            </>
          )}
        </p>
      </div>
    </div>
  );
}
