import type { LucideIcon } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const QuickAction = ({
  icon: Icon,
  label,
  onClick,
  disabled = false,
}: QuickActionProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    title={label}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      disabled
        ? "cursor-not-allowed border-grey-light/60 bg-base-white text-grey-light"
        : "border-grey-light bg-base-white text-grey-medium hover:-translate-y-0.5 hover:border-primary hover:bg-primary-light/40 hover:text-primary hover:shadow-sm",
    )}
  >
    <Icon className="h-3.5 w-3.5" />
  </button>
);

export default QuickAction;
