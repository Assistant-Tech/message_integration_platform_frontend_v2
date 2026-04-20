import { useState } from "react";
import type { Broadcast } from "../types";

// TODO: replace with real API hook once `/broadcasts` endpoint is live.
// Keep the return shape stable — callers only depend on { data, isLoading, isError }.
// Suggested real implementation:
//   return useQuery({ queryKey: ["broadcasts"], queryFn: fetchBroadcasts })

const SEED: Broadcast[] = [
  {
    id: "bc_01",
    name: "Black Friday preview — VIP segment",
    status: "scheduled",
    channel: "WHATSAPP",
    audience: { segmentId: "seg_vip", label: "VIP customers", size: 1240 },
    message: {
      body: "Hi {{name}}, your early Black Friday access starts tomorrow at 8am.",
      templateId: "tpl_bf_preview",
    },
    schedule: { mode: "scheduled", sendAt: "2026-04-17T08:00:00.000Z" },
    createdAt: "2026-04-14T10:12:00.000Z",
    updatedAt: "2026-04-14T10:12:00.000Z",
    createdBy: "Aakriti",
  },
  {
    id: "bc_02",
    name: "April product launch",
    status: "sent",
    channel: "INSTAGRAM",
    audience: { segmentId: "seg_all_ig", label: "Instagram followers", size: 8420 },
    message: { body: "New drops just landed — tap to shop." },
    schedule: { mode: "immediate" },
    metrics: { sent: 8420, delivered: 8390, read: 6210, failed: 30 },
    createdAt: "2026-04-09T14:30:00.000Z",
    updatedAt: "2026-04-09T14:45:00.000Z",
    createdBy: "Milap",
  },
  {
    id: "bc_03",
    name: "Abandoned cart nudge",
    status: "draft",
    channel: "WHATSAPP",
    audience: { segmentId: "seg_cart_48h", label: "Abandoned cart (48h)", size: 312 },
    message: { body: "Still thinking it over? Your cart's waiting." },
    schedule: { mode: "scheduled" },
    createdAt: "2026-04-13T09:00:00.000Z",
    updatedAt: "2026-04-13T09:00:00.000Z",
    createdBy: "Milap",
  },
];

export const useBroadcasts = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>(SEED);

  const remove = (id: string) =>
    setBroadcasts((prev) => prev.filter((b) => b.id !== id));

  return {
    data: broadcasts,
    isLoading: false,
    isError: false,
    remove,
  };
};
