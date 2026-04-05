/**
 * Socket-related type definitions
 */
import type { InboxMessage } from "@/app/types/message.types";

export interface SocketState {
  socket: import("socket.io-client").Socket | null;
  subscribers: number;
  typingTimers: Map<string, ReturnType<typeof setTimeout>>;
}

export type PlainObject = Record<string, unknown>;

export interface SenderInfo {
  name: string;
  id: string;
}

export interface MessageAckPayload {
  tempId?: string;
  id?: string;
  status?: InboxMessage["status"];
}
