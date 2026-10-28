import { Evidence } from "../../../js/types";
import {
  formatDate,
  getRelevanceBadgeClass,
  getStatusBadgeClass,
} from "../../../js/utils";
import { useContext } from "react";
import { BookmarkContext } from "../../App";

type EvidenceCardProp = {
  evidence: Evidence;
  handleShowEvidenceDetailView: () => void;
};

export function EvidenceCard({
  evidence,
  handleShowEvidenceDetailView,
}: EvidenceCardProp) {
  const bookmarkProvider = useContext(BookmarkContext);

  const isBookmarked =
    (bookmarkProvider?.bookmarkedIds.indexOf(evidence.id) ?? -1) !== -1;

  return (
    <div
      className="evidence-card"
      key={evidence.id}
      onClick={handleShowEvidenceDetailView}
    >
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        data-action="bookmark"
        aria-label={`Toggle bookmark for ${evidence.id}`}
        onClick={(event) => {
          // Prevent the higher-level handler opening the Detail view from firing
          event.stopPropagation();
          bookmarkProvider?.toggleBookmark(evidence.id);
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
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
