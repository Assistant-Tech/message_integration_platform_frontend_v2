import { cn } from "@/app/utils/cn";
import PlatformIcon from "@/app/components/common/Conversation/customer/PlatformIcons";
import { getAvatarUrl } from "@/app/utils/avatar";
import { getAvatarColour, type Platform } from "./helpers";

interface Props {
  name: string;
  platform: Platform;
  size?: "sm" | "md";
}

const avatarSizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
};

const iconSize = {
  sm: 14,
  md: 16,
};

const CustomerChatAvatar = ({ name, platform, size = "md" }: Props) => {
  return (
    <div className="relative flex-shrink-0">
      <img
        src={getAvatarUrl()}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          avatarSizeClass[size],
          getAvatarColour(name),
        )}
      />
      <span className="absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-base-white">
        <PlatformIcon platform={platform} size={iconSize[size]} />
      </span>
    </div>
  );
};

export default CustomerChatAvatar;
