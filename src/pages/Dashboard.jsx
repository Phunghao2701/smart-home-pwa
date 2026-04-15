import React from 'react';
import { useOutletContext } from 'react-router-dom';
import DeviceCard from '../components/DeviceCard';
import ActivityLog from '../components/ActivityLog';
import { Lightbulb, Wind, Speaker, Lock } from 'lucide-react';

export default function Dashboard() {
  const { data, sendCommand } = useOutletContext();

  return (
    <>
      {/* Quick Access / Devices */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-heading font-bold text-on-surface">Thiết bị truy cập nhanh</h3>
            <button className="text-primary font-semibold hover:underline">Xem tất cả</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DeviceCard 
            title="Đèn Chùm (Relay 1)" 
            icon={<Lightbulb />} 
            isActive={data.devices.relay1} 
            onClick={(state) => sendCommand('relay1', state)}
          />
          <DeviceCard 
            title="Quạt Trần (Relay 2)" 
            icon={<Wind />} 
            isActive={data.devices.relay2} 
            onClick={(state) => sendCommand('relay2', state)}
          />
          <DeviceCard 
            title="Loa (Relay 3)" 
            icon={<Speaker />} 
            isActive={data.devices.relay3} 
            onClick={(state) => sendCommand('relay3', state)}
          />
          <DeviceCard 
            title="Khóa (Relay 4)" 
            icon={<Lock />} 
            isActive={data.devices.relay4} 
            onClick={(state) => sendCommand('relay4', state)}
          />
        </div>
      </section>
      
      {/* Activity Log */}
      <section className="mt-12">
        <h3 className="text-2xl font-heading font-bold text-on-surface mb-6">Hoạt động gần đây</h3>
        <ActivityLog logs={data.logs} />
      </section>
    </>
  );
}
