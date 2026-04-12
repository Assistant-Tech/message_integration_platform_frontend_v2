import type {
  KpiMetric,
  ChannelBreakdown,
  HourlyVolume,
  AgentPerformance,
} from "./types";

export const MOCK_KPIS: KpiMetric[] = [
  {
    label: "Total Conversations",
    value: "12,847",
    previousValue: "11,230",
    change: 14.4,
    sparkline: [42, 55, 48, 62, 58, 71, 65, 78, 72, 84, 80, 92],
  },
  {
    label: "Messages Sent",
    value: "48,293",
    previousValue: "43,100",
    change: 12.0,
    sparkline: [180, 210, 195, 230, 220, 260, 245, 275, 265, 290, 280, 310],
  },
  {
    label: "Avg Response Time",
    value: "2.4 min",
    previousValue: "3.1 min",
    change: -22.6,
    sparkline: [4.2, 3.8, 3.5, 3.2, 3.0, 2.8, 2.9, 2.6, 2.5, 2.4, 2.5, 2.4],
  },
  {
    label: "Resolution Rate",
    value: "94.2%",
    previousValue: "91.8%",
    change: 2.6,
    sparkline: [88, 89, 90, 91, 90, 92, 91, 93, 92, 94, 93, 94],
  },
  {
    label: "Customer Satisfaction",
    value: "4.7/5",
    previousValue: "4.5/5",
    change: 4.4,
    sparkline: [4.2, 4.3, 4.3, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.6, 4.7],
  },
];

export const MOCK_CHANNELS: ChannelBreakdown[] = [
  { channel: "WhatsApp", conversations: 5420, percentage: 42, color: "#25D366" },
  { channel: "Messenger", conversations: 2980, percentage: 23, color: "#0084FF" },
  { channel: "Instagram", conversations: 1930, percentage: 15, color: "#E1306C" },
  { channel: "Email", conversations: 1540, percentage: 12, color: "#2E5E99" },
  { channel: "SMS", conversations: 977, percentage: 8, color: "#8B5CF6" },
];

export const MOCK_HOURLY: HourlyVolume[] = [
  { hour: "6am", incoming: 12, outgoing: 8 },
  { hour: "8am", incoming: 45, outgoing: 32 },
  { hour: "10am", incoming: 78, outgoing: 65 },
  { hour: "12pm", incoming: 92, outgoing: 80 },
  { hour: "2pm", incoming: 85, outgoing: 78 },
  { hour: "4pm", incoming: 68, outgoing: 62 },
  { hour: "6pm", incoming: 42, outgoing: 38 },
  { hour: "8pm", incoming: 25, outgoing: 20 },
  { hour: "10pm", incoming: 15, outgoing: 12 },
];

export const MOCK_AGENTS: AgentPerformance[] = [
  {
    id: "a1",
    name: "Priya Sharma",
    conversations: 142,
    resolved: 138,
    avgResponseTime: "1.2m",
    satisfaction: 4.9,
  },
  {
    id: "a2",
    name: "David Park",
    conversations: 118,
    resolved: 112,
    avgResponseTime: "2.1m",
    satisfaction: 4.7,
  },
  {
    id: "a3",
    name: "Sofia Reyes",
    conversations: 96,
    resolved: 89,
    avgResponseTime: "2.8m",
    satisfaction: 4.6,
  },
  {
    id: "a4",
    name: "Amara Okafor",
    conversations: 85,
    resolved: 80,
    avgResponseTime: "3.5m",
    satisfaction: 4.5,
  },
  {
    id: "a5",
    name: "Lucas Meyer",
    conversations: 72,
    resolved: 65,
    avgResponseTime: "4.0m",
    satisfaction: 4.3,
  },
];

export const MOCK_WEEKLY_TREND: { label: string; value: number }[] = [
  { label: "Mon", value: 420 },
  { label: "Tue", value: 510 },
  { label: "Wed", value: 480 },
  { label: "Thu", value: 560 },
  { label: "Fri", value: 530 },
  { label: "Sat", value: 310 },
  { label: "Sun", value: 240 },
];
