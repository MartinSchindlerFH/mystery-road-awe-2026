import type { CaseFile } from "../caseData.js";
import { LocationList } from "../components/LocationList.jsx";
import { PageSection } from "../components/PageSection.jsx";
import { PeopleList } from "../components/PeopleList.jsx";
import { TabButton } from "../components/TabButton.jsx";

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
        <PeopleList people={file.people} evidence={file.evidence} />
      ) : (
        <LocationList locations={file.locations} />
      )}
    </PageSection>
  );
}
