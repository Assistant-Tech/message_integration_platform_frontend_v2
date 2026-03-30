const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-grey-light ${className ?? ""}`}
  />
);

const ConversationItemSkeleton = () => (
  <div className="flex items-center gap-3 px-4 py-3">
    <Shimmer className="h-10 w-10 flex-shrink-0 rounded-full" />
    <div className="min-w-0 flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <Shimmer className="h-3.5 w-28" />
        <Shimmer className="h-3 w-10" />
      </div>
      <Shimmer className="h-3 w-4/5" />
    </div>
  </div>
);

const InboxSkeleton = () => {
  return (
    <section className="flex h-full min-h-0 flex-col p-4 bg-primary-light/20">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-grey-light">
        {/* Tab bar skeleton */}
        <div className="border-b border-grey-light bg-white px-4 py-3">
          <div className="grid w-full grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Shimmer key={i} className="h-9 w-full rounded-lg" />
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sidebar skeleton */}
          <div className="h-full w-full max-w-[360px] flex-shrink-0 border-r border-grey-light bg-white">
            <div className="px-4 py-3 space-y-3">
              <Shimmer className="h-9 w-full rounded-xl" />
              <Shimmer className="h-9 w-full rounded-lg" />
            </div>
            <div className="divide-y divide-grey-light/60">
              {Array.from({ length: 7 }).map((_, i) => (
                <ConversationItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Chat panel skeleton */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
            {/* Navbar */}
            <div className="flex items-center gap-3 border-b border-grey-light px-4 py-3">
              <Shimmer className="h-10 w-10 flex-shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Shimmer className="h-4 w-36" />
                <Shimmer className="h-3 w-24" />
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer key={i} className="h-9 w-16 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 px-5 py-4">
              <div className="flex justify-start">
                <Shimmer className="h-14 w-56 rounded-2xl" />
              </div>
              <div className="flex justify-end">
                <Shimmer className="h-10 w-44 rounded-2xl" />
              </div>
              <div className="flex justify-start">
                <Shimmer className="h-20 w-64 rounded-2xl" />
              </div>
              <div className="flex justify-end">
                <Shimmer className="h-10 w-36 rounded-2xl" />
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-grey-light p-3">
              <Shimmer className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InboxSkeleton;
