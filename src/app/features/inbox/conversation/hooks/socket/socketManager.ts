/**
 * Socket singleton management
 *
 * Handles:
 * - Single socket instance creation and storage
 * - Subscriber counting for lifecycle management
 * - Socket URL construction
 */

import { io, Socket } from "socket.io-client";
import type { SocketState } from "./types";

// ────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────────────────────────────────

const SOCKET_URL = buildSocketUrl(import.meta.env.VITE_SOCKET_URL as string);

/**
 * Build socket URL with /chat suffix if not present
 * Handles various API configurations gracefully
 */
function buildSocketUrl(raw: string): string {
  const base = raw.replace(/\/+$/, "");
  return base.endsWith("/chat") ? base : `${base}/chat`;
}

// ────────────────────────────────────────────────────────────────────────────
// SINGLETON STATE
// ────────────────────────────────────────────────────────────────────────────

const socketState: SocketState = {
  socket: null,
  subscribers: 0,
  typingTimers: new Map(),
};

// ────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────

export { socketState, SOCKET_URL };

/**
 * Create and return singleton socket instance
 * @param accessToken - Authorization token for socket connection
 * @returns Socket instance
 */
export function getOrCreateSocket(accessToken: string): Socket {
  if (!socketState.socket) {
    socketState.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      auth: { token: accessToken },
      query: { token: accessToken },
    });
  }
  return socketState.socket;
}

/**
 * Increment subscriber count
 */
export function addSubscriber(): void {
  socketState.subscribers += 1;
}

/**
 * Decrement subscriber count and clean up if needed
 * @returns true if socket was disconnected (count reached 0)
 */
export function removeSubscriber(): boolean {
  socketState.subscribers -= 1;

  if (socketState.subscribers <= 0 && socketState.socket) {
    socketState.socket.disconnect();
    socketState.socket = null;

    // Clear all typing timers
    socketState.typingTimers.forEach(clearTimeout);
    socketState.typingTimers.clear();

    return true;
  }

  return false;
}

/**
 * Check if socket is currently connected
 */
export function isSocketConnected(): boolean {
  return socketState.socket?.connected ?? false;
}
