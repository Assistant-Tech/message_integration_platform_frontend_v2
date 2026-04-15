import {
  Inbox as InboxIcon,
  AtSign,
  UserCircle,
  UserX,
  Users,
  Briefcase,
  Workflow,
  BarChart3,
  LineChart,
  Send,
  Mail,
  Phone,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

interface QueueItem {
  id: InboxView;
  label: string;
  Icon: LucideIcon;
}

interface SecondaryItem {
  to: string;
  label: string;
  Icon: LucideIcon;
}

export type ChannelItem =
  | {
      kind: "platform";
      platform: Platform;
      label: string;
      locked?: false;
    }
  | {
      kind: "beta";
      platform: Platform;
      label: string;
      locked?: false;
    }
  | {
      kind: "soon";
      Icon: LucideIcon;
      label: string;
      locked: true;
    };

export type InboxView =
  | "all"
  | "mentions"
  | "mine"
  | "unassigned"
  | "customer"
  | "team";

export const SECONDARY_ITEMS: SecondaryItem[] = [
  { to: "#assignment-rules", label: "Assignment rules", Icon: Workflow },
  { to: "#reports", label: "Reports", Icon: BarChart3 },
  { to: "#analytics", label: "Analytics", Icon: LineChart },
];

export const QUEUE_ITEMS: QueueItem[] = [
  { id: "all", label: "All", Icon: InboxIcon },
  { id: "mentions", label: "Mentions", Icon: AtSign },
  { id: "mine", label: "Assigned to me", Icon: UserCircle },
  { id: "unassigned", label: "Unassigned", Icon: UserX },
  { id: "customer", label: "Customers", Icon: Users },
  { id: "team", label: "Team", Icon: Briefcase },
];

export const CHANNEL_ITEMS: ChannelItem[] = [
  { kind: "platform", platform: "FACEBOOK", label: "Facebook" },
  { kind: "platform", platform: "INSTAGRAM", label: "Instagram" },
  { kind: "platform", platform: "TIKTOK", label: "TikTok" },
  { kind: "beta", platform: "WHATSAPP", label: "WhatsApp" },
  { kind: "soon", Icon: Send, label: "Telegram", locked: true },
  { kind: "soon", Icon: Mail, label: "Mail", locked: true },
  { kind: "soon", Icon: Phone, label: "Viber", locked: true },
  { kind: "soon", Icon: MessageSquare, label: "SMS", locked: true },
];

export const formatCount = (n?: number) => {
  if (!n || n <= 0) return null;
  if (n > 999) return "999+";
  return String(n);
};
