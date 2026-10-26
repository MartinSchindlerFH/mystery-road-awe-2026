import type { TimelineEvent } from "../../../js/types";
import { formatDate } from "../../../js/utils.js";
import { Panel } from "./Panel.jsx";

type RecentTimelineListProps = {
  events: TimelineEvent[];
};

export function RecentTimelineList({ events }: RecentTimelineListProps) {
  return (
    <Panel title="Recent timeline events">
      {events.length === 0 && <p>No timeline events loaded yet.</p>}
      {events.map((evt) => (
        <div key={evt.id} className="mini-list-item">
          <strong>{formatDate(evt.time)}</strong>
          <br />
          {evt.title}
        </div>
      ))}
    </Panel>
  );
}
