import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { Navbar } from "../ui/Navbar";
import { Dashboard } from "../views/Dashboard";

export function initReact() {
  let container = document.getElementById("app-react");
  if (!container) {
    throw new Error("Missing #root mount point");
  }
  createRoot(container).render(
    <StrictMode>
      <Navbar />
      <Dashboard />
    </StrictMode>
  );
}
