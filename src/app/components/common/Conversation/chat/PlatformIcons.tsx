import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";
import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import { cn } from "@/app/utils/cn";
import { Platform } from "@/app/components/common/Conversation/panel/helpers";

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
  showUnreadDot?: boolean;
}

const PLATFORM_ICON_SRC: Record<Platform, string> = {
  FACEBOOK: fbIcon,
  INSTAGRAM: instaIcon,
  TIKTOK: tiktokIcon,
  WHATSAPP: whatsappIcon,
};

const PLATFORM_ALT: Record<Platform, string> = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  TIKTOK: "TikTok",
  WHATSAPP: "WhatsApp",
};

const PlatformIcon = ({
  platform,
  size = 20,
  className = "",
  showUnreadDot = false,
}: PlatformIconProps) => (
  <span className="relative inline-flex">
    <img
      src={PLATFORM_ICON_SRC[platform]}
      alt={PLATFORM_ALT[platform]}
      width={size}
      height={size}
      className={cn(className, PLATFORM_RING[platform])}
    />
    {showUnreadDot && (
      <span
        className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-danger "
        aria-label={`${PLATFORM_ALT[platform]} has unread messages`}
      />
    )}
  </span>
);

export default PlatformIcon;

// ─── Badge ring colour per platform ──────────────────────────────────────────

export const PLATFORM_RING: Record<Platform, string> = {
  FACEBOOK: "ring-blue-500",
  INSTAGRAM: "ring-pink-500",
  TIKTOK: "ring-gray-900",
  WHATSAPP: "ring-green-500",
};
