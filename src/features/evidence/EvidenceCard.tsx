import { Evidence } from "../../../js/types";
import {
  formatDate,
  getRelevanceBadgeClass,
  getStatusBadgeClass,
} from "../../../js/utils";
import { toggleBookmarkAndStore } from "../../../js/data/caseData";

type EvidenceCardProp = {
  evidence: Evidence;
  isBookmarked: boolean;
};

export function EvidenceCard({ evidence, isBookmarked }: EvidenceCardProp) {
  return (
    <div
      className="evidence-card"
      data-id={evidence.id}
      key={evidence.id}
      onClick={() => {
        // TODO missing state management (comes in task 2) causes no re-renders to happen if another card is selected
        alert(`Card ${evidence.id} clicked`);
      }}
    >
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        data-action="bookmark"
        data-id={evidence.id}
        aria-label={`Toggle bookmark for ${evidence.id}`}
        onClick={(event) => {
          // Prevent the higher-level handler opening the Detail view from firing
          event.stopPropagation();
          // TODO alert required because missing state management (comes in task 2) causes no re-render to be requested
          alert(`Toggle bookmark for ${evidence.id}`);
          toggleBookmarkAndStore(evidence.id);
        }}
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
