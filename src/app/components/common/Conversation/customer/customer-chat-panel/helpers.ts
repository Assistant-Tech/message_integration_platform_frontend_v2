import type {
  CustomerConversation,
  Platform,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import { PLATFORM_LABELS } from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";

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

export function getPlatformSubtitle(conv: CustomerConversation): string {
  const platform = PLATFORM_LABELS[conv.platform];
  const status = conv.status.charAt(0).toUpperCase() + conv.status.slice(1);

  return `${platform} · ${status}`;
}

export type { Platform };
