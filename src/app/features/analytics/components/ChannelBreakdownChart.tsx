import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import type { ChannelBreakdown, ChannelKey } from "../types";

import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";

const CHANNEL_ICONS: Partial<Record<ChannelKey, string>> = {
  whatsapp: whatsappIcon,
  facebook: fbIcon,
  instagram: instaIcon,
  tiktok: tiktokIcon,
};

const ChannelIcon = ({ channelKey, size = 18 }: { channelKey: ChannelKey; size?: number }) => {
  const src = CHANNEL_ICONS[channelKey];

  if (src) {
    return <img src={src} alt="" className="flex-shrink-0" width={size} height={size} />;
  }

  if (channelKey === "email") {
    return <Mail className="flex-shrink-0 text-primary" style={{ width: size, height: size }} strokeWidth={1.8} />;
  }

  return <MessageCircle className="flex-shrink-0 text-violet-500" style={{ width: size, height: size }} strokeWidth={1.8} />;
};

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
            key={ch.key}
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
            key={ch.key}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
            className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-primary-light/10"
          >
            <div className="flex items-center gap-3">
              <ChannelIcon channelKey={ch.key} />
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
