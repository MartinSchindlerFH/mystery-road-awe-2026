import type { CaseData } from "../../js/types.js";
import { Badge } from "./Badge.jsx";

type CaseSummaryCardProps = {
  caseData: CaseData;
};

export function CaseSummaryCard({ caseData }: CaseSummaryCardProps) {
  return (
    <div className="case-summary-card">
      <h3>{caseData.title}</h3>
      <p>
        <Badge label={caseData.status.toUpperCase()} tone="flagged" />
      </p>
      <p>{caseData.summary}</p>
    </div>
  );
}
