import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Energy() {
  const { data } = useOutletContext();

  const mockChartData = [
    { time: '00:00', kwh: 12 },
    { time: '04:00', kwh: 8 },
    { time: '08:00', kwh: 35 },
    { time: '12:00', kwh: 50 },
    { time: '16:00', kwh: 45 },
    { time: '20:00', kwh: 60 },
    { time: '23:59', kwh: 25 },
  ];

  return (
    <div>
       <h3 className="text-2xl font-heading font-bold text-on-surface mb-6">Theo Dõi Năng Lượng</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-surface-container-low rounded-xl p-6">
            <p className="text-sm text-on-surface-variant font-semibold uppercase">Tiêu thụ hôm nay</p>
            <p className="text-4xl font-heading font-bold text-primary mt-2">12.4 <span className="text-lg">kWh</span></p>
         </div>
         <div className="bg-surface-container-low rounded-xl p-6">
            <p className="text-sm text-on-surface-variant font-semibold uppercase">Thiết bị tốn nhất</p>
            <p className="text-2xl font-heading font-bold text-on-surface mt-2">Điều hòa (65%)</p>
         </div>
         <div className="bg-surface-container-low rounded-xl p-6">
            <p className="text-sm text-on-surface-variant font-semibold uppercase">Ước tính cước</p>
            <p className="text-4xl font-heading font-bold text-orange-500 mt-2">~1.2M <span className="text-lg">VNĐ</span></p>
         </div>
       </div>

       <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient h-96">
         <h4 className="text-lg font-semibold text-on-surface mb-4">Biểu Đồ Tiêu Thụ Điện Liền Kề</h4>
         <ResponsiveContainer width="100%" height="85%">
            <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e4" />
              <XAxis dataKey="time" stroke="#737687" fontSize={12} />
              <YAxis stroke="#737687" fontSize={12} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', borderColor: '#e1e3e4' }} 
              />
              <Line type="monotone" dataKey="kwh" stroke="#0061ff" strokeWidth={4} dot={{ r: 6, fill: '#0061ff' }} activeDot={{ r: 8 }} />
            </LineChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
}
