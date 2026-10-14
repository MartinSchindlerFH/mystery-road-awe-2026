import { navigateTo, type ViewName } from "../../routing/views.js";

type GoToButtonProps = {
  view: ViewName;
  label: string;
};

function GoToButton({ view, label }: GoToButtonProps) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-small"
      onClick={() => navigateTo(view)}
    >
      {label}
    </button>
  );
}

export function IntroCard() {
  return (
    <div className="intro-card">
      <h3>How to use this portal</h3>
      <p>
        Everything gathered on the case so far is organised into four working
        views. Use the navigation bar at the top to move between them at any
        time.
      </p>
      <div className="howto-grid">
        <div className="howto-item">
          <h4>1. Evidence Catalogue</h4>
          <p>
            Search, filter, and sort every evidence item. Open one for full
            details, related people and locations, and to add a private note.
          </p>
          <GoToButton view="evidence" label="Go to Evidence" />
        </div>
        <div className="howto-item">
          <h4>2. People &amp; Locations</h4>
          <p>
            Read profiles and statements from the six team members involved, and
            look up the six key locations in the investigation.
          </p>
          <GoToButton view="people" label="Go to People & Locations" />
        </div>
        <div className="howto-item">
          <h4>3. Timeline</h4>
          <p>
            Walk through events in chronological order, filter by person,
            location, or type, and jump straight to the evidence behind any
            event.
          </p>
          <GoToButton view="timeline" label="Go to Timeline" />
        </div>
        <div className="howto-item">
          <h4>4. Investigator Workspace</h4>
          <p>
            Your bookmarked evidence and notes collect here. Draft a hypothesis:
            who you suspect, why, and how confident you are. It is saved in your
            browser when you click save.
          </p>
          <GoToButton view="workspace" label="Go to Workspace" />
        </div>
      </div>
    </div>
  );
}
