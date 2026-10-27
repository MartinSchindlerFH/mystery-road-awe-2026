import type {
  CaseData,
  CaseLocation,
  Evidence,
  Person,
  TimelineEvent,
} from "../../js/types";

export type CaseFile = {
  caseData: CaseData;
  people: Person[];
  locations: CaseLocation[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
};

const STORAGE_KEY_BOOKMARKS = "remotion_bookmarks";
const STORAGE_KEY_NOTES = "remotion_notes";
export const STORAGE_KEY_HYPOTHESIS = "remotion_hypothesis";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error("Could not load " + path + " (" + res.status + ")");
  }
  return res.json() as Promise<T>;
}

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

export function readStoredBookmarks(): string[] {
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

export function loadNoteForEvidence(evidenceId: string): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    const parsed: Record<string, string> = raw ? JSON.parse(raw) : [];
    return parsed[evidenceId];
  } catch {
    return "";
  }
}
