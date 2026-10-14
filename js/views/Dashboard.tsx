import React, { useContext } from "react";
import { state } from "../core/state";
import { RECENT_ITEM_COUNT, STATUS } from "../core/constants";
import { formatDate, getStatusBadgeClass } from "../utils/format.js";

export function Dashboard() {
  return (
    <section id="view-dashboard" className="view app-main">
      <h2>Case Dashboard</h2>
      <DashboardHowto />
      <DashboardContent />
    </section>
  );
}

function DashboardHowto() {
  return (
    <div className="intro-card">
      <h3>How to use this portal</h3>
      <p>
        Everything gathered on the case so far is organised into four working views. Use the
        navigation bar at the top to move between them at any time.
      </p>
      <div className="howto-grid">
        <div className="howto-item">
          <h4>1. Evidence Catalogue</h4>
          <p>
            Search, filter, and sort every evidence item. Open one for full details, related people
            and locations, and to add a private note.
          </p>
          <button type="button" className="btn btn-secondary btn-small" data-nav="evidence">
            Go to Evidence
          </button>
        </div>
        <div className="howto-item">
          <h4>2. People &amp; Locations</h4>
          <p>
            Read profiles and statements from the six team members involved, and look up the six key
            locations in the investigation.
          </p>
          <button type="button" className="btn btn-secondary btn-small" data-nav="people">
            Go to People &amp; Locations
          </button>
        </div>
        <div className="howto-item">
          <h4>3. Timeline</h4>
          <p>
            Walk through events in chronological order, filter by person, location, or type, and
            jump straight to the evidence behind any event.
          </p>
          <button type="button" className="btn btn-secondary btn-small" data-nav="timeline">
            Go to Timeline
          </button>
        </div>
        <div className="howto-item">
          <h4>4. Investigator Workspace</h4>
          <p>
            Your bookmarked evidence and notes collect here. Draft a hypothesis — who you suspect,
            why, and how confident you are — it's saved automatically in your browser.
          </p>
          <button type="button" className="btn btn-secondary btn-small" data-nav="workspace">
            Go to Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  let reviewedCount = 0;
  for (const ev of state.allEvidence) {
    if ((ev.status || "").toLowerCase() === STATUS.REVIEWED) reviewedCount++;
  }

  const progressPct =
    state.allEvidence.length === 0
      ? 0
      : Math.round((reviewedCount / state.allEvidence.length) * 100);

  return (
    <div>
      <CaseSummaryCard />
      <div className="stat-grid">
        <StatCard value={state.allEvidence.length} label="Evidence" />
        <StatCard value={state.allPeople.length} label="People" />
        <StatCard value={state.allLocations.length} label="Locations" />
        <StatCard value={state.bookmarks.length} label="Bookmarks" />
        <StatCard value={reviewedCount} label="Reviewed" />
      </div>
      <ReviewProgress percent={progressPct} />
      <div className="dashboard-columns">
        <RecentEvidence />
        <RecentEvents />
      </div>
    </div>
  );
}

function CaseSummaryCard() {
  return (
    <div className="case-summary-card">
      <h3>{state.caseData?.title ?? "Case"}</h3>
      <p>
        <span className="badge badge-flagged">
          {(state.caseData?.status ?? "unknown").toUpperCase()}
        </span>
      </p>
      <p>{state.caseData?.summary ?? ""}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ReviewProgress({ percent }: { percent: number }) {
  return (
    <div className="dashboard-panel">
      <h3>Review progress</h3>
      <div className="progress-bar-outer">
        <div className="progress-bar-inner" style={{ width: `${percent}%` }}></div>
      </div>
      <p>{percent}% of evidence reviewed</p>
    </div>
  );
}

function RecentEvidence() {
  const recentEvidence = state.allEvidence.slice(-RECENT_ITEM_COUNT).reverse();
  if (recentEvidence.length === 0) {
    return (
      <div className="dashboard-panel">
        <h3>Recent evidence</h3>
        <p>No evidence loaded yet.</p>
      </div>
    );
  }
  return (
    <div className="dashboard-panel">
      {recentEvidence.map((ev) => (
        <div className="mini-list-item">
          <strong>{ev.id}</strong>
          &mdash;
          {ev.title}
          <span className={`badge ${getStatusBadgeClass(ev.status)}`}>{ev.status}</span>
        </div>
      ))}
    </div>
  );
}

function RecentEvents() {
  const recentTimeline = state.allTimeline.slice(-RECENT_ITEM_COUNT).reverse();
  if (recentTimeline.length === 0) {
    return (
      <div className="dashboard-panel">
        <h3>Recent timeline events</h3>
        <p>No timeline events loaded yet.</p>
      </div>
    );
  }
  return (
    <div className="dashboard-panel">
      {recentTimeline.map((evt) => (
        <div className="mini-list-item">
          <strong>{formatDate(evt.time)}</strong>
          <br/>
          {evt.title}
        </div>
      ))}
    </div>
  );
}
