import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

export type BroadcastStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "partial"
  | "failed"
  | "paused";

export interface BroadcastAudience {
  /** Saved-segment id. For inline-picked filters, prefix with `inline:`. */
  segmentId: string;
  label: string;
  /** Resolved recipient count at the time of last preview. */
  size: number;
}

export interface BroadcastMessage {
  body: string;
  /** WhatsApp-only. Other channels ignore. */
  templateId?: string;
  /** Template variable substitutions, keyed by placeholder name. */
  variables?: Record<string, string>;
  /** Attachment URLs. TODO: upload flow wires in when file service lands. */
  attachments?: string[];
}

export interface BroadcastSchedule {
  mode: "immediate" | "scheduled";
  /** ISO string; present only when mode === "scheduled". */
  sendAt?: string;
  /** IANA tz; defaults to tenant tz server-side. */
  timezone?: string;
}

export interface BroadcastMetrics {
  sent: number;
  delivered: number;
  read: number;
  failed: number;
}

export interface Broadcast {
  id: string;
  name: string;
  status: BroadcastStatus;
  channel: Platform;
  audience: BroadcastAudience;
  message: BroadcastMessage;
  schedule: BroadcastSchedule;
  metrics?: BroadcastMetrics;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type BroadcastDraft = Omit<
  Broadcast,
  "id" | "status" | "metrics" | "createdAt" | "updatedAt" | "createdBy"
>;
