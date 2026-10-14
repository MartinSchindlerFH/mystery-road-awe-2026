import type { CaseFile } from "../../data/caseData.js";
import { PageSection } from "../../components/PageSection.jsx";
import { TimelineList } from "./TimelineList.jsx";

type TimelinePageProps = {
  file: CaseFile;
};

export function TimelinePage({ file }: TimelinePageProps) {
  const events = file.timeline
    .slice()
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <PageSection title="Investigation Timeline">
      <TimelineList events={events} locations={file.locations} />
    </PageSection>
  );
}
