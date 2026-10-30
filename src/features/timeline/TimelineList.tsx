import type { CaseLocation, TimelineEvent } from "../../../js/types";
import { TimelineEventCard } from "./TimelineEventCard.jsx";
import { FilterState } from "./TimelinePage";

type TimelineListProps = {
  events: TimelineEvent[];
  locations: CaseLocation[];
  filters: FilterState;
};

export function TimelineList({
  events,
  locations,
  filters,
}: TimelineListProps) {
  if (events.length === 0) {
    return <p>No timeline events match the current filters.</p>;
  }

  return (
    <div className="timeline-container">
      {sortEvents(filterEvents(events, filters), filters).map((event) => (
        <TimelineEventCard key={event.id} event={event} locations={locations} />
      ))}
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

function sortEvents(
  events: TimelineEvent[],
  filters: FilterState,
): TimelineEvent[] {
  switch (filters.sortTimeline) {
    case "asc":
      return events.sort((a, b) => a.time.localeCompare(b.time));
    case "desc":
    default:
      return events.sort((a, b) => b.time.localeCompare(a.time));
  }
}
