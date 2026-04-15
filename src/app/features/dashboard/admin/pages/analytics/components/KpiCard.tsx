import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { KpiMetric } from "../types";

interface KpiCardProps {
  metric: KpiMetric;
  index: number;
}

const MiniSparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-8 w-20"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const KpiCard = ({ metric, index }: KpiCardProps) => {
  const isPositive = metric.change >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={cn(
        "rounded-2xl border border-grey-light/60 bg-white p-5",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="label-regular-14 text-grey-medium">{metric.label}</p>
          <p className="h3-bold-32 mt-1 text-grey">{metric.value}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                isPositive
                  ? "bg-success-light text-success"
                  : "bg-danger-light text-danger",
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? "+" : "-"}
              {Math.abs(metric.change)}%
            </span>
            <span className="caption-medium-12 text-grey-medium/60">
              vs {metric.previousValue}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex-shrink-0",
            isPositive ? "text-success" : "text-danger",
          )}
        >
          <MiniSparkline data={metric.sparkline} />
        </div>
      </div>
    </motion.article>
  );
};

export default KpiCard;
