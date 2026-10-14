import type { CaseFile } from "../../data/caseData.js";
import { evidenceMentionsPerson } from "../../../js/utils.js";
import { LocationList } from "./LocationList.jsx";
import { PageSection } from "../../components/PageSection.jsx";
import { PeopleList, type PersonEntry } from "./PeopleList.jsx";
import { TabButton } from "./TabButton.jsx";

type PeopleTab = "people" | "locations";

type PeoplePageProps = {
  file: CaseFile;
};

function readInitialTab(): PeopleTab {
  const tab = new URLSearchParams(window.location.search).get("tab");
  return tab === "locations" ? "locations" : "people";
}

function goToTab(tab: PeopleTab): void {
  window.location.search = "?tab=" + tab;
}

function countEvidence(file: CaseFile): PersonEntry[] {
  return file.people.map((person) => ({
    person,
    evidenceCount: file.evidence.filter((ev) =>
      evidenceMentionsPerson(ev, person),
    ).length,
  }));
}

export function PeoplePage({ file }: PeoplePageProps) {
  const tab = readInitialTab();

  return (
    <PageSection title="People & Locations">
      <div className="tab-bar">
        <TabButton
          label="People"
          active={tab === "people"}
          onSelect={() => goToTab("people")}
        />
        <TabButton
          label="Locations"
          active={tab === "locations"}
          onSelect={() => goToTab("locations")}
        />
      </div>
      {tab === "people" ? (
        <PeopleList entries={countEvidence(file)} />
      ) : (
        <LocationList locations={file.locations} />
      )}
    </PageSection>
  );
}
