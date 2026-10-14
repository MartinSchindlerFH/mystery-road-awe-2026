import React from "react";
import { certaintyBadgeClass, formatDate } from "../../utils/format";

type TimelineEventProps = {
  time: string;
  title: string;
  certainty: string;
  description: string;
  locations: string[];
  evidenceIds: string[];
};

export function TimelineEvent(event: TimelineEventProps) {
  return (
    <div className={`timeline-event certainty-${event.certainty}`}>
      <div className="timeline-time">
        {formatDate(event.time)}
        &nbsp;&middot;&nbsp;
        <span className={`badge badge-${certaintyBadgeClass(event.certainty)}`}>
          {event.certainty}
        </span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      {event.locations?.length > 0 && (
        <p className="evidence-meta">Location: {event.locations.join(",")}</p>
      )}

      {event.evidenceIds.map((id: string) => (
        <button type="button" className="evidence-link-btn" data-evidence-id={id}>
          View {id}
        </button>
      ))}
    </div>
  );
}
