export interface Channel {
  _id: string;
  title: string;
  type: "internal" | "whatsapp" | "facebook" | "instagram" | "tiktok";
  isDefault: boolean;
  priority: string;
  participants: string[];
  unreadCount?: number;
  isPrivate?: boolean;
}
