import { useBanner } from "@/app/context/BannerContext";
import { Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import clsx from "clsx";

interface AnnouncementBannerProps {
  message?: string;
  type?: "info" | "warning" | "success" | "error";
  storageKey?: string;
  nonDismissable?: boolean;
}

const AnnouncementBanner = ({
  message,
  type = "info",
  storageKey,
  nonDismissable = false,
}: AnnouncementBannerProps) => {
  const { isVisible, dismiss } = useBanner();

  const key = storageKey || "announcement_banner_dismissed";
  const visible = nonDismissable ? true : isVisible(key);

  if (!visible) return null;

  const handleClose = () => {
    if (!nonDismissable) dismiss(key);
  };

  return (
    <div
      className={clsx("fixed top-0 left-0 right-0 z-50 px-3 py-2 text-white", {
        "bg-warning": type === "warning",
        "bg-information": type === "info",
        "bg-primary": type === "success",
        "bg-danger": type === "error",
      })}
    >
      <div className="mx-auto max-w-[1600px] flex items-center justify-between">
        <div className="flex-1 text-center">
          <Text size={{ initial: "2", sm: "3" }} weight="bold">
            {message}
          </Text>
        </div>

        {!nonDismissable && (
          <button
            className="text-white hover:bg-white hover:text-black ml-3 p-1 rounded-full transition"
            onClick={handleClose}
            aria-label="Close banner"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
