import { motion } from "framer-motion";
import { Users, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { STATUS_CONFIG } from "./constants";
import type { TeamSummary, MemberStatus } from "./types";

interface TeamStatusBarProps {
  summary: TeamSummary;
}

const STATUS_ORDER: MemberStatus[] = ["online", "away", "busy", "offline"];

const TeamStatusBar = ({ summary }: TeamStatusBarProps) => {
  const statusCounts: Record<MemberStatus, number> = {
    online: summary.online,
    away: summary.away,
    busy: summary.busy,
    offline: summary.offline,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap items-center gap-3"
    >
      {/* Presence pills */}
      <div className="flex items-center gap-2">
        {STATUS_ORDER.map((key) => {
          const config = STATUS_CONFIG[key];
          const count = statusCounts[key];
          if (count === 0) return null;
          return (
            <span
              key={key}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
                config.bg,
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", config.dot)} />
              <span className={cn("label-semi-bold-14", config.text)}>
                {count} {config.label}
              </span>
            </span>
          );
        })}
      </div>

      {/* Divider — hidden on mobile */}
      <div className="hidden h-6 w-px bg-grey-light md:block" />

      {/* Quick stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-grey-medium">
          <Users className="h-4 w-4" strokeWidth={1.8} />
          <span className="label-medium-14">
            {summary.totalMembers} members
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-grey-medium">
          <Clock className="h-4 w-4" strokeWidth={1.8} />
          <span className="label-medium-14">
            {summary.avgResponseTime} avg
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-grey-medium">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
          <span className="label-medium-14">
            {summary.totalResolved} resolved
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamStatusBar;
