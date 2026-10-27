import type {
  CaseData,
  CaseLocation,
  Evidence,
  Hypothesis,
  Person,
  PersonId,
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

export function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks: string[]) {
  localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function loadNoteForEvidence(evidenceId: string): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    const parsed: Map<string, string> = raw
      ? JSON.parse(raw)
      : new Map<string, string>();
    return parsed.get(evidenceId) ?? "";
  } catch {
    return "";
  }
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
