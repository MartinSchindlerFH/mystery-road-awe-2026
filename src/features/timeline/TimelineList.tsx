import type { CaseLocation, TimelineEvent } from "../../../js/types";
import { TimelineEventCard } from "./TimelineEventCard.jsx";
import { FilterState } from "./TimelinePage";

type TimelineListProps = {
  events: TimelineEvent[];
  locations: CaseLocation[];
  filters: FilterState;
  selectEvidence: (evidenceId: string) => void;
};

export function TimelineList({
  events,
  locations,
  filters,
  selectEvidence,
}: TimelineListProps) {
  if (events.length === 0) {
    return <p>No timeline events match the current filters.</p>;
  }

  return (
    <div className="timeline-container">
      {sortEvents(filterEvents(events, filters), filters.sortTimeline).map(
        (event) => (
          <TimelineEventCard
            key={event.id}
            event={event}
            locations={locations}
            selectEvidence={selectEvidence}
          />
        ),
      )}
    </div>
  );
}

function filterEvents(events: TimelineEvent[], filters: FilterState) {
  return events
    .filter((event) =>
      filters.filterType !== "" ? event.type === filters.filterType : true,
    )
    .filter((event) =>
      filters.filterLocation !== ""
        ? event.locationIds.includes(filters.filterLocation)
        : true,
    )
    .filter((event) =>
      filters.filterPerson !== ""
        ? event.personIds.some((id) => id === filters.filterPerson)
        : true,
    );
}

function sortEvents(events: TimelineEvent[], sort: string): TimelineEvent[] {
  switch (sort) {
    case "asc":
      return events.sort((a, b) => a.time.localeCompare(b.time));
    case "desc":
    default:
      return events.sort((a, b) => b.time.localeCompare(a.time));
  }
}
