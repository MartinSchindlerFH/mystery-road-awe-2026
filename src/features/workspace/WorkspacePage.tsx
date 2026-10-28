import { PageSection } from "../../components/PageSection";
import { HypothesisCard } from "./HypothesisCard";
import { BookmarkedEvidenceSection } from "./BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./PersonalNotesSection";
import { CaseFile, loadNoteForEvidence } from "../../../js/data/caseData";
import { useContext } from "react";
import { BookmarkContext } from "../../App";

type WorkspacePageProps = {
  file: CaseFile;
};

export function WorkspacePage({ file }: WorkspacePageProps) {
  const bookmarkProvider = useContext(BookmarkContext);
  return (
    <PageSection title="Investigator Workspace">
      <div className="workspace-grid">
        <BookmarkedEvidenceSection
          bookmarkedEvidence={file.evidence.filter(
            (ev) => bookmarkProvider?.bookmarkedIds.has(ev.id) ?? false,
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
