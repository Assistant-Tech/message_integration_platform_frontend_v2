import type { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

interface PillProps {
  tone: string;
  children: ReactNode;
}

const Pill = ({ tone, children }: PillProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1",
      tone,
    )}
  >
    {children}
  </span>
);

export default Pill;
