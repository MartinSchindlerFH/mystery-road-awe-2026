import { CaseLocation, Evidence, Person } from "../../../js/types";
import { formatDate, getObjectById } from "../../../js/utils";
import { useState } from "react";
import {
  loadNoteForEvidence,
  saveNoteForEvidence,
} from "../../../js/data/caseData";

type EvidenceDetail = {
  evidence: Evidence;
  people: Person[];
  locations: CaseLocation[];
  handleCloseDetailView: () => void;
};

export function EvidenceDetail({
  evidence,
  people,
  locations,
  handleCloseDetailView,
}: EvidenceDetail) {
  const [note, setNote] = useState<string>(loadNoteForEvidence(evidence.id));
  const [reviewStatus, setReviewStatus] = useState(evidence.status);
  const [reviewRelevance, setReviewRelevance] = useState(evidence.relevance);

  return (
    <div>
      <div className="evidence-detail-header">
        <div>
          <h2>{evidence.id}</h2>
          <div className="evidence-meta">
            {evidence.id} · {evidence.type} · {formatDate(evidence.timestamp)}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-small"
          onClick={handleCloseDetailView}
        >
          Close
        </button>
      </div>
      {evidence.tags.indexOf("critical") !== -1 ? (
        <div className="warning-banner">
          This item is tagged as critical evidence.
        </div>
      ) : (
        ""
      )}
      <div className="detail-field">
        <strong>Summary</strong>
        {evidence.summary}
      </div>
      <div className="evidence-detail-content">{evidence.content}</div>
      <div className="detail-field">
        <strong>Related people</strong>
        {evidence.personIds
          .map((personId) => getObjectById(people, personId)?.name ?? personId)
          .join(", ")}
      </div>
      <div className="detail-field">
        <strong>Related locations</strong>
        {evidence.locationIds
          .map((locationId) => {
            const location = getObjectById(locations, locationId);
            return location ? `${location.id} - ${location.name}` : locationId;
          })
          .join(", ")}
      </div>
      <div className="detail-field">
        <strong>Tags</strong>
        {evidence.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="detail-field">
        <strong>Review status</strong>
        <select
          id="detailStatusSelect"
          value={reviewStatus}
          onChange={(e) => setReviewStatus(e.target.value)}
        >
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>
      <div className="detail-field">
        <strong>Relevance</strong>
        <select
          id="detailRelevanceSelect"
          value={reviewRelevance}
          onChange={(e) => setReviewRelevance(e.target.value)}
        >
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </select>
      </div>
      <div className="detail-field">
        <strong>Investigator note</strong>
        <textarea
          id="evidenceNoteInput"
          className="note-textarea"
          rows={3}
          placeholder="Add a private note about this evidence..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary btn-small"
          style={{ marginTop: "6px" }}
          onClick={() => saveNoteForEvidence(evidence.id, note)}
        >
          Save note
        </button>
      </div>
      <div className="detail-field">
        <strong>Note preview</strong>
        <div id="notePreview">{note}</div>
      </div>
    </div>
  );
}
