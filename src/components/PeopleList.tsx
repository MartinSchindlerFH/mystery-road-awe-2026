import type { Evidence, Person } from "../../js/types.js";
import { evidenceMentionsPerson } from "../../js/utils.js";
import { PersonCard } from "./PersonCard.jsx";

type PeopleListProps = {
  people: Person[];
  evidence: Evidence[];
};

export function PeopleList({ people, evidence }: PeopleListProps) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          evidenceCount={
            evidence.filter((ev) => evidenceMentionsPerson(ev, person)).length
          }
        />
      ))}
    </div>
  );
}
