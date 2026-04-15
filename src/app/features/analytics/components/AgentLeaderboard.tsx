import { motion } from "framer-motion";
import { Trophy, MessageSquare, CheckCircle2, Clock, Star } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { AgentPerformance } from "../types";

const AVATAR_PALETTES = [
  "bg-primary/15 text-primary",
  "bg-secondary/15 text-secondary-dark",
  "bg-information/15 text-information",
  "bg-success/15 text-success-dark",
  "bg-warning/15 text-warning-dark",
] as const;

const getColor = (name: string): string => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + h * 31;
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length] ?? AVATAR_PALETTES[0];
};

const getInitials = (name: string): string =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

const RANK_BADGES = [
  "bg-warning/15 text-warning-dark border-warning/30",
  "bg-grey-light text-grey-medium border-grey-light",
  "bg-secondary/10 text-secondary-dark border-secondary/20",
] as const;

interface AgentLeaderboardProps {
  agents: AgentPerformance[];
}

const AgentLeaderboard = ({ agents }: AgentLeaderboardProps) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.35 }}
    className="rounded-2xl border border-grey-light/60 bg-white p-6"
  >
    <div className="mb-5 flex items-center gap-2">
      <Trophy className="h-5 w-5 text-warning-dark" strokeWidth={1.8} />
      <h3 className="h4-semi-bold-24 text-grey">Top Agents</h3>
    </div>

    <div className="space-y-2">
      {agents.map((agent, i) => {
        const resolutionRate = Math.round((agent.resolved / agent.conversations) * 100);

        return (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
            className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-primary-light/10"
          >
            {/* Rank */}
            <span
              className={cn(
                "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                i < 3 ? RANK_BADGES[i] : "border-transparent text-grey-medium",
              )}
            >
              {i + 1}
            </span>

            {/* Avatar */}
            <div
              className={cn(
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none",
                getColor(agent.name),
              )}
            >
              {getInitials(agent.name)}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="body-semi-bold-16 truncate text-grey">
                {agent.name}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="inline-flex items-center gap-1 caption-medium-12 text-grey-medium">
                  <MessageSquare className="h-3 w-3" strokeWidth={1.8} />
                  {agent.conversations}
                </span>
                <span className="inline-flex items-center gap-1 caption-medium-12 text-grey-medium">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={1.8} />
                  {resolutionRate}%
                </span>
                <span className="inline-flex items-center gap-1 caption-medium-12 text-grey-medium">
                  <Clock className="h-3 w-3" strokeWidth={1.8} />
                  {agent.avgResponseTime}
                </span>
              </div>
            </div>

            {/* Satisfaction */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="label-semi-bold-14 text-grey">
                {agent.satisfaction}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.section>
);

export default AgentLeaderboard;
