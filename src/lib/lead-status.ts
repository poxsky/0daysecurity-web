export const leadStatuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const;

export type LeadStatus = (typeof leadStatuses)[number]["value"];

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.some((status) => status.value === value);
}

export function leadStatusLabel(value: string) {
  return leadStatuses.find((status) => status.value === value)?.label ?? value;
}
