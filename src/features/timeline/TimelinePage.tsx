import { useSearchParams } from "react-router";
import { PageSection } from "../../components/PageSection.jsx";
import type { CaseFile } from "../../../js/data/caseData.js";
import { TimelineList } from "./TimelineList.jsx";
import { TimelineToolbar } from "./TimelineToolbar.jsx";
import { useReducer, useState } from "react";
import { TimelineEvidenceModal } from "./TimelineEvidenceModal";
import { getObjectById } from "../../../js/utils";
import { Evidence } from "../../../js/types";

type TimelinePageProps = {
  file: CaseFile;
};

export function TimelinePage({ file }: TimelinePageProps) {
  const [searchParams] = useSearchParams();
  const selectedPerson = searchParams.get("person") ?? "";

  const [filters, dispatch] = useReducer(
    filterReducer,
    initialFilters(selectedPerson),
  );

  const [selectedEvidence, setSelectedEvidence] = useState<
    Evidence | undefined
  >(undefined);

  const types = [...new Set(file.timeline.map((event) => event.type))];

  return (
    <PageSection title="Investigation Timeline">
      <TimelineToolbar
        people={file.people}
        locations={file.locations}
        types={types}
        filters={filters}
        filterDispatch={dispatch}
      />
      <TimelineList
        events={file.timeline}
        locations={file.locations}
        filters={filters}
        selectEvidence={(evidenceId) =>
          setSelectedEvidence(getObjectById(file.evidence, evidenceId))
        }
      />
      {selectedEvidence ? (
        <TimelineEvidenceModal
          selectedEvidence={selectedEvidence}
          clearSelectedEvidence={() => setSelectedEvidence(undefined)}
        />
      ) : (
        ""
      )}
    </PageSection>
  );
}

// --------------------------- Settings Reducer ----------------------------------
export type FilterState = {
  sortTimeline: string;
  filterPerson: string;
  filterLocation: string;
  filterType: string;
};

export type FilterAction =
  | { type: "sortTimelineChanged"; sortTimeline: string }
  | { type: "filterPersonChanged"; filterPerson: string }
  | { type: "filterLocationChanged"; filterLocation: string }
  | { type: "filterTypeChanged"; filterType: string };

export function initialFilters(selectedPerson: string): FilterState {
  return {
    sortTimeline: "asc",
    filterPerson: selectedPerson ?? "",
    filterLocation: "",
    filterType: "",
  };
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "sortTimelineChanged":
      return { ...state, sortTimeline: action.sortTimeline };
    case "filterPersonChanged":
      return { ...state, filterPerson: action.filterPerson };
    case "filterLocationChanged":
      return { ...state, filterLocation: action.filterLocation };
    case "filterTypeChanged":
      return { ...state, filterType: action.filterType };
  }
}
