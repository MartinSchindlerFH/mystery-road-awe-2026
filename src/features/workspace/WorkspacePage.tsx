import { PageSection } from "../../components/PageSection";
import { HypothesisCard } from "./HypothesisCard";
import { BookmarkedEvidenceSection } from "./BookmarkedEvidenceSection";
import { EvidenceNote, PersonalNotesSection } from "./PersonalNotesSection";
import {
  CaseFile,
  loadNoteForEvidence,
  loadBookmarks,
} from "../../../js/data/caseData";

type WorkspacePageProps = {
  file: CaseFile;
};

export function WorkspacePage({ file }: WorkspacePageProps) {
  return (
    <PageSection title="Investigator Workspace">
      <div className="workspace-grid">
        <BookmarkedEvidenceSection
          bookmarkedEvidence={file.evidence.filter(
            (ev) => loadBookmarks().indexOf(ev.id) !== -1,
          )}
        />

        <PersonalNotesSection
          evidenceNotes={file.evidence
            .map((ev) => ({
              ev: ev,
              note: loadNoteForEvidence(ev.id),
            }))
            .filter(({ note }) => note !== "")
            .map(({ ev, note }) => ({
              id: ev.id,
              title: ev.title,
              note: note,
            }))}
        />
      </div>

      <HypothesisCard people={file.people} evidence={file.evidence} />
    </PageSection>
  );
}
