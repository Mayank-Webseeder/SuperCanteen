import { io } from "socket.io-client";

const SOCKET_URL = "https://www.api-supercanteen.webseeder.tech"; 

let socket = null;

// Initialize Socket
export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // Better for mobile
      reconnectionAttempts: 5, // Retry 5 times
      reconnectionDelay: 1000, // 1s between retries
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO");
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });
  }
  return socket;
};

// Get the active socket instance
export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized!");
  return socket;
};

// Disconnect socket (call when app closes)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};