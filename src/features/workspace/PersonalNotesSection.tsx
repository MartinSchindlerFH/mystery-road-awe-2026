import { Evidence } from "../../../js/types";
import { getObjectById } from "../../../js/utils";
import { loadNoteForEvidence } from "../../../v1/storage";

type PersonalNotesProps = {
  evidenceWithNotes: Evidence[];
};

export function PersonalNotesSection({
  evidenceWithNotes,
}: PersonalNotesProps) {
  return (
    <div className="workspace-col">
      <h3>Personal Notes</h3>
      <p className="hint-text">
        Notes are attached to whichever evidence item is currently open in the
        Evidence view.
      </p>
      <div id="notesList" className="notes-list">
        {evidenceWithNotes.length === 0 ? (
          <p>No notes yet. Add one from an evidence item's detail view.</p>
        ) : (
          evidenceWithNotes.map((evidence) => {
            const note = loadNoteForEvidence(evidence.id);
            return (
              <div className="mini-list-item" key={evidence.id}>
                <strong>{evidence.id}</strong> &mdash; {evidence.title}
                <div id={`noteText-${evidence.id}`}>{note}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
