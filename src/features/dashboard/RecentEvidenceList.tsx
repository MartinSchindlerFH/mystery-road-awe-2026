import type { Evidence } from "../../../js/types.js";
import { Badge, statusTone } from "../../components/Badge.jsx";

type RecentEvidenceListProps = {
  evidence: Evidence[];
};

export function RecentEvidenceList({ evidence }: RecentEvidenceListProps) {
  return (
    <div className="dashboard-panel">
      <h3>Recent evidence</h3>
      {evidence.length === 0 && <p>No evidence loaded yet.</p>}
      {evidence.map((ev) => (
        <div key={ev.id} className="mini-list-item">
          <strong>{ev.id}</strong> - {ev.title}{" "}
          <Badge label={ev.status} tone={statusTone(ev.status)} />
        </div>
      ))}
    </div>
  );
}
