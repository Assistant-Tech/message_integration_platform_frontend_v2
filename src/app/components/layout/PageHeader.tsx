import type { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

/**
 * Canonical page header. Composes inside <PageShell />.
 *
 * Visually distinct from the TopNavbar by design — bigger display title
 * (h3 scale), muted caption, no icon tile. The TopNavbar is chrome; this
 * is page content. Keep one per page.
 */

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) => (
  <header
    className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
      className,
    )}
  >
    <div className="min-w-0">
      <h1 className="h3-bold-32 text-grey">{title}</h1>
      {description && (
        <p className="caption-medium-12 mt-1 text-grey-medium">
          {description}
        </p>
      )}
    </div>
    {actions && (
      <div className="flex flex-wrap items-center gap-2">{actions}</div>
    )}
  </header>
);

export default PageHeader;
