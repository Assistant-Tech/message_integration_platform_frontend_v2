import { useMemo } from "react";
import { Channel } from "@/app/types/channel.types";

export const useGroupedChannels = (channels: Channel[], search: string) => {
  return useMemo(() => {
    const filtered = channels.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return {
      text: filtered.filter((c) => !c.isPrivate && c.type === "internal"),

      social: filtered.filter((c) =>
        ["whatsapp", "facebook", "instagram", "tiktok"].includes(c.type),
      ),

      private: filtered.filter((c) => c.isPrivate),
    };
  }, [channels, search]);
};
