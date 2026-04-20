import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { cn } from "@/app/utils/cn";
import type { ChartDataPoint } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

const PERIODS = ["Week", "Month", "Year"] as const;
type Period = (typeof PERIODS)[number];

const PRIMARY_HEX = "#2E5E99";

interface IncomeChartProps {
  data: ChartDataPoint[];
  totalValue: string;
  percentChange: number;
}

const IncomeChart = ({ data, totalValue, percentChange }: IncomeChartProps) => {
  const [activePeriod, setActivePeriod] = useState<Period>("Month");
  const chartRef = useRef<ChartJS<"line">>(null);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        borderColor: PRIMARY_HEX,
        borderWidth: 2.5,
        pointBackgroundColor: "#fff",
        pointBorderColor: PRIMARY_HEX,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx: { chart: ChartJS }) => {
          const { ctx: canvasCtx, chartArea } = ctx.chart;
          if (!chartArea) return "transparent";
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(46, 94, 153, 0.15)");
          gradient.addColorStop(1, "rgba(46, 94, 153, 0.01)");
          return gradient;
        },
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-grey-light/60 bg-white p-6 h-full"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="h4-semi-bold-24 text-grey">Messages Overview</h2>
        <div className="flex gap-1 rounded-xl bg-grey-light/30 p-1">
          {PERIODS.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setActivePeriod(period)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                activePeriod === period
                  ? "bg-primary text-white shadow-sm"
                  : "text-grey-medium hover:text-grey",
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-baseline gap-3">
        <span className="h2-bold-40 text-grey">{totalValue}</span>
        <span className="flex items-center gap-1 rounded-full bg-success-light px-2.5 py-0.5 text-xs font-semibold text-success">
          <TrendingUp className="h-3 w-3" />+{percentChange}%
        </span>
      </div>

      <div className="h-80">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </motion.section>
  );
};

export default IncomeChart;
