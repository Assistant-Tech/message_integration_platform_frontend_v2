import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { STAT_COLOR_MAP } from "../constants/shared";
import type { StatCard as StatCardType } from "../types";

interface StatCardProps {
  stat: StatCardType;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const Icon = stat.icon;
  const colors = STAT_COLOR_MAP[stat.color];
  const isPositiveTrend = stat.trend >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className={cn(
        "group rounded-2xl border border-grey-light/60 bg-white p-5",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.text)} strokeWidth={1.8} />
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            isPositiveTrend
              ? "bg-success-light text-success"
              : "bg-danger-light text-danger",
          )}
        >
          {isPositiveTrend ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {isPositiveTrend ? "+" : "-"}
          {Math.abs(stat.trend)}%
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="h3-bold-32 text-grey">{stat.value}</span>
        <span className="caption-medium-12 text-grey-medium">{stat.subValue}</span>
      </div>

      <p className="label-regular-14 mt-1 text-grey-medium">{stat.label}</p>
    </motion.article>
  );
};

export default StatCard;
