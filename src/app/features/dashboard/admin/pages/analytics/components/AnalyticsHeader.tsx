import { motion } from "framer-motion";
import { BarChart3, Download, Calendar } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import type { TimeRange } from "../types";

interface AnalyticsHeaderProps {
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const RANGES: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
];

const AnalyticsHeader = ({
  activeRange,
  onRangeChange,
}: AnalyticsHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <BarChart3 className="h-5 w-5 text-primary" strokeWidth={1.8} />
      </div>
      <div>
        <h1 className="h3-bold-32 text-grey">Report Review</h1>
        <p className="caption-medium-12 text-grey-medium">
          Performance insights across all channels
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex gap-1 rounded-xl bg-grey-light/30 p-1">
        {RANGES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onRangeChange(r.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
              activeRange === r.value
                ? "bg-primary text-white shadow-sm"
                : "text-grey-medium hover:text-grey",
            )}
          >
            {activeRange === r.value && <Calendar className="h-3 w-3" />}
            {r.label}
          </button>
        ))}
      </div>

      <Button
        label="Export"
        variant="outlined"
        size="xs"
        IconLeft={<Download className="h-3.5 w-3.5" />}
      />
    </div>
  </motion.div>
);

export default AnalyticsHeader;
