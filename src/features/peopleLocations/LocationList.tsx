import type { CaseLocation } from "../../../js/types";
import { LocationCard } from "./LocationCard.jsx";

type LocationListProps = {
  locations: CaseLocation[];
};

export function LocationList({ locations }: LocationListProps) {
  return (
    <div className="locations-grid">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
