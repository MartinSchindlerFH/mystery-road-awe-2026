import type { CaseLocation } from "../../js/types.js";

type LocationCardProps = {
  location: CaseLocation;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="location-card">
      <h3>
        {location.id} - {location.name}
      </h3>
      <p>{location.description}</p>
      <p>
        <strong>Contains:</strong>
      </p>
      <ul>
        {location.contains.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
