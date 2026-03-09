import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";
import { Channel } from "@/app/types/channel.types";
import ChannelIcon from "@/app/features/dashboard/admin/pages/channels/components/ChannelIcons";

interface Props {
  channel: Channel;
  collapsed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ChannelItem = memo(
  ({ channel, collapsed, selected, onSelect }: Props) => {
    return (
      <motion.button
        onClick={() => onSelect(channel._id)}
        className={cn(
          "flex items-center justify-between w-full px-2 py-2 rounded-md label-regular-16 transition-all group",
          selected
            ? "bg-primary-light text-primary"
            : "text-base-white hover:bg-primary-dark/40",
        )}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center min-w-0">
          {/* indentation for sub channels */}
          {!collapsed && <div className="w-2" />}

          <ChannelIcon channel={channel} />

          {!collapsed && (
            <span className="truncate text-left flex-1 ps-2">
              {channel.title}
            </span>
          )}
        </div>

        {!collapsed && channel.unreadCount ? (
          <span className="px-1.5 py-0.5 text-xs bg-danger text-white rounded-full">
            {channel.unreadCount > 99 ? "99+" : channel.unreadCount}
          </span>
        ) : null}
      </motion.button>
    );
  },
);

export default ChannelItem;
