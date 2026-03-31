import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";
import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import { cn } from "@/app/utils/cn";
import { Platform } from "@/app/components/common/Conversation/customer/customer-chat-panel/helpers";

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
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
}: PlatformIconProps) => (
  <img
    src={PLATFORM_ICON_SRC[platform]}
    alt={PLATFORM_ALT[platform]}
    width={size}
    height={size}
    className={cn(className, "bg-white")}
  />
);

export default PlatformIcon;

// ─── Badge ring colour per platform ──────────────────────────────────────────

export const PLATFORM_RING: Record<Platform, string> = {
  facebook: "ring-blue-500",
  instagram: "ring-pink-500",
  tiktok: "ring-gray-900",
  whatsapp: "ring-green-500",
};
