import React from "react";

export function Navbar() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <img src="assets/logo/logo.svg" alt="Project ReMotion logo" className="brand-logo" />
          <div>
            <h1>Project ReMotion</h1>
            <p className="subtitle">
              Investigate the failure of an AI-assisted rehabilitation robot.
            </p>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#dashboard">
            <button type="button" className="nav-btn" data-view="dashboard">
              Dashboard
            </button>
          </a>
          <a href="#evidence">
            <button type="button" className="nav-btn" data-view="evidence">
              Evidence
            </button>
          </a>
          <a href="#people">
            <button type="button" className="nav-btn" data-view="people">
              People &amp; Locations
            </button>
          </a>
          <a href="#timeline">
            <button type="button" className="nav-btn" data-view="timeline">
              Timeline
            </button>
          </a>
          <a href="#workspace">
            <button type="button" className="nav-btn" data-view="workspace">
              Workspace
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
}
