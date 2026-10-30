import type { CaseLocation, TimelineEvent } from "../../../js/types";
import { formatDate, getObjectById } from "../../../js/utils.js";
import { Badge, certaintyTone } from "../../components/Badge.jsx";

type TimelineEventCardProps = {
  event: TimelineEvent;
  locations: CaseLocation[];
  selectEvidence: (evidenceId: string) => void;
};

export function TimelineEventCard({
  event,
  locations,
  selectEvidence,
}: TimelineEventCardProps) {
  return (
    <div className={"timeline-event certainty-" + event.certainty}>
      <div className="timeline-time">
        {formatDate(event.time)} -{" "}
        <Badge label={event.certainty} tone={certaintyTone(event.certainty)} />
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {event.locationIds.length > 0 && (
        <p className="evidence-meta">
          Location:{" "}
          {event.locationIds
            .map((id) => {
              const location = getObjectById(locations, id);
              return location ? `${id} - ${location.name}` : id;
            })
            .join(", ")}
        </p>
      )}
      {event.evidenceIds.map((id) => (
        <button
          key={id}
          type="button"
          className="evidence-link-btn"
          onClick={() => selectEvidence(id)}
        >
          View {id}
        </button>
      ))}
    </div>
  );
}
