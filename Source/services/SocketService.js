import { io } from "socket.io-client";
import { SOCKET_URL } from "@constants/env";

let socketInstance = null;


export const initializeSocket = (userId) => {
   if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
  }

  socketInstance = io(SOCKET_URL, {
    auth: { userId },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socketInstance.on("connect", () => {
    console.log("🟢 Socket connected:", socketInstance.id);
  });

  socketInstance.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  socketInstance.on("connect_error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  return socketInstance;
};

export const isSocketConnected = () => socketInstance && socketInstance.connected;

export const getSocket = () => {
  if (!socketInstance) throw new Error("Socket not initialized");
  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    console.log("🛑 Socket manually disconnected");
  }
};

export const getActiveSocket = () => {
  if (!socketInstance) throw new Error("Socket not initialized");
  return socketInstance;
};