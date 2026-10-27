import { PageSection } from "../../components/PageSection";
import { HypothesisCard } from "./HypothesisCard";
import { BookmarkedEvidenceSection } from "./BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./PersonalNotesSection";
import {
  CaseFile,
  loadNoteForEvidence,
  readStoredBookmarks,
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
            (ev) => readStoredBookmarks().indexOf(ev.id) !== -1,
          )}
        />

        <PersonalNotesSection
          evidenceWithNotes={file.evidence.filter(
            (ev) => loadNoteForEvidence(ev.id) !== "",
          )}
        />
      </div>

      <HypothesisCard people={file.people} evidence={file.evidence} />
    </PageSection>
  );
}
