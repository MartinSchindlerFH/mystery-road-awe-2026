import { Evidence } from "../../../js/types";
import { formatDate } from "../../../js/utils";
import { useNavigate } from "react-router";

type TimelineEvidenceModalProps = {
  selectedEvidence: Evidence;
  clearSelectedEvidence: () => void;
};

export function TimelineEvidenceModal({
  selectedEvidence: evidence,
  clearSelectedEvidence,
}: TimelineEvidenceModalProps) {
  // Required for "Open full evidence" button
  const navigate = useNavigate();

  return (
    <div id="quickViewModal">
      <div className="modal-backdrop">
        <div className="modal-box">
          <button
            type="button"
            className="modal-close-btn"
            onClick={clearSelectedEvidence}
            aria-label="Close"
          >
            x
          </button>
          <h3>{evidence.title}</h3>
          <p className="evidence-meta">
            {evidence.id} &middot; {evidence.type} &middot;{" "}
            {formatDate(evidence.timestamp)}
          </p>
          <p>{evidence.summary}</p>
          <button
            type="button"
            className="btn btn-primary btn-small"
            onClick={() => navigate(`/evidence?evidence=${evidence.id}`)}
          >
            Open full evidence
          </button>
        </div>
      </div>
    </div>
  );
}
