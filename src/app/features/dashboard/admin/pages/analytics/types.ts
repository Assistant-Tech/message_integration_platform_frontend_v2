export interface KpiMetric {
  label: string;
  value: string;
  previousValue: string;
  change: number;
  sparkline: number[];
}

export type ChannelKey =
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "email"
  | "sms";

export interface ChannelBreakdown {
  key: ChannelKey;
  channel: string;
  conversations: number;
  percentage: number;
  color: string;
}

export interface HourlyVolume {
  hour: string;
  incoming: number;
  outgoing: number;
}

export interface AgentPerformance {
  id: string;
  name: string;
  conversations: number;
  resolved: number;
  avgResponseTime: string;
  satisfaction: number;
}

export type TimeRange = "7d" | "30d" | "90d";
