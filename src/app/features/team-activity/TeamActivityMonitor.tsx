import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import { cn } from "@/app/utils/cn";
import TeamStatusBar from "./TeamStatusBar";
import MemberRow from "./MemberRow";
import ActivityFeed from "./ActivityFeed";
import type { TeamMember, TeamSummary, ActivityEvent, MemberStatus } from "./types";

type SortField = "name" | "conversations" | "resolved" | "response";

interface TeamActivityMonitorProps {
  members: TeamMember[];
  summary: TeamSummary;
  activityFeed: ActivityEvent[];
}

const TeamActivityMonitor = ({
  members,
  summary,
  activityFeed,
}: TeamActivityMonitorProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [sortBy] = useState<SortField>("name");

  const filteredMembers = useMemo(() => {
    let result = members;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    const sortFns: Record<SortField, (a: TeamMember, b: TeamMember) => number> = {
      name: (a, b) => a.name.localeCompare(b.name),
      conversations: (a, b) => b.activeConversations - a.activeConversations,
      resolved: (a, b) => b.resolvedToday - a.resolvedToday,
      response: (a, b) => parseFloat(a.avgResponseTime) - parseFloat(b.avgResponseTime),
    };

    return [...result].sort(sortFns[sortBy]);
  }, [members, search, statusFilter, sortBy]);

  const FILTER_OPTIONS: { value: MemberStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "online", label: "Online" },
    { value: "away", label: "Away" },
    { value: "busy", label: "Busy" },
    { value: "offline", label: "Offline" },
  ];

  const SORT_OPTIONS: { value: SortField; label: string }[] = [
    { value: "name", label: "Name" },
    { value: "conversations", label: "Active Chats" },
    { value: "resolved", label: "Resolved" },
    { value: "response", label: "Response Time" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
      aria-label="Team activity monitor"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="h4-semi-bold-24 text-grey">Team Activity</h2>
            <p className="caption-medium-12 text-grey-medium">
              Monitor your team&apos;s performance in real-time
            </p>
          </div>
        </div>

        <TeamStatusBar summary={summary} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Members panel — takes 2 cols */}
        <div className="rounded-2xl border border-grey-light/60 bg-white xl:col-span-2">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-grey-light/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-medium" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                className={cn(
                  "w-full rounded-xl border border-grey-light/60 bg-grey-light/20",
                  "py-2.5 pl-9 pr-4 text-sm text-grey outline-none",
                  "placeholder:text-grey-medium/60",
                  "transition-colors focus:border-primary/40 focus:bg-white",
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Status filter tabs */}
              <div className="flex gap-1 rounded-xl bg-grey-light/30 p-1">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatusFilter(opt.value)}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
                      statusFilter === opt.value
                        ? "bg-white text-grey shadow-sm"
                        : "text-grey-medium hover:text-grey",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-xl border border-grey-light/60 px-3 py-2 text-xs font-medium text-grey-medium transition-colors hover:border-primary/30 hover:text-grey"
                  aria-label="Sort options"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Column headers — desktop only */}
          <div className="hidden border-b border-grey-light/30 px-4 py-2 md:grid md:grid-cols-[minmax(200px,2fr)_1fr_1fr_1fr_1fr_40px] md:items-center">
            {["Member", "Active", "Resolved", "Resp. Time", "Hours", ""].map(
              (label) => (
                <span key={label} className="caption-medium-12 text-grey-medium/70">
                  {label}
                </span>
              ),
            )}
          </div>

          {/* Member list */}
          <div className="max-h-[420px] divide-y divide-grey-light/20 overflow-y-auto scrollbar-invisible">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member, i) => (
                <MemberRow key={member.id} member={member} index={i} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-grey-medium">
                <Users className="h-8 w-8 opacity-40" />
                <p className="body-medium-16">No records to show</p>
                <p className="caption-medium-12">
                  {search || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Team members will appear here once added"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Activity feed — takes 1 col */}
        <ActivityFeed events={activityFeed} />
      </div>
    </motion.section>
  );
};

export default TeamActivityMonitor;
