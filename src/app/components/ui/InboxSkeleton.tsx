/** Skeleton block using the smooth shimmer sweep defined in globals.css */
const Bone = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <div
    className={`skeleton ${className ?? ""}`}
    style={{ animationDelay: `${delay}ms` }}
  />
);

/** Single conversation row skeleton */
const ConversationRowSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex items-start gap-3 px-4 py-3 border-b border-grey-light/60">
    <Bone className="h-10 w-10 flex-shrink-0 rounded-full" delay={delay} />
    <div className="min-w-0 flex-1 space-y-2 pt-0.5">
      <div className="flex items-center justify-between gap-2">
        <Bone className="h-3 w-28 rounded-full" delay={delay} />
        <Bone className="h-2.5 w-9 rounded-full" delay={delay} />
      </div>
      <Bone className="h-2.5 w-4/5 rounded-full" delay={delay} />
      <div className="flex gap-1.5 pt-0.5">
        <Bone className="h-4 w-10 rounded-full" delay={delay} />
        <Bone className="h-4 w-12 rounded-full" delay={delay} />
      </div>
    </div>
  </div>
);

/** One message bubble skeleton — customer (left) or agent (right) */
const MessageSkeleton = ({
  align,
  width,
  height,
  delay = 0,
}: {
  align: "left" | "right";
  width: string;
  height: string;
  delay?: number;
}) => (
  <div className={`flex items-end gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
    {align === "left" && (
      <Bone className="h-7 w-7 flex-shrink-0 rounded-full" delay={delay} />
    )}
    <Bone
      className={`${height} ${width} rounded-2xl ${
        align === "left" ? "rounded-tl-sm" : "rounded-tr-sm"
      }`}
      delay={delay}
    />
  </div>
);

const InboxSkeleton = () => (
  <section className="flex h-full min-h-0 flex-col p-4 bg-primary-light/20">
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-grey-light">

      {/* ── Tab bar ── */}
      <div className="border-b border-grey-light bg-white px-4 py-3">
        <div className="grid w-full grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bone key={i} className="h-8 rounded-xl" delay={i * 60} />
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <div className="h-full w-full max-w-[360px] flex-shrink-0 border-r border-grey-light bg-white">
          <div className="px-4 py-3 space-y-2.5">
            <Bone className="h-9 rounded-xl" delay={0} />
            <Bone className="h-8 rounded-lg" delay={60} />
          </div>
          <div>
            {Array.from({ length: 7 }).map((_, i) => (
              <ConversationRowSkeleton key={i} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* ── Chat panel ── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">

          {/* Navbar */}
          <div className="flex items-center gap-3 border-b border-grey-light px-4 py-3">
            <Bone className="h-10 w-10 flex-shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Bone className="h-3.5 w-36 rounded-full" delay={40} />
              <Bone className="h-2.5 w-24 rounded-full" delay={80} />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bone key={i} className="h-8 w-16 rounded-lg" delay={i * 60} />
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col justify-end gap-3.5 px-5 py-4 overflow-hidden">
            <MessageSkeleton align="left"  width="w-52" height="h-12" delay={0}   />
            <MessageSkeleton align="right" width="w-44" height="h-9"  delay={80}  />
            <MessageSkeleton align="left"  width="w-64" height="h-16" delay={160} />
            <MessageSkeleton align="right" width="w-36" height="h-9"  delay={240} />
            <MessageSkeleton align="left"  width="w-56" height="h-12" delay={320} />
            <MessageSkeleton align="right" width="w-48" height="h-14" delay={400} />
          </div>

          {/* Composer */}
          <div className="border-t border-grey-light px-4 py-3">
            <Bone className="h-11 rounded-2xl" delay={120} />
            <Bone className="mx-auto mt-1.5 h-2 w-48 rounded-full opacity-50" delay={200} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InboxSkeleton;
