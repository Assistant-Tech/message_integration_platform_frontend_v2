import { Platform } from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import PlatformIcon from "../common/Conversation/customer/PlatformIcons";
import { cn } from "@/app/utils/cn";
import { getAvatarUrl } from "@/app/utils/avatar";

const AVATAR_COLOURS: [string, ...string[]] = [
  "bg-violet-200 text-violet-700",
  "bg-blue-200 text-blue-700",
  "bg-emerald-200 text-emerald-700",
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

export const ConversationAvatar = ({
  name,
  platform,
}: {
  name: string;
  platform: Platform;
}) => (
  <div className="relative flex-shrink-0">
    <img
      src={getAvatarUrl()}
      alt={name}
      className={cn("h-12 w-12 rounded-full object-cover", avatarColour(name))}
    />
    <span className="absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-base-white">
      <PlatformIcon platform={platform} size={18} />
    </span>
  </div>
);
