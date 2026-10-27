import { Link, useParams } from "react-router";
import { evidenceMentionsPerson } from "../../../js/utils";
import { Badge, statusTone } from "../../components/Badge.jsx";
import { PageSection } from "../../components/PageSection.jsx";
import type { CaseFile } from "../../../js/data/caseData.js";
import { NotFoundPage } from "../../shell/NotFoundPage.jsx";
import { PersonCard } from "./PersonCard.jsx";

type PersonDetailPageProps = {
  file: CaseFile;
};

export function PersonDetailPage({ file }: PersonDetailPageProps) {
  const { personId } = useParams<"personId">();
  const person = file.people.find((p) => p.id === personId);
  if (!person) return <NotFoundPage />;

  const related = file.evidence.filter((ev) =>
    evidenceMentionsPerson(ev, person),
  );

  return (
    <PageSection title={person.name}>
      <p>
        <Link to="/team/people">Back to all people</Link> -{" "}
        <Link to={"/timeline?person=" + person.id}>Timeline events</Link>
      </p>
      <PersonCard person={person} />
      <h3>Related evidence</h3>
      {related.length === 0 ? (
        <p>No evidence mentions this person.</p>
      ) : (
        <ul>
          {related.map((ev) => (
            <li key={ev.id}>
              <strong>{ev.id}</strong> - {ev.title}{" "}
              <Badge label={ev.status} tone={statusTone(ev.status)} />
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
