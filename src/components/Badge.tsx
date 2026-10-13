export type BadgeTone =
  "unreviewed" | "reviewed" | "flagged" | "relevant" | "critical";

type BadgeProps = {
  label: string;
  tone: BadgeTone;
};

export function statusTone(status: string): BadgeTone {
  const s = status.toLowerCase();
  if (s === "reviewed") return "reviewed";
  if (s === "flagged") return "flagged";
  return "unreviewed";
}

export function Badge({ label, tone }: BadgeProps) {
  return <span className={"badge badge-" + tone}>{label}</span>;
}
