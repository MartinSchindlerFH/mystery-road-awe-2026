import React, { ReactNode } from "react";

type PersonCardProps = {
  id: string;
  name: string;
  imgUrl: string;
  role: string;
  specialty: string;
  statement: string;
  responsibilities: string[];
  evidenceNo: number;
};

export function PersonCard(person: PersonCardProps) {
  return (
    <div className="person-card">
      <div className="person-card-header">
        <img className="person-avatar" src={person.imgUrl} alt={`Portrait of ${person.name}`} />
        <div>
          <h3>{person.name}</h3>
          <div className="person-role">{person.role}</div>
        </div>
        <p>
          <strong>Speciality:</strong>
          {person.specialty}
        </p>
        <ul>
          {person.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
        <div className="person-statement">&ldquo;{person.statement}&ldquo;</div>
        <p>
          {person.evidenceNo} related evidence item{person.evidenceNo > 1 ? "s" : ""} &mdash;
          <button type="button" className="evidence-count-link" data-person-id={person.id}>
            view
          </button>
        </p>
      </div>
    </div>
  );
}

type LocationCardProps = {
  id: string;
  name: string;
  description: string;
  children: ReactNode;
};

export function LocationCard(location: LocationCardProps) {
  return (
    <div className="location-card">
      <h3>
        {location.id} &mdash; {location.name}
      </h3>
      <p>{location.description}</p>
      {location.children}
    </div>
  );
}
