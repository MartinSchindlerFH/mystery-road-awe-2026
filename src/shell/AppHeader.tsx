import { NavItem } from "./NavItem.jsx";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <img
            src="assets/logo/logo.svg"
            alt="Project ReMotion logo"
            className="brand-logo"
          />
          <div>
            <h1>Project ReMotion</h1>
            <p className="subtitle">
              Investigate the failure of an AI-assisted rehabilitation robot.
            </p>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          {VIEWS.map((view) => (
            <NavItem key={view.path} to={view.path} label={view.label} />
          ))}
        </nav>
      </div>
    </header>
  );
}

type ViewInfo = {
  path: string;
  label: string;
};

const VIEWS: ViewInfo[] = [
  { path: "/", label: "Dashboard" },
  { path: "/evidence", label: "Evidence" },
  { path: "/team", label: "People & Locations" },
  { path: "/timeline", label: "Timeline" },
  { path: "/workspace", label: "Workspace" },
];
