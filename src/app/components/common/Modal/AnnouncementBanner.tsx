import { useBanner } from "@/app/context/BannerContext";
import { Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface AnnouncementBannerProps {
  children?: ReactNode;
  storageKey?: string;
}

const DEFAULT_KEY =
  import.meta.env.VITE_ANNOUNCEMENT_BANNER_KEY ||
  "announcement_banner_dismissed";

const AnnouncementBanner = ({ children }: AnnouncementBannerProps) => {
  const { bannerVisible, setBannerVisible } = useBanner();
  
  const handleClose = () => {
    localStorage.setItem(DEFAULT_KEY, "true");
    setBannerVisible(false);
  };

  if (!bannerVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-primary text-white px-2 py-2">
      <div className="mx-auto max-w-[1600px] w-full flex items-center justify-between">
        {/* Centered text */}
        <div className="flex-1 text-center">
          <Text
            size={{ initial: "2", sm: "3" }}
            weight="bold"
            className="h5-bold-16"
          >
            {children}
          </Text>
        </div>

        {/* Close button */}
        <button
          className="text-white hover:text-base-black hover:bg-white cursor-pointer ml-4 p-1 rounded-full shrink-0"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
