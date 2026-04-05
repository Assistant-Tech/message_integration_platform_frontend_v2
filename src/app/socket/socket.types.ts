// ─── socket.types.ts ─────────────────────────────────────────────────────────
// WebSocket types for Chatblix Message Integration Platform.
// Copy this file into the frontend project.
// Compatible with socket.io-client v4+
// Namespace: /chat

// ---------------------------------------------------------------------------
// Enums (mirror of Prisma schema)
// ---------------------------------------------------------------------------

export type ChannelType =
  | 'FACEBOOK'
  | 'INSTAGRAM'
  | 'WHATSAPP'
  | 'TIKTOK'
  | 'INTERNAL';

export type MessageType =
  | 'TEXT'
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'DOCUMENT'
  | 'QUICK_REPLY'
  | 'LOCATION'
  | 'CONTACT_CARD'
  | 'TEMPLATE'
  | 'NOTIFICATION'
  | 'SYSTEM';

export type MessageDirection = 'INCOMING' | 'OUTGOING' | 'INTERNAL';

export type MessageStatus =
  | 'PENDING'
  | 'RECIEVED'
  | 'SENT'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED';

export type SenderType = 'AGENT' | 'CUSTOMER' | 'BOT' | 'SYSTEM';

export type PresenceStatus = 'ONLINE' | 'OFFLINE';

export type ConversationType = 'INTERNAL' | 'CUSTOMER';

// ---------------------------------------------------------------------------
// inbox:event — unified discriminated union
// ---------------------------------------------------------------------------

export interface InboxNewMessageEvent {
  type: 'new_message';
  tenantId: string;
  message: {
    id: string;
    type: MessageType;
    direction: MessageDirection;
    senderType: SenderType;
    status: MessageStatus;
    content: string | null;
    channel: ChannelType;
    sentAt: string;                  // ISO 8601
    platformMessageId: string | null;
    conversation: {
      id: string;
      isNew: boolean;
    };
    sender: {
      contactId: string;
      name: string | null;
      profilePicUrl: string | null;
    } | null;
  };
  timestamp: string;
}

export interface InboxNewConversationEvent {
  type: 'new_conversation';
  tenantId: string;
  conversation: {
    id: string;
    channel: ChannelType | null;
    type: ConversationType;
  };
  firstMessage: {
    content: string;
    channel: ChannelType;
  } | null;
  timestamp: string;
}

export interface InboxMessageReadEvent {
  type: 'message_read';
  tenantId: string;
  messageId: string;
  conversationId: string;
  userId: string;
  readAt: string;                    // ISO 8601
  timestamp: string;
}

export interface InboxMessageReactionEvent {
  type: 'message_reaction';
  tenantId: string;
  messageId: string;
  conversationId: string;
  senderId: string;
  emoji: string;
  action: string;                    // 'add' | 'remove'
  timestamp: string;
}

/** Discriminated union — switch on `type` */
export type InboxEvent =
  | InboxNewMessageEvent
  | InboxNewConversationEvent
  | InboxMessageReadEvent
  | InboxMessageReactionEvent;

// ---------------------------------------------------------------------------
// Other server → client events
// ---------------------------------------------------------------------------

export interface TypingUpdateEvent {
  conversationId: string;
  tenantId: string;
  userId: string;
  isTyping: boolean;
}

export interface PresenceUpdateEvent {
  userId: string;
  status: PresenceStatus;
  tenantId: string;
  timestamp: string;
}

export interface UserLeftEvent {
  userId: string;
  name?: string;
}

export interface ChatConnectedEvent {
  userId: string;
  tenantId: string;
  timestamp: string;
}

export interface ChatErrorEvent {
  message: string;
}

export interface ChatPongEvent {
  timestamp: string;
}

export interface HeartbeatAckEvent {
  timestamp: string;
}

