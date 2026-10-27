import { CaseLocation, Person } from "../../../js/types";

type EvidenceToolbarProps = {
  types: string[];
  people: Person[];
  locations: CaseLocation[];
};

export function EvidenceToolbar({
  types,
  people,
  locations,
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
        />

        <label htmlFor="filterType" className="visually-hidden">
          Filter by type
        </label>
        <select id="filterType">
          <option value="">All types</option>
          {types.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>

        <label htmlFor="filterPerson" className="visually-hidden">
          Filter by person
        </label>
        <select id="filterPerson">
          <option value="">All people</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <label htmlFor="filterLocation" className="visually-hidden">
          Filter by location
        </label>
        <select id="filterLocation">
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.id}
            </option>
          ))}
        </select>
      </div>
      <div className="toolbar-row">
        <label htmlFor="filterStatus" className="visually-hidden">
          Filter by status
        </label>
        <select id="filterStatus">
          <option value="">All statuses</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </select>

        <label htmlFor="filterRelevance" className="visually-hidden">
          Filter by relevance
        </label>
        <select id="filterRelevance">
          <option value="">All relevance</option>
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </select>

        <label htmlFor="sortEvidence" className="visually-hidden">
          Sort evidence
        </label>
        <select id="sortEvidence" /*onChange="handleSortChange()"*/>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="title-asc">Title (A&ndash;Z)</option>
          <option value="title-desc">Title (Z&ndash;A)</option>
        </select>

        <button
          type="button"
          id="clearFiltersBtn"
          className="btn btn-secondary"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
