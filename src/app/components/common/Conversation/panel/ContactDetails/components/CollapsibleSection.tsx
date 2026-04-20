import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const CollapsibleSection = ({
  title,
  icon: Icon,
  open,
  onToggle,
  children,
}: CollapsibleSectionProps) => (
  <section className="overflow-hidden rounded-2xl border border-grey-light bg-base-white">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-primary-light/20"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-grey-medium" />
        <span className="text-xs font-semibold uppercase tracking-wide text-grey-medium">
          {title}
        </span>
      </span>
      <ChevronDown
        className={cn(
          "h-4 w-4 text-grey-medium transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div className="px-4 pb-4 pt-1">{children}</div>
      </div>
    </div>
  </section>
);

export default CollapsibleSection;
