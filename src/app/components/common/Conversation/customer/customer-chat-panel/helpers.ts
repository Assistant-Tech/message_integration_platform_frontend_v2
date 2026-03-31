import { MessageSenderType, UISenderType } from "@/app/types/inbox.types";

const AVATAR_COLOURS: [string, ...string[]] = [
  "bg-violet-200 text-violet-700",
  "bg-blue-200 text-blue-700",
  "bg-emerald-200 text-emerald-700",
  "bg-rose-200 text-rose-700",
  "bg-amber-200 text-amber-700",
];

export function getAvatarColour(name: string): string {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = name.charCodeAt(index) + hash * 31;
  }
  return (
    AVATAR_COLOURS[Math.abs(hash) % AVATAR_COLOURS.length] ?? AVATAR_COLOURS[0]
  );
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatMessageTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export type Platform = "FACEBOOK" | "WHATSAPP" | "TIKTOK" | "INSTAGRAM";

export const PLATFORM_LABELS: Record<Platform, string> = {
  FACEBOOK: "Facebook",
  WHATSAPP: "WhatsApp",
  TIKTOK: "TikTok",
  INSTAGRAM: "Instagram",
};

export function toUISender(senderType: MessageSenderType): UISenderType {
  switch (senderType) {
    case "AGENT":
      return "AGENT";
    case "CUSTOMER":
    case "CONTACT":
      return "CUSTOMER";
    default:
      return "SYSTEM";
  }
}