export interface TypingErrorEvent {
  message: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Client → server payloads
// ---------------------------------------------------------------------------

export interface ConversationPayload {
  conversationId: string;
}

export interface TypingPayload {
  conversationId: string;
}

// ---------------------------------------------------------------------------
// Additional server → client events
// ---------------------------------------------------------------------------

export interface ConversationJoinedEvent {
  conversationId: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Typed socket maps (pass to socket.io-client generics)
// ---------------------------------------------------------------------------

/**
 * Room routing summary:
 *
 *  tenant:{tenantId}                         — joined automatically on connect
 *    └─ inbox:event[new_message]             — new message notification
 *    └─ inbox:event[new_conversation]        — new conversation notification
 *    └─ presence:update / user:left
 *
 *  tenant:{tenantId}:conv:{conversationId}   — joined via conversation:join
 *    └─ inbox:event[message_read]            — read receipt
 *    └─ inbox:event[message_reaction]        — reaction add/remove
 *    └─ typing:update                        — typing indicator
 */
export interface ServerToClientEvents {
  'inbox:event':            (event: InboxEvent) => void;
  'typing:update':          (event: TypingUpdateEvent) => void;
  'presence:update':        (event: PresenceUpdateEvent) => void;
  'user:left':              (event: UserLeftEvent) => void;
  'chat:connected':         (event: ChatConnectedEvent) => void;
  'chat:error':             (event: ChatErrorEvent) => void;
  'chat:pong':              (event: ChatPongEvent) => void;
  'presence:heartbeat:ack': (event: HeartbeatAckEvent) => void;
  'typing:error':           (event: TypingErrorEvent) => void;
  'conversation:joined':    (event: ConversationJoinedEvent) => void;
}

export interface ClientToServerEvents {
  'conversation:join':  (payload: ConversationPayload) => void;
  'conversation:leave': (payload: ConversationPayload) => void;
  'typing:start':       (payload: TypingPayload) => void;
  'typing:stop':        (payload: TypingPayload) => void;
  'presence:heartbeat': () => void;
  'chat:ping':          () => void;
}

// ---------------------------------------------------------------------------
// Usage guide
// ---------------------------------------------------------------------------
//
// 1. CONNECT
//
//    import { io, Socket } from 'socket.io-client';
//    import { ServerToClientEvents, ClientToServerEvents, InboxEvent } from './socket.types';
//
//    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
//      'https://api.example.com/chat',
//      { auth: { token: '<jwt>' } },
//    );
//
// 2. CONNECTION LIFECYCLE
//
//    socket.on('chat:connected', ({ userId, tenantId }) => {
//      console.log('Connected as', userId);
//      startHeartbeat();
//    });
//
//    socket.on('chat:error', ({ message }) => {
//      console.error('Socket error:', message);
//    });
//
// 3. INBOX — one listener handles all inbox activity
//
//    socket.on('inbox:event', (event: InboxEvent) => {
//      switch (event.type) {
//        // ── Tenant room (always received, even without a conversation open) ──
//        case 'new_message':
//          // event.message.type        → TEXT | IMAGE | VIDEO | AUDIO | DOCUMENT | …
//          // event.message.direction   → INCOMING (customer) | OUTGOING (agent)
//          // event.message.senderType  → CUSTOMER | AGENT | BOT | SYSTEM
//          // event.message.status      → PENDING | SENT | DELIVERED | READ | FAILED
//          // event.message.sender      → { contactId, name, profilePicUrl }
//          // event.message.conversation.isNew → true on first ever message
//          handleNewMessage(event);
//          break;
//
//        case 'new_conversation':
//          handleNewConversation(event);
//          break;
//
//        // ── Conversation room (only received after conversation:join) ─────────
//        case 'message_read':
//          markMessageRead(event.messageId, event.readAt);
//          break;
//
//        case 'message_reaction':
//          updateReaction(event.messageId, event.emoji, event.action);
//          break;
//      }
//    });
//
// 4. CONVERSATION ROOMS — join when opening a conversation, leave when closing
//
//    // On conversation open:
//    socket.emit('conversation:join', { conversationId: 'uuid' });
//    socket.on('conversation:joined', ({ conversationId }) => {
//      console.log('Now in conversation room, real-time updates active');
//    });
//
//    // On conversation close / navigate away:
//    socket.emit('conversation:leave', { conversationId: 'uuid' });
//
// 4. TYPING INDICATORS
//
//    socket.on('typing:update', ({ conversationId, userId, isTyping }) => {
//      showTypingIndicator(conversationId, userId, isTyping);
//    });
//
//    // Emit when the agent starts/stops typing (throttle on your side)
//    socket.emit('typing:start', { conversationId: 'uuid' });
//    socket.emit('typing:stop',  { conversationId: 'uuid' });
//
// 5. PRESENCE
//
//    socket.on('presence:update', ({ userId, status }) => {
//      updateUserStatus(userId, status); // 'ONLINE' | 'OFFLINE'
//    });
//
//    socket.on('user:left', ({ userId }) => {
//      removeUserFromActiveList(userId);
//    });
//
// 6. HEARTBEAT — call every 30s to keep presence alive
//
//    function startHeartbeat() {
//      setInterval(() => socket.emit('presence:heartbeat'), 30_000);
//    }
