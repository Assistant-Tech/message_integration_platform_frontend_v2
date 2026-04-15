import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { cn } from "@/app/utils/cn";
import { useAnalyticsMessages } from "@/app/hooks/query/useAnalyticsQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface PlatformData {
  name: string;
  color: string;
  data: number[];
}

const CHANNEL_META: Record<string, { label: string; color: string }> = {
  WHATSAPP: { label: "WhatsApp", color: "#25D366" },
  FACEBOOK: { label: "Facebook", color: "#1877F2" },
  INSTAGRAM: { label: "Instagram", color: "#E1306C" },
  TIKTOK: { label: "TikTok", color: "#000000" },
  INTERNAL: { label: "Internal", color: "#2E5E99" },
};

const FALLBACK_PLATFORMS: PlatformData[] = [
  { name: "WhatsApp", color: "#25D366", data: [820, 960, 1040, 1180, 1350, 1520] },
  { name: "Facebook", color: "#1877F2", data: [540, 580, 620, 690, 720, 780] },
  { name: "Instagram", color: "#E1306C", data: [310, 380, 450, 520, 610, 680] },
  { name: "TikTok", color: "#000000", data: [80, 140, 220, 340, 480, 620] },
];

const CHANNELS_TO_FETCH = ["WHATSAPP", "FACEBOOK", "INSTAGRAM", "TIKTOK"] as const;

const PlatformComparisonChart = () => {
  const chartRef = useRef<ChartJS<"line">>(null);

  // Fetch messages per channel (month view, grouped by month for 6 data points)
  const channelQueries = CHANNELS_TO_FETCH.map((ch) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnalyticsMessages("year", ch, "month"),
  );

  const platforms: PlatformData[] = useMemo(() => {
    const hasData = channelQueries.some((q) => q.data?.data?.points?.length);
    if (!hasData) return FALLBACK_PLATFORMS;

    return CHANNELS_TO_FETCH.map((ch, i) => {
      const points = channelQueries[i]?.data?.data?.points ?? [];
      const meta = CHANNEL_META[ch] ?? { label: ch, color: "#8B5CF6" };
      return {
        name: meta.label,
        color: meta.color,
        data: points.length > 0 ? points.map((p: { value: number }) => p.value) : [],
      };
    }).filter((p) => p.data.length > 0);
  }, [channelQueries.map((q) => q.data)]);

  const labels = useMemo(() => {
    const hasData = channelQueries.some((q) => q.data?.data?.points?.length);
    if (!hasData) return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const firstWithData = channelQueries.find((q) => q.data?.data?.points?.length);
    return firstWithData?.data?.data?.points?.map((p: { label: string }) => p.label) ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  }, [channelQueries.map((q) => q.data)]);

  const chartData = {
    labels,
    datasets: platforms.map((p) => ({
      label: p.name,
      data: p.data,
      borderColor: p.color,
      backgroundColor: `${p.color}10`,
      borderWidth: 2.5,
      pointBackgroundColor: "#fff",
      pointBorderColor: p.color,
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a2e",
        titleFont: { family: "Nunito Sans", size: 13 },
        bodyFont: { family: "Nunito Sans", size: 12 },
        cornerRadius: 8,
        padding: 12,
        boxPadding: 4,
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

  const totalByPlatform = platforms.map((p) => ({
    name: p.name,
    color: p.color,
    total: p.data[p.data.length - 1] ?? 0,
    growth: p.data.length >= 2
      ? Math.round((((p.data[p.data.length - 1] ?? 0) - (p.data[0] ?? 0)) / (p.data[0] || 1)) * 100)
      : 0,
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex h-full flex-col rounded-2xl border border-grey-light/60 bg-white p-6"
    >
      <div className="mb-5">
        <h3 className="h4-semi-bold-24 text-grey">Platform Growth</h3>
        <p className="caption-medium-12 mt-0.5 text-grey-medium">
          Conversations by messaging platform
        </p>
      </div>

      {/* Custom legend */}
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
        {totalByPlatform.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="label-medium-14 text-grey">{p.name}</span>
            <span className="caption-medium-12 text-grey-medium">
              {p.total.toLocaleString()}
            </span>
            <span
              className={cn(
                "caption-medium-12 font-semibold",
                p.growth >= 0 ? "text-success" : "text-danger",
              )}
            >
              {p.growth >= 0 ? "+" : ""}
              {p.growth}%
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        <div className="h-64">
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </motion.section>
  );
};

export default PlatformComparisonChart;
