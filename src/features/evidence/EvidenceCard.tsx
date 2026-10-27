import { Evidence } from "../../../js/types";
import {
  formatDate,
  getRelevanceBadgeClass,
  getStatusBadgeClass,
} from "../../../js/utils";

type EvidenceCardProp = {
  evidence: Evidence;
  isBookmarked: boolean;
};

export function EvidenceCard({ evidence, isBookmarked }: EvidenceCardProp) {
  return (
    <div className="evidence-card" data-id={evidence.id} key={evidence.id}>
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        data-action="bookmark"
        data-id={evidence.id}
        aria-label={`Toggle bookmark for ${evidence.id}`}
      >
        <span className={"bookmark-icon"}>{isBookmarked ? "★" : "☆"}</span>
      </button>
      <h3>{evidence.title}</h3>
      <div className="evidence-meta">
        {`${evidence.id} · ${evidence.type} · ${formatDate(evidence.timestamp)}`}
      </div>
      <div className="evidence-summary">{evidence.summary}</div>
      {evidence.tags.indexOf("critical") !== -1 ? (
        <span className="badge badge-critical">Critical</span>
      ) : (
        ""
      )}
      <span className={`badge ${getStatusBadgeClass(evidence.status)}`}>
        {evidence.status}
      </span>
      <span className={`badge ${getRelevanceBadgeClass(evidence.relevance)}`}>
        {evidence.relevance}
      </span>
      <div>
        {evidence.tags.map((tag) => (
          <span className="tag-chip">{tag}</span>
        ))}
      </div>
    </div>
  );
}
