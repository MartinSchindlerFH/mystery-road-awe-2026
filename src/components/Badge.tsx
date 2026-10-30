export type BadgeTone =
  "unreviewed" | "reviewed" | "flagged" | "relevant" | "critical";

type BadgeProps = {
  label: string;
  tone: BadgeTone;
};

export function Badge({ label, tone }: BadgeProps) {
  return <span className={"badge badge-" + tone}>{label}</span>;
}

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  let tone: BadgeTone;
  switch ((status || "").toLowerCase()) {
    case "reviewed":
      tone = "reviewed";
      break;
    case "flagged":
      tone = "flagged";
      break;
    default:
      tone = "unreviewed";
      break;
  }
  return <Badge label={status} tone={tone} />;
}

type CertaintyBadgeProps = {
  certainty: string;
};

export function CertaintyBadge({ certainty }: CertaintyBadgeProps) {
  let tone: BadgeTone;
  switch ((certainty || "").toLowerCase()) {
    case "confirmed":
      tone = "reviewed";
      break;
    case "contradictory":
      tone = "critical";
      break;
    case "reported":
      tone = "flagged";
      break;
    default:
      tone = "unreviewed";
      break;
  }
  return <Badge label={certainty} tone={tone} />;
}

type RelevanceBadgeProps = {
  relevance: string;
};

export function RelevanceBadge({ relevance }: RelevanceBadgeProps) {
  let tone: BadgeTone;
  switch ((relevance || "").toLowerCase()) {
    case "relevant":
      tone = "relevant";
      break;
    default:
      tone = "unreviewed";
      break;
  }
  return <Badge label={relevance} tone={tone} />;
}
