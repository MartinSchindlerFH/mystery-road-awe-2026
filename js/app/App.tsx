import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { Navbar } from "../ui/Navbar";
import { Dashboard } from "../views/Dashboard";
import { loadAllData } from "../services/data";

export async function initReact() {
  let container = document.getElementById("app-react");
  if (!container) {
    throw new Error("Missing #root mount point");
  }

  await loadAllData();

  createRoot(container).render(
    <StrictMode>
      <Navbar />
      <Dashboard />
    </StrictMode>
  );
}
