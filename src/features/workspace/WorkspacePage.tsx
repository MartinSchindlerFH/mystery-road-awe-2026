import { PageSection } from "../../components/PageSection";
import { HypothesisCard } from "./HypothesisCard";
import { BookmarkedEvidenceSection } from "./BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./PersonalNotesSection";
import { CaseFile, loadNoteForEvidence } from "../../../js/data/caseData";

type WorkspacePageProps = {
  file: CaseFile;
  bookmarks: string[];
};

export function WorkspacePage({ file, bookmarks }: WorkspacePageProps) {
  return (
    <PageSection title="Investigator Workspace">
      <div className="workspace-grid">
        <BookmarkedEvidenceSection
          bookmarkedEvidence={file.evidence.filter(
            (ev) => bookmarks.indexOf(ev.id) !== -1,
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
