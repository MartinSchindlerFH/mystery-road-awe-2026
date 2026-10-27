export type EvidenceNote = {
  id: string;
  title: string;
  note: string;
};

type PersonalNotesProps = {
  evidenceNotes: EvidenceNote[];
};

export function PersonalNotesSection({ evidenceNotes }: PersonalNotesProps) {
  return (
    <div className="workspace-col">
      <h3>Personal Notes</h3>
      <p className="hint-text">
        Notes are attached to whichever evidence item is currently open in the
        Evidence view.
      </p>
      <div id="notesList" className="notes-list">
        {evidenceNotes.length === 0 ? (
          <p>No notes yet. Add one from an evidence item's detail view.</p>
        ) : (
          evidenceNotes.map((evidenceNote) => (
            <div className="mini-list-item" key={evidenceNote.id}>
              <strong>{evidenceNote.id}</strong> &mdash; {evidenceNote.title}
              <div id={`noteText-${evidenceNote.id}`}>{evidenceNote.note}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
