import { useSearchParams } from "react-router";
import { PageSection } from "../../components/PageSection.jsx";
import type { CaseFile } from "../../../js/data/caseData.js";
import { TimelineList } from "./TimelineList.jsx";
import { TimelineToolbar } from "./TimelineToolbar.jsx";
import { useReducer } from "react";

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
        filters={filters}
        filterDispatch={dispatch}
      />
      <TimelineList
        events={events}
        locations={file.locations}
        filters={filters}
      />
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
