import { useAuthStore } from "@/app/store/auth.store";
import { useSocketStore } from "@/app/store/socket.store";
import { io, Socket } from "socket.io-client";
import { CUSTOM_EVENTS } from "@/app/socket/events/customEvents";

let socket: Socket | null = null;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;

export const connectSubscriptionSocket = () => {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    console.error("❌ No access token found");
    return;
  }

  if (socket?.connected) {
    console.log("✅ Socket already connected");
    return;
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    query: {
      EIO: "4",
      transport: "websocket",
      auth: { token },
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  // Starting the socket connection
  socket.on("connect", () => {
    console.log("Connected to socket of `/subscription`");
    useSocketStore.getState().setStatus("connected");
  });

  // disconnecting the socket connection
  socket.on("disconnect", (reason) => {
    console.log("Disconnect");
    if (socket?.active) {
      console.log("Temporary Disconnection, will connect as soon as possbile");
    } else {
      console.log(reason);
      useSocketStore.getState().setStatus("disconnected");
    }
  });

  // Socket connection error
  socket.on("connect_error", (err) => {
    if (socket?.active) {
      console.log(
        "Temporary Socket failure, will reconnect as soon as possible",
      );
    } else {
      console.log("Connection Error", err.message);
      useSocketStore.getState().setStatus("error");
    }
  });

  //  Socket success and data set response
  socket.on(CUSTOM_EVENTS.SUBSCRIPTION_EVENT, (data) => {
    console.log("🔥 Raw socket data:", data);
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    const event = new CustomEvent(CUSTOM_EVENTS.SUBSCRIPTION_EVENT, {
      detail: parsedData,
    });
    window.dispatchEvent(event);
  });
};

export const disconnectSubscriptionSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    useSocketStore.getState().setStatus("disconnected");
    console.log("Disconnected from /subscription WebSocket");
  }
};
