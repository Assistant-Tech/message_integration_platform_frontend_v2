import { Link } from "react-router-dom";
import { Megaphone, Plus } from "lucide-react";

interface BroadcastEmptyStateProps {
  createHref: string;
}

const BroadcastEmptyState = ({ createHref }: BroadcastEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-grey-light bg-white px-6 py-16 text-center">
    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
      <Megaphone className="h-7 w-7" strokeWidth={1.8} />
    </span>
    <h3 className="text-lg font-semibold text-grey">
      Reach many people at once
    </h3>
    <p className="mt-2 max-w-sm text-sm text-grey-medium">
      Send announcements, promotions, and updates to a segment of your
      contacts across WhatsApp, Instagram, Facebook, and more.
    </p>
    <Link
      to={createHref}
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
    >
      <Plus className="h-4 w-4" strokeWidth={2.4} />
      Create your first broadcast
    </Link>
    <p className="mt-4 text-[11px] text-grey-medium">
      WhatsApp broadcasts require an approved template.
    </p>
  </div>
);

export default BroadcastEmptyState;
