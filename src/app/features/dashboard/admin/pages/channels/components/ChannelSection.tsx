import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChannelItem from "@/app/features/dashboard/admin/pages/channels/components/ChannelItem";
import { Channel } from "@/app/types/channel.types";

interface Props {
  title: string;
  icon: React.ReactNode;
  channels: Channel[];
  expanded: boolean;
  collapsed: boolean;
  selectedId: string | null;
  onToggle: () => void;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

const ChannelSection = ({
  title,
  channels,
  expanded,
  collapsed,
  selectedId,
  onToggle,
  onSelect,
  onCreate,
}: Props) => {
  return (
    <div className="mb-3">
      {/* SECTION HEADER */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-2 py-1 label-bold-16 text-base-white"
      >
        <div className="flex items-center gap-2">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}

          {!collapsed && (
            <>
              {/* {icon} */}
              <span>{title}</span>
            </>
          )}
        </div>

        {!collapsed && (
          <Plus
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              onCreate();
            }}
            className="cursor-pointer"
          />
        )}
      </button>

      {/* CHANNEL LIST */}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-1 space-y-1 pl-4"
          >
            {channels.map((channel) => (
              <ChannelItem
                key={channel._id}
                channel={channel}
                collapsed={collapsed}
                selected={selectedId === channel._id}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChannelSection;
