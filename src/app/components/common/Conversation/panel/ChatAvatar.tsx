import { cn } from "@/app/utils/cn";
import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import { getAvatarColour, type Platform } from "./helpers";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/app/constants/image-cloudinary";

interface Props {
  name: string;
  platform: Platform;
  url?: string | undefined | null;
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

const ChatAvatar = ({ name, platform, url, size = "md" }: Props) => {
  return (
    <div className="relative flex-shrink-0">
      <img
        src={url ? url : DEFAULT_PROFILE_IMAGE_URL}
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

export default ChatAvatar;
