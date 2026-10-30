import type { CaseLocation, Person } from "../../../js/types";
import { FilterAction, FilterState } from "./TimelinePage";
import { ActionDispatch } from "react";

type TimelineToolbarProps = {
  people: Person[];
  locations: CaseLocation[];
  types: string[];
  filters: FilterState;
  filterDispatch: ActionDispatch<[action: FilterAction]>;
};

export function TimelineToolbar({
  people,
  locations,
  types,
  filters,
  filterDispatch,
}: TimelineToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label htmlFor="timelineOrder" className="visually-hidden">
          Order
        </label>
        <select
          id="timelineOrder"
          value={filters.sortTimeline}
          onChange={(event) =>
            filterDispatch({
              type: "sortTimelineChanged",
              sortTimeline: event.target.value,
            })
          }
        >
          <option value="asc">Oldest first</option>
          <option value="desc">Newest first</option>
        </select>

        <label htmlFor="timelinePersonFilter" className="visually-hidden">
          Filter by person
        </label>
        <select
          id="timelinePersonFilter"
          value={filters.filterPerson}
          onChange={(event) =>
            filterDispatch({
              type: "filterPersonChanged",
              filterPerson: event.target.value,
            })
          }
        >
          <option value="">All people</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <label htmlFor="timelineLocationFilter" className="visually-hidden">
          Filter by location
        </label>
        <select
          id="timelineLocationFilter"
          value={filters.filterLocation}
          onChange={(event) =>
            filterDispatch({
              type: "filterLocationChanged",
              filterLocation: event.target.value,
            })
          }
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.id}
            </option>
          ))}
        </select>

        <label htmlFor="timelineTypeFilter" className="visually-hidden">
          Filter by event type
        </label>
        <select
          id="timelineTypeFilter"
          value={filters.filterType}
          onChange={(event) =>
            filterDispatch({
              type: "filterTypeChanged",
              filterType: event.target.value,
            })
          }
        >
          <option value="">All event types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
