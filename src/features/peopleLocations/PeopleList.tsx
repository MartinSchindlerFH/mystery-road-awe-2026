import type { Person } from "../../../js/types.js";
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
        <PersonCard
          key={person.id}
          person={person}
          evidenceCount={evidenceCount}
        />
      ))}
    </div>
  );
}
