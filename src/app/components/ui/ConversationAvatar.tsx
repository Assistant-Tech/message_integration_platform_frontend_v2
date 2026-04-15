import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import { cn } from "@/app/utils/cn";
import { Platform } from "@/app/components/common/Conversation/panel/helpers";

const AVATAR_COLOURS: [string, ...string[]] = [
  "bg-violet-200 text-violet-700",
  "bg-blue-200 text-information-dark",
  "bg-emerald-200 text-success-dark",
  "bg-rose-200 text-rose-700",
  "bg-amber-200 text-amber-700",
];

const avatarColour = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return (
    AVATAR_COLOURS[Math.abs(hash) % AVATAR_COLOURS.length] ?? AVATAR_COLOURS[0]
  );
};

const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export const ConversationAvatar = ({
  name,
  platform,
  hasUnread = false,
  avatarUrl,
}: {
  name: string;
  platform?: Platform;
  hasUnread?: boolean;
  avatarUrl?: string | null;
}) => (
  <div className="relative flex-shrink-0">
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt={name}
        className="h-12 w-12 rounded-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          (
            e.currentTarget.nextElementSibling as HTMLElement | null
          )?.style.setProperty("display", "flex");
        }}
      />
    ) : null}
    <div
      className={cn(
        "h-12 w-12 rounded-full items-center justify-center text-sm font-semibold select-none",
        avatarColour(name),
        avatarUrl ? "hidden" : "flex",
      )}
      aria-hidden={!!avatarUrl}
    >
      {initials(name)}
    </div>
    <span className="absolute -bottom-0 -right-0.5 rounded-full">
      {platform && (
        <PlatformIcon platform={platform} size={18} showUnreadDot={hasUnread} />
      )}
    </span>
  </div>
);
