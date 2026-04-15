import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { APP_ROUTES } from "@/app/constants/routes";
import PageShell from "@/app/components/layout/PageShell";
import PageHeader from "@/app/components/layout/PageHeader";
import { useBroadcasts } from "./data/useBroadcasts";
import { STATUS_FILTERS } from "./constants";
import type { BroadcastStatus } from "./types";
import BroadcastList from "./components/BroadcastList";
import BroadcastEmptyState from "./components/BroadcastEmptyState";

const BulkMessagingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: broadcasts, isLoading } = useBroadcasts();

  const [filter, setFilter] = useState<BroadcastStatus | "all">("all");
  const [query, setQuery] = useState("");

  const createHref = slug
    ? `/app/${slug}/admin/${APP_ROUTES.ADMIN.BULK_MESSAGING_CREATE}`
    : "#";

  const detailHref = (id: string) =>
    slug ? `/app/${slug}/admin/${APP_ROUTES.ADMIN.BULK_MESSAGING}/${id}` : "#";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return broadcasts.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.audience.label.toLowerCase().includes(q)
      );
    });
  }, [broadcasts, filter, query]);

  if (isLoading) {
    return (
      <PageShell>
        <p className="text-sm text-grey-medium">Loading broadcasts…</p>
      </PageShell>
    );
  }

  const isEmpty = broadcasts.length === 0;

  return (
    <PageShell>
      <PageHeader
        title="Bulk messaging"
        description="Reach many contacts at once across your connected channels."
        actions={
          !isEmpty && (
            <Link
              to={createHref}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" strokeWidth={2.4} />
              New broadcast
            </Link>
          )
        }
      />

      <div className="mt-6">
        {isEmpty ? (
          <BroadcastEmptyState createHref={createHref} />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div className="flex flex-wrap items-center gap-1 rounded-lg border border-grey-light bg-white p-1">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      filter === f.id
                        ? "bg-primary text-white"
                        : "text-grey-medium hover:bg-primary-light/40 hover:text-primary",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <label className="relative w-full sm:w-auto">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-medium" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search broadcasts"
                  className="w-full rounded-lg border border-grey-light bg-white py-2 pl-9 pr-3 text-sm text-grey outline-none placeholder:text-grey-medium focus:border-primary sm:w-64"
                />
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-grey-light bg-white px-6 py-12 text-center text-sm text-grey-medium">
                No broadcasts match these filters.
              </div>
            ) : (
              <BroadcastList
                broadcasts={filtered}
                onOpen={(id) => navigate(detailHref(id))}
              />
            )}
          </>
        )}
      </div>
    </PageShell>
  );
};

export default BulkMessagingPage;
