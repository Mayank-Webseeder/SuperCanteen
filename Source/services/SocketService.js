import { io } from "socket.io-client";
import { store } from '../redux/store'

const SOCKET_URL = "https://www.api-supercanteen.webseeder.tech"; 

let socket = null;

export const initSocket = () => {
  if (!socket) {
    const { user } = store.getState().auth;
    
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      auth: {
        token: user?.token // Use actual user token from your auth state
      }
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    socket.on("error", (err) => {
      console.log("Socket error:", err);
    });
  }
  return socket;
};


export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized!");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};