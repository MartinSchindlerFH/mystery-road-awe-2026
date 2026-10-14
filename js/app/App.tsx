import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { Navbar } from "../ui/navbar";

export function initReact() {
  let container = document.getElementById("app-react");
  if (!container) {
    throw new Error("Missing #root mount point");
  }
  createRoot(container).render(
    <StrictMode>
      <Navbar />
    </StrictMode>
  );
}
