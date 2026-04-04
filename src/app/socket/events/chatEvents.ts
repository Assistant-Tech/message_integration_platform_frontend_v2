export const CHAT_EVENTS = {
  // Chat Mesages and handling Events
  CHAT_MESSAGE: "chat:message",
  CHAT_PONG: "chat:pong",
  CHAT_CONNECTED: "chat:connected",

  // Conversation Events
  CONVERSATION_CREATED: "conversation:created",
  CONVERSATION_JOINED: "conversation:joined",
  CONVERSATION_MEMBER_ADDED: "conversation:members_added",

  // Inbox Events
  INBOX_MESSAGE: "inbox:message",
  NEW_INBOX_MESSAGE: "inbox:new",
  INBOX_MESSAGE_ACK: "message:ack",

  // in chatEvents.ts
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
} as const;
