export const ASSIGNEE_OPTIONS = [
  { id: "admin-1", label: "Admin - Sarah Khan", role: "Admin" as const },
  { id: "agent-1", label: "Member - John Doe", role: "Member" as const },
  { id: "agent-2", label: "Member - Priya Sharma", role: "Member" as const },
] as const;

export const getDisplayName = (assigneeId: string) => {
  const match = ASSIGNEE_OPTIONS.find((o) => o.id === assigneeId);
  if (!match) return assigneeId;
  const [, name] = match.label.split(" - ");
  return name ?? match.label;
};
