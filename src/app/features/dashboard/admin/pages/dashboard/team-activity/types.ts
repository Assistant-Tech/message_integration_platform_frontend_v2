export type MemberStatus = "online" | "away" | "busy" | "offline";

export type ActivityAction =
  | "replied"
  | "resolved"
  | "assigned"
  | "tagged"
  | "transferred"
  | "noted";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: MemberStatus;
  activeMinutesToday: number;
  activeConversations: number;
  resolvedToday: number;
  avgResponseTime: string;
  lastActiveAt: string;
}

export interface ActivityEvent {
  id: string;
  memberId: string;
  memberName: string;
  action: ActivityAction;
  target: string;
  channel: string;
  timestamp: string;
}

export interface TeamSummary {
  totalMembers: number;
  online: number;
  away: number;
  busy: number;
  offline: number;
  avgResponseTime: string;
  totalResolved: number;
}
