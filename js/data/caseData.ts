import type {
  CaseData,
  CaseLocation,
  Evidence,
  Hypothesis,
  Person,
  TimelineEvent,
} from "../types";

export type CaseFile = {
  caseData: CaseData;
  people: Person[];
  locations: CaseLocation[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
};

const STORAGE_KEY_BOOKMARKS = "remotion_bookmarks";
const STORAGE_KEY_NOTES = "remotion_notes";
const STORAGE_KEY_HYPOTHESIS = "remotion_hypothesis";

export async function loadCaseFile(): Promise<CaseFile> {
  const [caseData, people, locations, evidence, timeline] = await Promise.all([
    fetchJson<CaseData>("data/case.json"),
    fetchJson<Person[]>("data/people.json"),
    fetchJson<CaseLocation[]>("data/locations.json"),
    fetchJson<Evidence[]>("data/evidence.json"),
    fetchJson<TimelineEvent[]>("data/timeline.json"),
  ]);
  return { caseData, people, locations, evidence, timeline };
}

export function loadBookmarks(): Set<string> {
  return new Set<string>(
    JSON.parse(<string>localStorage.getItem(STORAGE_KEY_BOOKMARKS)) ?? [],
  );
}

export function saveBookmarks(bookmarks: Set<string>) {
  localStorage.setItem(
    STORAGE_KEY_BOOKMARKS,
    JSON.stringify(bookmarks.values().toArray()),
  );
}

function loadNotes(): Map<string, string> {
  const stored = localStorage.getItem(STORAGE_KEY_NOTES);
  if (stored === null) return new Map();

  const entries: [string, string][] = JSON.parse(stored);
  return new Map(entries);
}

export function loadNoteForEvidence(evidenceId: string): string {
  try {
    const notes = loadNotes();
    return notes.get(evidenceId) ?? "";
  } catch {
    return "";
  }
}

export function saveNoteForEvidence(evidenceId: string, note: string) {
  const notes = loadNotes();
  notes.set(evidenceId, note);
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify([...notes]));
}

export function saveHypothesis(hypothesis: Hypothesis): void {
  localStorage.setItem(STORAGE_KEY_HYPOTHESIS, JSON.stringify(hypothesis));
}

export function loadHypothesis(): Hypothesis {
  return JSON.parse(
    <string>localStorage.getItem(STORAGE_KEY_HYPOTHESIS),
  ) as Hypothesis;
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error("Could not load " + path + " (" + res.status + ")");
  }
  return res.json() as Promise<T>;
}
