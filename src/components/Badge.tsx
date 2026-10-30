export type BadgeTone =
  "unreviewed" | "reviewed" | "flagged" | "relevant" | "critical";

type BadgeProps = {
  label: string;
  tone: BadgeTone;
};

export function Badge({ label, tone }: BadgeProps) {
  return <span className={"badge badge-" + tone}>{label}</span>;
}

export function statusTone(status: string): BadgeTone {
  const s = status.toLowerCase();
  switch (s) {
    case "reviewed":
      return "reviewed";
    case "flagged":
      return "flagged";
    default:
      return "unreviewed";
  }
}

export function certaintyTone(certainty: string): BadgeTone {
  switch (certainty) {
    case "confirmed":
      return "reviewed";
    case "contradictory":
      return "critical";
    case "reported":
      return "flagged";
    default:
      return "unreviewed";
  }
}

export function relevanceTone(relevance: string): BadgeTone {
  const s = (relevance || "").toLowerCase();
  switch (s) {
    case "relevant":
      return "relevant";
    default:
      return "unreviewed";
  }
}
