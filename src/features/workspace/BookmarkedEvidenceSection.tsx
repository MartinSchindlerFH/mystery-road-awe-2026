import { Evidence } from "../../../js/types";

type BookmarkedEvidenceSectionProps = {
  bookmarkedEvidence: Evidence[];
};

export function BookmarkedEvidenceSection({
  bookmarkedEvidence,
}: BookmarkedEvidenceSectionProps) {
  return (
    <div className="workspace-col">
      <h3>Bookmarked Evidence</h3>
      <div id="bookmarksList" className="bookmarks-list">
        {bookmarkedEvidence.length === 0 ? (
          <p>
            No bookmarked evidence yet. Bookmark items from the Evidence view.
          </p>
        ) : (
          bookmarkedEvidence.map((evidence) => (
            <div className="mini-list-item">
              <strong>{evidence.id}</strong> &mdash; {evidence.title}
              <button
                type="button"
                className="btn btn-small btn-secondary"
                data-open-evidence={evidence.id}
              >
                Open
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
