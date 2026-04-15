import React from "react";

export default function Header({
  data = { temperature: 0, connected: false },
}) {
  const today = new Date();
  const dateString = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex justify-between items-end mb-10">
      <div>
        <p className="text-on-surface-variant mb-1 font-medium">{dateString}</p>
        <h2 className="text-4xl font-heading font-bold tracking-tight text-on-surface">
          Good Morning, P.Hào
        </h2>
        <p className="text-on-surface-variant mt-2 text-lg">
          Trạng thái mạng:
          {data.connected ? (
            <span className="text-green-600 font-semibold ml-2">
              Trực Tuyến
            </span>
          ) : (
            <span className="text-red-500 font-semibold ml-2">Đang Chờ...</span>
          )}
        </p>
      </div>

      <div className="flex gap-4">
        <div className="bg-surface-container-low px-5 py-3 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">
              Nhiệt độ (ESP32)
            </p>
            <p className="text-xl font-heading font-bold">
              {data.temperature}°C
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
