import { VIEWS, navigateTo, type ViewName } from "../views.js";
import { NavButton } from "./NavButton.jsx";

type AppHeaderProps = {
  currentView: ViewName;
};

export function AppHeader({ currentView }: AppHeaderProps) {
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
            <NavButton
              key={view.id}
              view={view.id}
              label={view.label}
              active={view.id === currentView}
              onSelect={navigateTo}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
