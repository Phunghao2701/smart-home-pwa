import React from "react";

export default function ActivityLog({ logs = [] }) {
  const getTypeColor = (type) => {
    switch (type) {
      case "automation":
        return "bg-primary";
      case "system":
        return "bg-outline";
      case "alert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "Vừa xong";
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    return `${hours} giờ trước`;
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6">
      <div className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-on-surface-variant text-center py-4">
            Chưa có hoạt động nào
          </p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-surface-variant pb-4 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="font-semibold text-on-surface">{log.event}</p>
                <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getTypeColor(log.type)}`}
                  ></span>
                  {log.type === "automation"
                    ? "Automation"
                    : log.type === "system"
                      ? "System"
                      : "Cảnh báo"}
                </p>
              </div>
              <span className="text-sm font-medium text-on-surface-variant">
                {formatTime(log.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
