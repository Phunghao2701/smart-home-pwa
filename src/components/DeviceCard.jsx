import React from 'react';

export default function DeviceCard({ title, icon, isActive, subtitle, onClick }) {
  return (
    <div 
      className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-36 border border-transparent"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
          {icon}
        </div>
        
        {/* Toggle UI */}
        <div 
          onClick={(e) => { e.stopPropagation(); onClick(!isActive); }}
          className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${isActive ? 'bg-primary-gradient' : 'bg-surface-variant'}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isActive ? 'translate-x-5 shadow-ambient-glow' : 'translate-x-0'}`}></div>
        </div>
      </div>

      <div>
        <h3 className={`font-heading font-semibold text-lg max-w-[90%] truncate transition-colors ${isActive ? 'text-primary' : 'text-on-surface'}`}>
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant font-sans mt-0.5">{subtitle || (isActive ? 'Đang Bật' : 'Đang Tắt')}</p>
      </div>
    </div>
  );
}
