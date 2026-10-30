import type { CaseLocation, TimelineEvent } from "../../../js/types";
import { TimelineEventCard } from "./TimelineEventCard.jsx";

type TimelineListProps = {
  events: TimelineEvent[];
  locations: CaseLocation[];
};

export function TimelineList({ events, locations }: TimelineListProps) {
  if (events.length === 0) {
    return <p>No timeline events match the current filters.</p>;
  }

  return (
    <div className="timeline-container">
      {events.map((event) => (
        <TimelineEventCard key={event.id} event={event} locations={locations} />
      ))}
    </div>
  );
}
