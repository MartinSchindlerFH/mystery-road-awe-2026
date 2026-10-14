import { AppFooter } from "./shell/AppFooter.jsx";
import { AppHeader } from "./shell/AppHeader.jsx";
import { LoadingOverlay } from "./shell/LoadingOverlay.jsx";
import { DashboardPage } from "./features/dashboard/DashboardPage.jsx";
import { EvidencePage } from "./features/evidence/EvidencePage.jsx";
import { PeoplePage } from "./features/peopleLocations/PeoplePage.jsx";
import { TimelinePage } from "./features/timeline/TimelinePage.jsx";
import { WorkspacePage } from "./features/workspace/WorkspacePage.jsx";
import { useCaseFile, type CaseFileState } from "./data/useCaseFile.js";
import { useCurrentView } from "./routing/useCurrentView.js";
import type { ViewName } from "./routing/views.js";

type PageProps = {
  view: ViewName;
  caseFile: CaseFileState;
};

function Page({ view, caseFile }: PageProps) {
  if (caseFile.status === "loading") return null;
  if (caseFile.status === "error") {
    return <div className="warning-banner">{caseFile.message}</div>;
  }

  switch (view) {
    case "dashboard":
      return (
        <DashboardPage file={caseFile.file} bookmarks={caseFile.bookmarks} />
      );
    case "evidence":
      return <EvidencePage />;
    case "people":
      return <PeoplePage file={caseFile.file} />;
    case "timeline":
      return <TimelinePage file={caseFile.file} />;
    case "workspace":
      return <WorkspacePage />;
  }
}

export function App() {
  const view = useCurrentView();
  const caseFile = useCaseFile();

  return (
    <>
      <LoadingOverlay visible={caseFile.status === "loading"} />
      <AppHeader currentView={view} />
      <main className="app-main">
        <Page view={view} caseFile={caseFile} />
      </main>
      <AppFooter />
    </>
  );
}
