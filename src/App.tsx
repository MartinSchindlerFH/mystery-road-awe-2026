import { Navigate, Route, Routes } from "react-router";
import { useCaseFile, type CaseFileState } from "../js/data/useCaseFile.js";
import { DashboardPage } from "./features/dashboard/DashboardPage.jsx";
import { EvidencePage } from "./features/evidence/EvidencePage.jsx";
import { PeoplePage } from "./features/peopleLocations/PeoplePage.jsx";
import { PersonDetailPage } from "./features/peopleLocations/PersonDetailPage.jsx";
import { TimelinePage } from "./features/timeline/TimelinePage.jsx";
import { WorkspacePage } from "./features/workspace/WorkspacePage.jsx";
import { AppFooter } from "./shell/AppFooter.jsx";
import { AppHeader } from "./shell/AppHeader.jsx";
import { LoadingOverlay } from "./shell/LoadingOverlay.jsx";
import { NotFoundPage } from "./shell/NotFoundPage.jsx";
import { readStoredBookmarks } from "../js/data/caseData";

type PagesProps = {
  caseFile: CaseFileState;
};

function Pages({ caseFile }: PagesProps) {
  if (caseFile.status === "loading") return null;
  if (caseFile.status === "error") {
    return <div className="warning-banner">{caseFile.message}</div>;
  }
  const { file, bookmarks } = caseFile;

  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage file={file} bookmarks={bookmarks} />}
      />
      <Route
        path="/evidence"
        element={<EvidencePage file={file} bookmarks={readStoredBookmarks()} />}
      />
      <Route path="/team" element={<Navigate to="/team/people" replace />} />
      <Route
        path="/team/people"
        element={<PeoplePage file={file} tab="people" />}
      />

      <Route
        path="/team/people/:personId"
        element={<PersonDetailPage file={file} />}
      />

      <Route
        path="/team/locations"
        element={<PeoplePage file={file} tab="locations" />}
      />
      <Route path="/timeline" element={<TimelinePage file={file} />} />
      <Route path="/workspace" element={<WorkspacePage file={file} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  const caseFile = useCaseFile();

  return (
    <>
      <LoadingOverlay visible={caseFile.status === "loading"} />
      <AppHeader />
      <main className="app-main">
        <Pages caseFile={caseFile} />
      </main>
      <AppFooter />
    </>
  );
}
