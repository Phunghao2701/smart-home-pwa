import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DeviceCard from "../components/DeviceCard";
import { Lightbulb, Tv, Plus, X } from "lucide-react";

export default function Rooms() {
  const { data, sendCommand } = useOutletContext();
  const [rooms, setRooms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    deviceName: "",
    relay: "",
  });
  const [assignedRelays, setAssignedRelays] = useState(
    new Set(["relay1", "relay2", "relay3"]),
  ); // Default assigned

  // Load rooms from localStorage
  useEffect(() => {
    const savedRooms = localStorage.getItem("smartHomeRooms");
    if (savedRooms) {
      const parsedRooms = JSON.parse(savedRooms);
      setRooms(parsedRooms);
      // Update assigned relays
      const newAssigned = new Set(["relay1", "relay2", "relay3"]);
      parsedRooms.forEach((room) => newAssigned.add(room.relay));
      setAssignedRelays(newAssigned);
    }
  }, []);

  // Save rooms to localStorage
  useEffect(() => {
    localStorage.setItem("smartHomeRooms", JSON.stringify(rooms));
  }, [rooms]);

  // Get available relays (not assigned)
  const getAvailableRelays = () => {
    return Object.keys(data.devices).filter(
      (relay) => !assignedRelays.has(relay),
    );
  };

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.deviceName && newRoom.relay) {
      setRooms([...rooms, { ...newRoom, id: Date.now() }]);
      setAssignedRelays((prev) => new Set([...prev, newRoom.relay]));
      setNewRoom({ name: "", deviceName: "", relay: "" });
      setShowAddModal(false);
    }
  };

  const handleRemoveRoom = (id) => {
    const roomToRemove = rooms.find((room) => room.id === id);
    if (roomToRemove) {
      setAssignedRelays((prev) => {
        const newSet = new Set(prev);
        newSet.delete(roomToRemove.relay);
        return newSet;
      });
    }
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const getDeviceIcon = (deviceName) => {
    if (deviceName.toLowerCase().includes("đèn")) return <Lightbulb />;
    if (deviceName.toLowerCase().includes("tv")) return <Tv />;
    return <Lightbulb />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-heading font-bold text-on-surface">
          Quản Lý Phòng
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Thêm Phòng
        </button>
      </div>

      {/* Default rooms */}
      <div className="mb-10">
        <h4 className="text-lg font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
          🛋️ Phòng Khách
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DeviceCard
            title="Đèn Chùm"
            icon={<Lightbulb />}
            isActive={data.devices.relay1}
            onClick={(state) => sendCommand("relay1", state)}
          />
          <DeviceCard
            title="TV Smart"
            icon={<Tv />}
            isActive={data.devices.relay2}
            onClick={(state) => sendCommand("relay2", state)}
            subtitle="Đang xem Netflix"
          />
        </div>
      </div>

      <div className="mb-10">
        <h4 className="text-lg font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
          🛏️ Phòng Ngủ Master
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DeviceCard
            title="Đèn Ngủ"
            icon={<Lightbulb />}
            isActive={data.devices.relay3}
            onClick={(state) => sendCommand("relay3", state)}
          />
        </div>
      </div>

      {/* Dynamic rooms */}
      {rooms.map((room) => (
        <div key={room.id} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-on-surface-variant flex items-center gap-2">
              🏠 {room.name}
            </h4>
            <button
              onClick={() => handleRemoveRoom(room.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DeviceCard
              title={room.deviceName}
              icon={getDeviceIcon(room.deviceName)}
              isActive={data.devices[room.relay]}
              onClick={(state) => sendCommand(room.relay, state)}
            />
          </div>
        </div>
      ))}

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-2xl w-96 max-w-full mx-4">
            <h4 className="text-xl font-bold mb-4">Thêm Phòng Mới</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên Phòng
                </label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, name: e.target.value })
                  }
                  className="w-full p-2 border border-surface-variant rounded-lg bg-surface-container"
                  placeholder="Ví dụ: Phòng Bếp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên Thiết Bị
                </label>
                <input
                  type="text"
                  value={newRoom.deviceName}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, deviceName: e.target.value })
                  }
                  className="w-full p-2 border border-surface-variant rounded-lg bg-surface-container"
                  placeholder="Ví dụ: Đèn Bếp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Relay Còn Trống
                </label>
                <select
                  value={newRoom.relay}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, relay: e.target.value })
                  }
                  className="w-full p-2 border border-surface-variant rounded-lg bg-surface-container"
                >
                  <option value="">Chọn relay</option>
                  {getAvailableRelays().map((relay) => (
                    <option key={relay} value={relay}>
                      {relay} (chưa dùng)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddRoom}
                className="flex-1 bg-primary text-on-primary py-2 rounded-lg hover:bg-primary/90"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-surface-variant text-on-surface py-2 rounded-lg hover:bg-surface-variant/80"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
