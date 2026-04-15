import {
  CircleDot,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PauseCircle,
  type LucideIcon,
} from "lucide-react";
import type { BroadcastStatus } from "./types";
import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

interface StatusMeta {
  label: string;
  Icon: LucideIcon;
  /** Tailwind utility pair for tinted pill: bg + text. */
  tone: string;
}

export const STATUS_META: Record<BroadcastStatus, StatusMeta> = {
  draft: {
    label: "Draft",
    Icon: CircleDot,
    tone: "bg-grey-light text-grey-medium",
  },
  scheduled: {
    label: "Scheduled",
    Icon: Clock,
    tone: "bg-primary-light/60 text-primary",
  },
  sending: {
    label: "Sending",
    Icon: Send,
    tone: "bg-warning/10 text-warning",
  },
  sent: {
    label: "Sent",
    Icon: CheckCircle2,
    tone: "bg-success-dark/10 text-success-dark",
  },
  partial: {
    label: "Partial",
    Icon: AlertTriangle,
    tone: "bg-warning/10 text-warning",
  },
  failed: {
    label: "Failed",
    Icon: XCircle,
    tone: "bg-danger/10 text-danger",
  },
  paused: {
    label: "Paused",
    Icon: PauseCircle,
    tone: "bg-grey-light text-grey",
  },
};

export const CHANNEL_OPTIONS: { id: Platform; label: string; available: boolean }[] = [
  { id: "WHATSAPP", label: "WhatsApp", available: true },
  { id: "FACEBOOK", label: "Facebook Messenger", available: true },
  { id: "INSTAGRAM", label: "Instagram DM", available: true },
  { id: "TIKTOK", label: "TikTok", available: true },
];

export const STATUS_FILTERS: { id: BroadcastStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "sending", label: "Sending" },
  { id: "sent", label: "Sent" },
  { id: "failed", label: "Failed" },
];
