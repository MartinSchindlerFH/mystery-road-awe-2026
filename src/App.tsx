import { AppFooter } from "./components/AppFooter.jsx";
import { AppHeader } from "./components/AppHeader.jsx";
import { LoadingOverlay } from "./components/LoadingOverlay.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { EvidencePage } from "./pages/EvidencePage.jsx";
import { PeoplePage } from "./pages/PeoplePage.jsx";
import { TimelinePage } from "./pages/TimelinePage.jsx";
import { WorkspacePage } from "./pages/WorkspacePage.jsx";
import { useCaseFile, type CaseFileState } from "./useCaseFile.js";
import { useCurrentView } from "./useCurrentView.js";
import type { ViewName } from "./views.js";

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
      return <PeoplePage />;
    case "timeline":
      return <TimelinePage />;
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
