import { useEffect, useState } from "react";
import {
  loadCaseFile,
  readStoredBookmarks,
  type CaseFile,
} from "./caseData.js";

export type CaseFileState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; file: CaseFile; bookmarks: string[] };

export function useCaseFile(): CaseFileState {
  const [state, setState] = useState<CaseFileState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadCaseFile()
      .then((file) => {
        if (cancelled) return;
        setState({ status: "ready", file, bookmarks: readStoredBookmarks() });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Could not load the case file.";
        setState({ status: "error", message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
