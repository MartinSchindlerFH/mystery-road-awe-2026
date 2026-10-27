import { CaseLocation, Person } from "../../../js/types";
import { Dispatch, SetStateAction } from "react";

type EvidenceToolbarProps = {
  types: string[];
  people: Person[];
  locations: CaseLocation[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filterType: string;
  setFilterType: Dispatch<SetStateAction<string>>;
  filterPerson: string;
  setFilterPerson: Dispatch<SetStateAction<string>>;
  filterLocation: string;
  setFilterLocation: Dispatch<SetStateAction<string>>;

  filterStatus: string;
  setFilterStatus: Dispatch<SetStateAction<string>>;
  filterRelevance: string;
  setFilterRelevance: Dispatch<SetStateAction<string>>;
  sortEvidence: string;
  setSortEvidence: Dispatch<SetStateAction<string>>;
};

export function EvidenceToolbar({
  types,
  people,
  locations,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterPerson,
  setFilterPerson,
  filterLocation,
  setFilterLocation,
  filterStatus,
  setFilterStatus,
  filterRelevance,
  setFilterRelevance,
  sortEvidence,
  setSortEvidence,
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
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <label htmlFor="filterType" className="visually-hidden">
          Filter by type
        </label>
        <select
          id="filterType"
          value={filterType}
          onChange={(event) => {
            setFilterType(event.target.value);
          }}
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
          value={filterPerson}
          onChange={(event) => {
            setFilterPerson(event.target.value);
          }}
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
          value={filterLocation}
          onChange={(event) => {
            setFilterLocation(event.target.value);
          }}
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
          value={filterStatus}
          onChange={(event) => {
            setFilterStatus(event.target.value);
          }}
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
          value={filterRelevance}
          onChange={(event) => {
            setFilterRelevance(event.target.value);
          }}
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
          value={sortEvidence}
          onChange={(event) => {
            setSortEvidence(event.target.value);
          }}
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
          onClick={() => {
            setSearchTerm("");
            setFilterType("");
            setFilterPerson("");
            setFilterLocation("");

            setFilterStatus("");
            setFilterRelevance("");
            setSortEvidence("");
          }}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
