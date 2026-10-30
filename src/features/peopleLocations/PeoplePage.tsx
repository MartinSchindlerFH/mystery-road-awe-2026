import type { CaseFile } from "../../../js/data/caseData.js";
import { LocationList } from "./LocationList.jsx";
import { PageSection } from "../../components/PageSection.jsx";
import { PeopleList, type PersonEntry } from "./PeopleList.jsx";
import { TabLink } from "./TabLink.jsx";

type PeopleTab = "people" | "locations";

type PeoplePageProps = {
  file: CaseFile;
  tab: PeopleTab;
};

function countEvidence(file: CaseFile): PersonEntry[] {
  return file.people.map((person) => ({
    person,
    evidenceCount: file.evidence.filter((ev) =>
      ev.personIds.includes(person.id),
    ).length,
  }));
}

export function PeoplePage({ file, tab }: PeoplePageProps) {
  return (
    <PageSection title="People & Locations">
      <div className="tab-bar">
        <TabLink to="/team/people" label="People" />
        <TabLink to="/team/locations" label="Locations" />
      </div>
      {tab === "people" ? (
        <PeopleList entries={countEvidence(file)} />
      ) : (
        <LocationList locations={file.locations} />
      )}
    </PageSection>
  );
}
