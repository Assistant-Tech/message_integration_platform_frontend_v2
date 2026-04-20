import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface ProfileRowProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  copyable?: boolean;
  copied?: boolean;
  onCopy?: () => void;
}

const ProfileRow = ({
  icon: Icon,
  label,
  value,
  copyable = false,
  copied = false,
  onCopy,
}: ProfileRowProps) => (
  <div className="group flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
    <dt className="flex items-center gap-2 text-xs text-grey-medium">
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      {label}
    </dt>
    <dd className="flex min-w-0 items-center gap-1.5 text-right">
      <span className="truncate text-xs font-medium text-grey">{value}</span>
      {copyable && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className={cn(
            "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all",
            "opacity-0 group-hover:opacity-100",
            copied
              ? "bg-success-light text-success-dark opacity-100"
              : "text-grey-medium hover:bg-primary-light hover:text-primary",
          )}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>
      )}
    </dd>
  </div>
);

export default ProfileRow;
