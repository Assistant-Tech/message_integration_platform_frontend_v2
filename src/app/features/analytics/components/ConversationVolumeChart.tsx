import { useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { cn } from "@/app/utils/cn";
import type { HourlyVolume } from "../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type ViewMode = "hourly" | "weekly";

interface ConversationVolumeChartProps {
  hourlyData: HourlyVolume[];
  weeklyData: { label: string; value: number }[];
}

const PRIMARY_HEX = "#2E5E99";

const ConversationVolumeChart = ({
  hourlyData,
  weeklyData,
}: ConversationVolumeChartProps) => {
  const [view, setView] = useState<ViewMode>("hourly");

  const hourlyChartData = {
    labels: hourlyData.map((d) => d.hour),
    datasets: [
      {
        label: "Incoming",
        data: hourlyData.map((d) => d.incoming),
        backgroundColor: PRIMARY_HEX,
        borderRadius: 6,
        borderSkipped: false as const,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "Outgoing",
        data: hourlyData.map((d) => d.outgoing),
        backgroundColor: `${PRIMARY_HEX}40`,
        borderRadius: 6,
        borderSkipped: false as const,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const weeklyChartData = {
    labels: weeklyData.map((d) => d.label),
    datasets: [
      {
        label: "Conversations",
        data: weeklyData.map((d) => d.value),
        backgroundColor: weeklyData.map((_, i) =>
          i === weeklyData.findIndex((d) => d.value === Math.max(...weeklyData.map((w) => w.value)))
            ? PRIMARY_HEX
            : `${PRIMARY_HEX}30`,
        ),
        borderRadius: 8,
        borderSkipped: false as const,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a2e",
        titleFont: { family: "Nunito Sans" },
        bodyFont: { family: "Nunito Sans" },
        cornerRadius: 8,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#777", font: { family: "Nunito Sans", size: 12 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.04)" },
        ticks: { color: "#777", font: { family: "Nunito Sans", size: 12 } },
        border: { display: false },
      },
    },
  } as const;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-grey-light/60 bg-white p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="h4-semi-bold-24 text-grey">Conversation Volume</h3>
          <p className="caption-medium-12 mt-0.5 text-grey-medium">
            {view === "hourly" ? "Peak hours today" : "Weekly distribution"}
          </p>
        </div>

        <div className="flex gap-1 rounded-xl bg-grey-light/30 p-1">
          {(["hourly", "weekly"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all",
                view === mode
                  ? "bg-primary text-white shadow-sm"
                  : "text-grey-medium hover:text-grey",
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {view === "hourly" && (
        <div className="mb-4 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PRIMARY_HEX }} />
            <span className="caption-medium-12 text-grey-medium">Incoming</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `${PRIMARY_HEX}40` }} />
            <span className="caption-medium-12 text-grey-medium">Outgoing</span>
          </div>
        </div>
      )}

      <div className="h-72">
        <Bar
          data={view === "hourly" ? hourlyChartData : weeklyChartData}
          options={options}
        />
      </div>
    </motion.section>
  );
};

export default ConversationVolumeChart;
