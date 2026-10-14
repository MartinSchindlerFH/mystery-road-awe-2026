import type { CaseLocation, TimelineEvent } from "../../../js/types.js";
import { TimelineEventCard } from "./TimelineEventCard.jsx";

type TimelineListProps = {
  events: TimelineEvent[];
  locations: CaseLocation[];
};

function locationNamesFor(ids: string[], locations: CaseLocation[]): string[] {
  return ids.map((id) => {
    const location = locations.find((loc) => loc.id === id);
    return location ? location.id + " - " + location.name : id;
  });
}

export function TimelineList({ events, locations }: TimelineListProps) {
  if (events.length === 0) {
    return <p>No timeline events match the current filters.</p>;
  }

  return (
    <div className="timeline-container">
      {events.map((event) => (
        <TimelineEventCard
          key={event.id}
          event={event}
          locationNames={locationNamesFor(event.locationIds, locations)}
        />
      ))}
    </div>
  );
}
