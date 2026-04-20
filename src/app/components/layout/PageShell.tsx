import type { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

/**
 * Canonical page container for every admin-surface route.
 *
 * Owns: background, horizontal+vertical page padding, max-width constraint,
 * and the scroll model (page-scroll vs fill-parent with inner scroll).
 *
 * Individual pages MUST NOT set their own outer padding or background —
 * compose via this primitive so the app feels unified.
 */

type PageShellVariant = "scroll" | "fill";
type PageShellBackground = "app" | "tint" | "plain";
type PageShellMaxWidth = "md" | "lg" | "xl" | "2xl" | "7xl" | "8xl" | "full";

export interface PageShellProps {
  children: ReactNode;
  /** `scroll` lets the parent scroll (list pages). `fill` owns inner scroll (inbox, broadcast detail). */
  variant?: PageShellVariant;
  background?: PageShellBackground;
  maxWidth?: PageShellMaxWidth;
  /** When provided, rendered above `children` using PageHeader conventions. */
  as?: "div" | "section" | "main";
  className?: string;
}

const BACKGROUND: Record<PageShellBackground, string> = {
  app: "bg-gradient-to-br from-base-white to-grey-light/40",
  tint: "bg-primary-light/10",
  plain: "bg-base-white",
};

const MAX_W: Record<PageShellMaxWidth, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  "7xl": "max-w-[90rem]",
  "8xl": "max-w-8xl",
  full: "max-w-full",
};

const GUTTER_X = "px-4 sm:px-6 lg:px-8";
const GUTTER_Y = "py-6 lg:py-8";

const PageShell = ({
  children,
  variant = "scroll",
  background = "app",
  maxWidth = "8xl",
  as = "section",
  className,
}: PageShellProps) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        variant === "scroll"
          ? "min-h-full w-full overflow-y-auto"
          : "flex h-full min-h-0 w-full flex-col overflow-hidden",
        BACKGROUND[background],
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          MAX_W[maxWidth],
          GUTTER_X,
          GUTTER_Y,
          variant === "fill" && "flex min-h-0 flex-1 flex-col",
        )}
      >
        {children}
      </div>
    </Tag>
  );
};

export default PageShell;
