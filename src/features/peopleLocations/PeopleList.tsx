import { Link } from "react-router";
import type { Person } from "../../../js/types";
import { PersonCard } from "./PersonCard.jsx";

export type PersonEntry = {
  person: Person;
  evidenceCount: number;
};

type PeopleListProps = {
  entries: PersonEntry[];
};

export function PeopleList({ entries }: PeopleListProps) {
  return (
    <div className="people-grid">
      {entries.map(({ person, evidenceCount }) => (
        <PersonCard key={person.id} person={person}>
          <p>
            {evidenceCount} related evidence item
            {evidenceCount === 1 ? "" : "s"} -{" "}
            <Link
              to={"/team/people/" + person.id}
              className="evidence-count-link"
            >
              view
            </Link>
          </p>
        </PersonCard>
      ))}
    </div>
  );
}
