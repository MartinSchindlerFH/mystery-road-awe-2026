import type { CaseFile } from "../caseData.js";
import { CaseSummaryCard } from "../components/CaseSummaryCard.jsx";
import { IntroCard } from "../components/IntroCard.jsx";
import { PageSection } from "../components/PageSection.jsx";
import { RecentEvidenceList } from "../components/RecentEvidenceList.jsx";
import { RecentTimelineList } from "../components/RecentTimelineList.jsx";
import { ReviewProgress } from "../components/ReviewProgress.jsx";
import { StatCard } from "../components/StatCard.jsx";

type DashboardPageProps = {
  file: CaseFile;
  bookmarks: string[];
};

export function DashboardPage({ file, bookmarks }: DashboardPageProps) {
  const reviewedCount = file.evidence.filter(
    (ev) => ev.status.toLowerCase() === "reviewed",
  ).length;
  const recentEvidence = file.evidence.slice(-5).reverse();
  const recentTimeline = file.timeline.slice(-5).reverse();

  return (
    <PageSection title="Case Dashboard">
      <IntroCard />
      <CaseSummaryCard caseData={file.caseData} />
      <div className="stat-grid">
        <StatCard value={file.evidence.length} label="Evidence items" />
        <StatCard value={file.people.length} label="People" />
        <StatCard value={file.locations.length} label="Locations" />
        <StatCard value={bookmarks.length} label="Bookmarked" />
        <StatCard value={reviewedCount} label="Reviewed" />
      </div>
      <ReviewProgress reviewed={reviewedCount} total={file.evidence.length} />
      <div className="dashboard-columns">
        <RecentEvidenceList evidence={recentEvidence} />
        <RecentTimelineList events={recentTimeline} />
      </div>
    </PageSection>
  );
}
