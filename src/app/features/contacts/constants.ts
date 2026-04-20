import type { ContactStatus } from "./types";

export const STATUS_STYLES: Record<
  ContactStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  active: {
    label: "Active",
    bg: "bg-success-light",
    text: "text-success",
    dot: "bg-success",
  },
  inactive: {
    label: "Inactive",
    bg: "bg-grey-light",
    text: "text-grey-medium",
    dot: "bg-grey-medium",
  },
  blocked: {
    label: "Blocked",
    bg: "bg-danger-light",
    text: "text-danger",
    dot: "bg-danger",
  },
};

export const CHANNEL_META: Record<string, { label: string; color: string }> = {
  WHATSAPP: { label: "WhatsApp", color: "#25D366" },
  FACEBOOK: { label: "Facebook", color: "#1877F2" },
  INSTAGRAM: { label: "Instagram", color: "#E1306C" },
  TIKTOK: { label: "TikTok", color: "#000000" },
};
