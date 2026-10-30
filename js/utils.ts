import type { Evidence, Person } from "./types.js";

export function evidenceMentionsPerson(ev: Evidence, person: Person): boolean {
  return ev.personIds.indexOf(person.id) !== -1;
}

export function formatDate(ts: string | undefined): string {
  if (!ts) return "Unknown date";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts;
  return (
    d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
}

export const getStatusBadgeClass = (status: string | undefined): string => {
  const s = (status || "").toLowerCase();
  if (s === "reviewed") return "badge-reviewed";
  if (s === "flagged") return "badge-flagged";
  return "badge-unreviewed";
};

export const getRelevanceBadgeClass = (
  relevance: string | undefined,
): string => {
  const r = (relevance || "").toLowerCase();
  if (r === "relevant") return "badge-relevant";
  return "badge-unreviewed";
};

interface IdObject {
  id: string;
}

export function getObjectById<T extends IdObject>(list: T[], id: string): T {
  return list.filter((o) => o.id === id)[0];
}
