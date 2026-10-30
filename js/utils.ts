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

interface IdObject {
  id: string;
}

export function getObjectById<T extends IdObject>(list: T[], id: string): T {
  return list.filter((o) => o.id === id)[0];
}
