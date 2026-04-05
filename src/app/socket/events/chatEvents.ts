export const CHAT_EVENTS = {
  // Connection (server → client)
  CHAT_CONNECTED: "chat:connected",
  CHAT_ERROR: "chat:error",
  CHAT_PING: "chat:ping",
  CHAT_PONG: "chat:pong",

  // Unified inbox event — switch on event.type (server → client)
  // Types: 'new_message' | 'new_conversation' | 'message_read' | 'message_reaction'
  INBOX_EVENT: "inbox:event",

  // Conversation room management (client → server)
  CONVERSATION_JOIN: "conversation:join",
  CONVERSATION_LEAVE: "conversation:leave",
  // ACK received after conversation:join (server → client)
  CONVERSATION_JOINED: "conversation:joined",

  // Typing — client emits these to signal own typing
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
  // Server broadcasts typing state for the conversation room (server → client)
  TYPING_UPDATE: "typing:update",

  // Presence (server → client, tenant room)
  PRESENCE_UPDATE: "presence:update",
  USER_LEFT: "user:left",
  PRESENCE_HEARTBEAT: "presence:heartbeat",
  PRESENCE_HEARTBEAT_ACK: "presence:heartbeat:ack",
} as const;
