import { useSearchParams } from "react-router";
import { PageSection } from "../../components/PageSection.jsx";
import type { CaseFile } from "../../../js/data/caseData.js";
import { TimelineList } from "./TimelineList.jsx";
import { TimelineToolbar } from "./TimelineToolbar.jsx";

type TimelinePageProps = {
  file: CaseFile;
};

export function TimelinePage({ file }: TimelinePageProps) {
  const [searchParams] = useSearchParams();
  const selectedPerson = searchParams.get("person") ?? "";

  const events = file.timeline
    .filter(
      (event) =>
        !selectedPerson || event.personIds.some((id) => id === selectedPerson),
    )
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  const types = [...new Set(file.timeline.map((event) => event.type))];

  return (
    <PageSection title="Investigation Timeline">
      <TimelineToolbar
        people={file.people}
        locations={file.locations}
        types={types}
        selectedPerson={selectedPerson}
      />
      <TimelineList events={events} locations={file.locations} />
    </PageSection>
  );
}
