import { io, Socket as SocketIO } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://ryzlynodeserver-production.up.railway.app";

export const Socket: SocketIO = io(URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
});

Socket.on("connect", () => {
  console.log("Socket connected:", Socket.id);
});

Socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

Socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
