import { io } from "socket.io-client";
import { store } from '../redux/store';

const SOCKET_URL = "https://www.api-supercanteen.webseeder.tech";

let socket = null;

export const initSocket = () => {
  if (!socket) {
    const { user } = store.getState().auth;

    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      query: {
        userId: user?.id,
      },
      auth: {
        token: user?.token,
      }
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
      socket.emit("joinUserRoom", user?.id); // Emit after connect
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket connect error:", err.message);
    });

    socket.onAny((event, ...args) => {
      console.log("📡 Socket Event =>", event, args);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Disconnected from socket:", reason);
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("🧹 Disconnecting socket");
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};
