import { cn } from "@/app/utils/cn";
import { STATUS_META } from "../constants";
import type { BroadcastStatus } from "../types";

interface StatusPillProps {
  status: BroadcastStatus;
  size?: "sm" | "md";
}

const StatusPill = ({ status, size = "md" }: StatusPillProps) => {
  const meta = STATUS_META[status];
  const Icon = meta.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        meta.tone,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
      )}
    >
      <Icon
        className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")}
        strokeWidth={2.2}
      />
      {meta.label}
    </span>
  );
};

export default StatusPill;
