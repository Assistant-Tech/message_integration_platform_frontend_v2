import { motion } from "framer-motion";
import type { ChannelBreakdown } from "../types";

interface ChannelBreakdownChartProps {
  channels: ChannelBreakdown[];
}

const ChannelBreakdownChart = ({ channels }: ChannelBreakdownChartProps) => {
  const total = channels.reduce((sum, c) => sum + c.conversations, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl border border-grey-light/60 bg-white p-6 h-full"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="h4-semi-bold-24 text-grey">Channel Breakdown</h3>
        <span className="caption-medium-12 text-grey-medium">
          {total.toLocaleString()} total
        </span>
      </div>

      {/* Stacked bar */}
      <div className="mb-6 flex h-4 overflow-hidden rounded-full">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.channel}
            initial={{ width: 0 }}
            animate={{ width: `${ch.percentage}%` }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.08,
              ease: "easeOut",
            }}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: ch.color }}
            title={`${ch.channel}: ${ch.percentage}%`}
          />
        ))}
      </div>

      {/* Channel list */}
      <ul className="space-y-3">
        {channels.map((ch, i) => (
          <motion.li
            key={ch.channel}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
            className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary-light/10"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: ch.color }}
              />
              <span className="body-medium-16 text-grey">{ch.channel}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="label-semi-bold-14 text-grey">
                {ch.conversations.toLocaleString()}
              </span>
              <span className="label-regular-14 w-10 text-right text-grey-medium">
                {ch.percentage}%
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};

export default ChannelBreakdownChart;
