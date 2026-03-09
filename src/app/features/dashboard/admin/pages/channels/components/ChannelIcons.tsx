import { Channel } from "@/app/types/channel.types";
import { Hash } from "lucide-react";

interface Props {
  channel: Channel;
}

const ChannelIcon = ({ channel }: Props) => {
  if (channel.isPrivate) return <Hash size={16} />;

  switch (channel.type) {
    case "whatsapp":
      return (
        <span>
          <Hash size={16} />
        </span>
      );

    case "facebook":
      return (
        <span>
          <Hash size={16} />
        </span>
      );

    case "instagram":
      return (
        <span>
          <Hash size={16} />
        </span>
      );

    case "tiktok":
      return (
        <span>
          <Hash size={16} />
        </span>
      );

    default:
      return <Hash size={16} />;
  }
};

export default ChannelIcon;
