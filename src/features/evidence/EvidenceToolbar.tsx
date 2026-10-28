import { CaseLocation, Person } from "../../../js/types";
import { ActionDispatch } from "react";
import { FilterAction, FilterState } from "./EvidencePage";

type EvidenceToolbarProps = {
  types: string[];
  people: Person[];
  locations: CaseLocation[];
  filters: FilterState;
  filterDispatch: ActionDispatch<[action: FilterAction]>;
};

export function EvidenceToolbar({
  types,
  people,
  locations,
  filters,
  filterDispatch,
}: EvidenceToolbarProps) {
  return (
    <div className="toolbar" id="evidenceToolbar">
      <div className="toolbar-row">
        <label htmlFor="evidenceSearch" className="visually-hidden">
          Search evidence
        </label>
        <input
          type="text"
          id="evidenceSearch"
          placeholder="Search evidence by title, summary, or tag&hellip;"
          autoComplete="off"
          value={filters.searchTerm}
          onChange={(event) =>
            filterDispatch({
              type: "searchTermChanged",
              searchTerm: event.target.value,
            })
          }
        />

        <label htmlFor="filterType" className="visually-hidden">
          Filter by type
        </label>
        <select
          id="filterType"
          value={filters.filterType}
          onChange={(event) =>
            filterDispatch({
              type: "filterTypeChanged",
              filterType: event.target.value,
            })
          }
        >
          <option value="">All types</option>
          {types.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="filterPerson" className="visually-hidden">
          Filter by person
        </label>
        <select
          id="filterPerson"
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
            <option value={person.id} key={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <label htmlFor="filterLocation" className="visually-hidden">
          Filter by location
        </label>
        <select
          id="filterLocation"
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
            <option value={location.id} key={location.id}>
              {location.id}
            </option>
          ))}
        </select>
      </div>
      <div className="toolbar-row">
        <label htmlFor="filterStatus" className="visually-hidden">
          Filter by status
        </label>
        <select
          id="filterStatus"
          value={filters.filterStatus}
          onChange={(event) =>
            filterDispatch({
              type: "filterStatusChanged",
              filterStatus: event.target.value,
            })
          }
        >
          <option value="">All statuses</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </select>

        <label htmlFor="filterRelevance" className="visually-hidden">
          Filter by relevance
        </label>
        <select
          id="filterRelevance"
          value={filters.filterRelevance}
          onChange={(event) =>
            filterDispatch({
              type: "filterRelevanceChanged",
              filterRelevance: event.target.value,
            })
          }
        >
          <option value="">All relevance</option>
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </select>

        <label htmlFor="sortEvidence" className="visually-hidden">
          Sort evidence
        </label>
        <select
          id="sortEvidence"
          value={filters.sortEvidence}
          onChange={(event) =>
            filterDispatch({
              type: "sortEvidenceChanged",
              sortEvidence: event.target.value,
            })
          }
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="title-asc">Title (A&ndash;Z)</option>
          <option value="title-desc">Title (Z&ndash;A)</option>
        </select>

        <button
          type="button"
          id="clearFiltersBtn"
          className="btn btn-secondary"
          onClick={() => filterDispatch({ type: "cleared" })}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
