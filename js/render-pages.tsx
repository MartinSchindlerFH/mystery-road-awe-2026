import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { App } from "./basic-react-component";

export function initialisePages() {
  let container = document.getElementById("app-react");
  if (!container) {
    throw new Error("Missing #root mount point");
  }
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
