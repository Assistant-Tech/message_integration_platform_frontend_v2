import React, { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Hash, Users, Bell, Volume2, Settings, Plus } from "lucide-react";

import { Button } from "@/app/components/ui";
import { Channel } from "@/app/types/channel.types";

import ChannelSection from "@/app/features/dashboard/admin/pages/channels/components/ChannelSection";
import ChannelCreateDialog from "@/app/features/dashboard/admin/pages/channels/components/ChannelCreateDialog";

interface Props {
  channels: Channel[];
  selectedChannelId: string | null;
  onSelectChannel: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

type ChannelCategory = string;

const categoryIcons: Record<string, React.ReactNode> = {
  text: <Hash size={14} />,
  social: <Users size={14} />,
  private: <Hash size={14} />,
};

const ChannelSidebar = ({
  channels,
  selectedChannelId,
  onSelectChannel,
  isCollapsed,
}: Props) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  /**
   * Temporary local state
   * Replace later with React Query API
   */
  const [localChannels, setLocalChannels] = useState<Channel[]>(channels);

  /**
   * GROUP CHANNELS
   */
  const groupedChannels = useMemo(() => {
    const grouped: Record<string, Channel[]> = {};

    localChannels.forEach((channel) => {
      const category = channel.type || "text";

      if (!grouped[category]) grouped[category] = [];

      grouped[category].push(channel);
    });

    return grouped;
  }, [localChannels]);

  /**
   * EXPAND STATE
   */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = useCallback((key: ChannelCategory) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  /**
   * CREATE CHANNEL
   */
  const handleCreateChannel = useCallback((newChannel: Channel) => {
    setLocalChannels((prev) => [...prev, newChannel]);

    /**
     * FUTURE API
     *
     * createChannelMutation.mutate(newChannel)
     */
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

      {/* CREATE BUTTON */}
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
        {Object.entries(groupedChannels).map(([category, list]) => (
          <ChannelSection
            key={category}
            title={`${category.charAt(0).toUpperCase()}${category.slice(1)} Channels`}
            icon={categoryIcons[category] || <Hash size={14} />}
            channels={list}
            expanded={expanded[category] ?? true}
            collapsed={isCollapsed}
            selectedId={selectedChannelId}
            onToggle={() => toggle(category)}
            onSelect={onSelectChannel}
            onCreate={openCreateDialog}
          />
        ))}
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
        onCreate={handleCreateChannel}
      />
    </motion.div>
  );
};

export default memo(ChannelSidebar);
