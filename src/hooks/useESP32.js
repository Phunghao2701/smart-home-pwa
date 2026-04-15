import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

export const useESP32 = (brokerUrl = "ws://broker.emqx.io:8083/mqtt") => {
  const [data, setData] = useState({
    temperature: 0,
    connected: false,
    logs: [], // Thêm array logs
    devices: {
      relay1: false, // Phản ánh trạng thái từ JSON { "temperature": 25, "relay1": true }
      relay2: false,
      relay3: false,
      relay4: false
    }
  });
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    console.log(`Đang kết nối tới MQTT Broker: ${brokerUrl}...`);
    // Kết nối MQTT qua WebSocket (port 8083 mặc định hoặc theo URL bạn truyền vào)
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on('connect', () => {
      console.log('Đã kết nối MQTT Broker!');
      setIsConnected(true);
      // Subscribe vào Topic của ESP32 để nhận dữ liệu
      mqttClient.subscribe('smarthome/esp32/status');
      mqttClient.subscribe('smarthome/esp32/log'); // Thêm subscribe log
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'smarthome/esp32/status') {
        try {
          const payload = JSON.parse(message.toString());
          console.log('Nhận dữ liệu từ ESP32:', payload);
          // Cập nhật state UI với payload thực tế
          setData(prev => ({
            ...prev,
            temperature: payload.temperature !== undefined ? payload.temperature : prev.temperature,
            connected: payload.connected !== undefined ? payload.connected : prev.connected,
            devices: {
              ...prev.devices,
              relay1: payload.relay1 !== undefined ? payload.relay1 : prev.devices.relay1,
              relay2: payload.relay2 !== undefined ? payload.relay2 : prev.devices.relay2,
              relay3: payload.relay3 !== undefined ? payload.relay3 : prev.devices.relay3,
              relay4: payload.relay4 !== undefined ? payload.relay4 : prev.devices.relay4,
            }
          }));
        } catch (e) {
          console.error("Lỗi parse JSON từ MQTT", e);
        }
      } else if (topic === 'smarthome/esp32/log') {
        try {
          const logEntry = JSON.parse(message.toString());
          console.log('Nhận log từ ESP32:', logEntry);
          setData(prev => ({
            ...prev,
            logs: [logEntry, ...prev.logs].slice(0, 10) // Giữ 10 log gần nhất
          }));
        } catch (e) {
          console.error("Lỗi parse log JSON", e);
        }
      }
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error: ', err);
      mqttClient.end();
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
        console.log('Ngắt kết nối MQTT.');
      }
    };
  }, [brokerUrl]);

  // Hàm để gửi lệnh xuống ESP32
  const sendCommand = (deviceId, state) => {
    console.log(`Gửi lệnh điều khiển MQTT: [${deviceId}] -> ${state}`);
    if (client && isConnected) {
      // Publish payload JSON điều khiển thiết bị
      const payload = JSON.stringify({ [deviceId]: state });
      client.publish('smarthome/esp32/control', payload);
      
      // Lạc quan cập nhật UI ngay lập tức (tuỳ chọn)
      setData(prev => ({
        ...prev,
        devices: { ...prev.devices, [deviceId]: state },
        logs: [{ 
          event: `${getDeviceName(deviceId)} ${state ? 'bật' : 'tắt'}`, 
          type: 'automation', 
          timestamp: Date.now() 
        }, ...prev.logs].slice(0, 10)
      }));
    } else {
      console.warn("Chưa kết nối MQTT Broker, không thể gửi lệnh.");
    }
  };

  // Hàm lấy tên thiết bị
  const getDeviceName = (deviceId) => {
    const names = {
      relay1: 'Đèn Chùm (Relay 1)',
      relay2: 'Quạt Trần (Relay 2)',
      relay3: 'Loa (Relay 3)',
      relay4: 'Khóa (Relay 4)'
    };
    return names[deviceId] || deviceId;
  };

  return { data, isConnected, sendCommand };
};
