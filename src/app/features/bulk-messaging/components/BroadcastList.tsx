import { Users, MoreHorizontal } from "lucide-react";
import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import type { Broadcast } from "../types";
import StatusPill from "./StatusPill";

interface BroadcastListProps {
  broadcasts: Broadcast[];
  onOpen?: (id: string) => void;
}

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const formatWhen = (b: Broadcast) => {
  if (b.status === "sent" && b.updatedAt) {
    return `Sent ${new Date(b.updatedAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })}`;
  }
  if (b.schedule.mode === "scheduled" && b.schedule.sendAt) {
    return `Scheduled ${new Date(b.schedule.sendAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
  return `Updated ${new Date(b.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
};

const DeliveryRate = ({ broadcast }: { broadcast: Broadcast }) => {
  if (!broadcast.metrics) return <span className="text-grey-medium">—</span>;
  const { delivered, sent } = broadcast.metrics;
  const rate = sent > 0 ? Math.round((delivered / sent) * 100) : 0;
  return (
    <span className="tabular-nums text-grey">
      {rate}
      <span className="text-grey-medium">% delivered</span>
    </span>
  );
};

const BroadcastList = ({ broadcasts, onOpen }: BroadcastListProps) => (
  <div className="overflow-hidden rounded-xl border border-grey-light bg-white">
    <table className="w-full text-left text-sm">
      <thead className="border-b border-grey-light bg-primary-light/20 text-[11px] font-semibold uppercase tracking-wider text-grey-medium">
        <tr>
          <th className="px-4 py-3">Broadcast</th>
          <th className="px-4 py-3">Channel</th>
          <th className="px-4 py-3">Audience</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Timing</th>
          <th className="px-4 py-3">Performance</th>
          <th className="w-10 px-4 py-3" aria-label="Actions" />
        </tr>
      </thead>
      <tbody className="divide-y divide-grey-light">
        {broadcasts.map((b) => (
          <tr
            key={b.id}
            onClick={() => onOpen?.(b.id)}
            className="cursor-pointer transition-colors hover:bg-primary-light/15"
          >
            <td className="px-4 py-3">
              <div className="font-semibold text-grey">{b.name}</div>
              <div className="mt-0.5 line-clamp-1 text-[12px] text-grey-medium">
                {b.message.body}
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={b.channel} size={18} />
                <span className="text-grey">{b.channel.toLowerCase()}</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5 text-grey">
                <Users className="h-3.5 w-3.5 text-grey-medium" strokeWidth={2} />
                <span className="tabular-nums font-medium">
                  {formatNumber(b.audience.size)}
                </span>
                <span className="text-grey-medium">· {b.audience.label}</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <StatusPill status={b.status} />
            </td>
            <td className="px-4 py-3 text-grey-medium">{formatWhen(b)}</td>
            <td className="px-4 py-3">
              <DeliveryRate broadcast={b} />
            </td>
            <td className="px-2 py-3">
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="rounded-md p-1.5 text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
                aria-label={`More actions for ${b.name}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BroadcastList;
