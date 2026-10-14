import type { TimelineEvent } from "../../js/types.js";
import { formatDate } from "../../js/utils.js";
import { Badge, certaintyTone } from "./Badge.jsx";

type TimelineEventCardProps = {
  event: TimelineEvent;
  locationNames: string[];
};

export function TimelineEventCard({
  event,
  locationNames,
}: TimelineEventCardProps) {
  return (
    <div className={"timeline-event certainty-" + event.certainty}>
      <div className="timeline-time">
        {formatDate(event.time)} -{" "}
        <Badge label={event.certainty} tone={certaintyTone(event.certainty)} />
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {locationNames.length > 0 && (
        <p className="evidence-meta">Location: {locationNames.join(", ")}</p>
      )}
      {event.evidenceIds.map((id) => (
        <button key={id} type="button" className="evidence-link-btn">
          View {id}
        </button>
      ))}
    </div>
  );
}
