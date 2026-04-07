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

export type { ChannelType as Platform } from "@/app/types/common.types";

// toUISender has been moved to @/app/utils/inbox/messageAdapters
export { toUISender } from "@/app/utils/inbox/messageAdapters";

// Notify the parent window (or any listener) about the OAuth result
export function notifyParent(
  type: "OAUTH_CONNECTED" | "OAUTH_FAILED",
  pages?: unknown[],
) {
  const message = { type, pages };

  try {
    const ch = new BroadcastChannel("oauth-meta");
    ch.postMessage(message);
    setTimeout(() => ch.close(), 800);
  } catch {
    /* BroadcastChannel not available */
  }

  try {
    window.opener?.postMessage(message, "*");
  } catch {
    /* opener gone */
  }

  setTimeout(() => {
    try {
      window.close();
    } catch {
      /* ignore */
    }
  }, 1000);
}
