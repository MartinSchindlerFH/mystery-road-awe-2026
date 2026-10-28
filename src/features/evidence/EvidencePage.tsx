import { EvidenceToolbar } from "./EvidenceToolbar";
import { PageSection } from "../../components/PageSection";
import { CaseFile } from "../../../js/data/caseData";
import { EvidenceCard } from "./EvidenceCard";
import type { Evidence } from "../../../js/types";
import { evidenceMentionsPerson } from "../../../js/utils";
import { useState } from "react";
import { EvidenceDetail } from "./EvidenceDetail";
import { useSearchParams } from "react-router";

type EvidencePageProps = {
  file: CaseFile;
  bookmarks: string[];
  onToggleBookmark: (evidenceId: string) => void;
};

export function EvidencePage({
  file,
  bookmarks,
  onToggleBookmark,
}: EvidencePageProps) {
  const [searchParams] = useSearchParams();
  const paramEvidenceId = searchParams.get("evidence") ?? "";

  const [selectedEvidence, setSelectedEvidence] = useState<
    Evidence | undefined
  >(
    paramEvidenceId === ""
      ? undefined
      : file.evidence.filter((ev) => ev.id === paramEvidenceId).at(0),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPerson, setFilterPerson] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterRelevance, setFilterRelevance] = useState("");
  const [sortEvidence, setSortEvidence] = useState("");

  return (
    <PageSection title="Evidence Catalogue">
      <EvidenceToolbar
        // Convert to Set to de-duplicate the list of types (because JavaScript lacks a .distinct())
        types={[...new Set(file.evidence.map((evidence) => evidence.type))]}
        people={file.people}
        locations={file.locations}

        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterPerson={filterPerson}
        setFilterPerson={setFilterPerson}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}

        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterRelevance={filterRelevance}
        setFilterRelevance={setFilterRelevance}
        sortEvidence={sortEvidence}
        setSortEvidence={setSortEvidence}
      />

      <div id="evidenceListContainer">
        <div id="evidenceLoadingIndicator" className="evidence-loading hidden">
          <div className="spinner"></div>
          <p>Loading evidence&hellip;</p>
        </div>
        <div id="evidenceList" className="evidence-grid">
          {file.evidence.length === 0 ? (
            <p>No evidence matches the current filters.</p>
          ) : (
            filterEvidence(
              file.evidence,
              searchTerm,
              filterType,
              filterPerson,
              filterLocation,
              filterStatus,
              filterRelevance,
              sortEvidence,
              file,
            ).map((evidence) => (
              <EvidenceCard
                evidence={evidence}
                isBookmarked={bookmarks.indexOf(evidence.id) !== -1}
                handleToggleBookmark={() => onToggleBookmark(evidence.id)}
                handleShowEvidenceDetailView={() =>
                  setSelectedEvidence(evidence)
                }
                key={evidence.id}
              />
            ))
          )}
        </div>
      </div>

      {selectedEvidence === undefined ? (
        ""
      ) : (
        <div id="evidenceDetailSection" className="evidence-detail">
          <EvidenceDetail
            evidence={selectedEvidence}
            people={file.people}
            locations={file.locations}
          />
        </div>
      )}
    </PageSection>
  );
}

function filterEvidence(
  allEvidence: Evidence[],
  searchTerm: string,
  typeVal: string,
  personVal: string,
  locationVal: string,
  statusVal: string,
  relevanceVal: string,
  sortVal: string,
  caseFile: CaseFile,
): Evidence[] {
  const results = [];
  for (let i = 0; i < allEvidence.length; i++) {
    const item = allEvidence[i];
    let matches = true;

    if (searchTerm) {
      const haystack = (
        item.title +
        " " +
        item.summary +
        " " +
        item.tags.join(" ")
      ).toLowerCase();
      if (haystack.indexOf(searchTerm) === -1) matches = false;
    }
    if (matches && typeVal && item.type.toLowerCase() !== typeVal)
      matches = false;
    if (matches && personVal) {
      const person = caseFile.people.filter(
        (person) => person.id == personVal,
      )[0];
      if (!person || !evidenceMentionsPerson(item, person)) matches = false;
    }
    if (matches && locationVal && item.locationIds.indexOf(locationVal) === -1)
      matches = false;
    if (matches && statusVal && (item.status || "").toLowerCase() !== statusVal)
      matches = false;
    if (
      matches &&
      relevanceVal &&
      (item.relevance || "").toLowerCase() !== relevanceVal
    )
      matches = false;

    if (matches) results.push(item);
  }

  return sortEvidence(results, sortVal);
}

function sortEvidence(list: Evidence[], sortValue: string): Evidence[] {
  if (sortValue === "title-asc") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "title-desc") {
    list.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === "date-asc") {
    list.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
  } else {
    list.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }
  return list;
}
