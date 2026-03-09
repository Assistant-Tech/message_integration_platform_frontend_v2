import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Hash, Users, Bell, Volume2, Settings, Plus } from "lucide-react";
import { Button } from "@/app/components/ui";
import { Channel } from "@/app/types/channel.types";
import { useGroupedChannels } from "@/app/hooks/useGroupedChannels";
import ChannelSection from "@/app/features/dashboard/admin/pages/channels/components/ChannelSection";
import ChannelCreateDialog from "@/app/features/dashboard/admin/pages/channels/components/ChannelCreateDialog";

interface Props {
  channels: Channel[];
  selectedChannelId: string | null;
  onSelectChannel: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ChannelSidebar = ({
  channels,
  selectedChannelId,
  onSelectChannel,
  isCollapsed,
  onToggleCollapse: _onToggleCollapse,
}: Props) => {
  const [search] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState({
    text: true,
    social: true,
    private: true,
  });

  const grouped = useGroupedChannels(channels, search);

  const toggle = useCallback((key: "text" | "social" | "private") => {
    setExpanded((p) => ({ ...p, [key]: !p[key] }));
  }, []);

  const openCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, []);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 70 : 240 }}
      transition={{ duration: 0.25 }}
      className="bg-primary/85 flex flex-col"
    >
      {/* HEADER */}
      <div className="p-3 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-white h4-bold-24 pt-2">Channels</h2>
        )}
      </div>

      {/* Add new channel button*/}
      {!isCollapsed && (
        <div className="px-3 mb-2">
          <Button
            variant="none"
            onClick={openCreateDialog}
            className="w-full bg-white text-primary hover:bg-white/90 label-regular-14 py-2"
            IconLeft={<Plus size={16} />}
            label="Create channel"
          />
        </div>
      )}

      {/* CHANNEL LIST */}
      <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
        <ChannelSection
          title="Text Channels"
          icon={<Hash size={14} />}
          channels={grouped.text}
          expanded={expanded.text}
          collapsed={isCollapsed}
          selectedId={selectedChannelId}
          onToggle={() => toggle("text")}
          onSelect={onSelectChannel}
          onCreate={openCreateDialog}
        />

        <ChannelSection
          title="Social Channels"
          icon={<Users size={14} />}
          channels={grouped.social}
          expanded={expanded.social}
          collapsed={isCollapsed}
          selectedId={selectedChannelId}
          onToggle={() => toggle("social")}
          onSelect={onSelectChannel}
          onCreate={openCreateDialog}
        />

        <ChannelSection
          title="Private"
          icon={<Hash size={14} />}
          channels={grouped.private}
          expanded={expanded.private}
          collapsed={isCollapsed}
          selectedId={selectedChannelId}
          onToggle={() => toggle("private")}
          onSelect={onSelectChannel}
          onCreate={openCreateDialog}
        />
      </div>

      {/* FOOTER */}

      <div className="p-2 flex gap-2">
        <Button variant="none">
          <Bell size={16} />
        </Button>

        <Button variant="none">
          <Volume2 size={16} />
        </Button>

        <Button variant="none">
          <Settings size={16} />
        </Button>
      </div>

      <ChannelCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </motion.div>
  );
};

export default ChannelSidebar;
