import type { Evidence } from "../../../js/types";
import { Badge, statusTone } from "../../components/Badge.jsx";
import { Panel } from "./Panel.jsx";

type RecentEvidenceListProps = {
  evidence: Evidence[];
};

export function RecentEvidenceList({ evidence }: RecentEvidenceListProps) {
  return (
    <Panel title="Recent evidence">
      {evidence.length === 0 && <p>No evidence loaded yet.</p>}
      {evidence.map((ev) => (
        <div key={ev.id} className="mini-list-item">
          <strong>{ev.id}</strong> - {ev.title}{" "}
          <Badge label={ev.status} tone={statusTone(ev.status)} />
        </div>
      ))}
    </Panel>
  );
}
