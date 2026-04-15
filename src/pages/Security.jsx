import React from 'react';
import { useOutletContext } from 'react-router-dom';
import DeviceCard from '../components/DeviceCard';
import ActivityLog from '../components/ActivityLog';
import { Lock, Camera } from 'lucide-react';

export default function Security() {
  const { data, sendCommand } = useOutletContext();

  return (
    <div>
       <h3 className="text-2xl font-heading font-bold text-on-surface mb-6">Camera & An Ninh</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
         {/* Live View Placeholder */}
         <div className="lg:col-span-2 relative bg-surface-container-highest rounded-xl overflow-hidden aspect-video flex-col flex items-center justify-center">
            <Camera size={48} className="text-outline mb-3" />
            <p className="text-on-surface-variant font-medium">Camera Sân Trước - No Stream URL Configured</p>
            <div className="absolute top-4 left-4 flex gap-2">
               <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE
               </span>
            </div>
         </div>

         {/* Security Controls */}
         <div className="flex flex-col gap-6">
            <DeviceCard 
              title="Khóa Thông Minh (Cửa Chính)" 
              icon={<Lock />} 
              isActive={data.devices.relay4} 
              subtitle={data.devices.relay4 ? 'Đang Khóa An Toàn' : 'Mở Khóa Tạm Thời'}
              onClick={(state) => sendCommand('relay4', state)}
            />
            <div className="flex-1 bg-surface-container-low rounded-xl p-5">
              <h4 className="font-semibold mb-3">Chế độ báo động</h4>
              <button className="w-full py-3 rounded-lg font-bold transition-all bg-surface hover:bg-red-50 text-red-600 border border-red-200">
                 Kích hoạt SOS
              </button>
            </div>
         </div>
       </div>

       <h3 className="text-xl font-heading font-bold text-on-surface mb-4">Lịch sử sự kiện</h3>
       <ActivityLog />
    </div>
  );
}
