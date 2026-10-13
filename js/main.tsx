import { loadBookmarksFromStorage, loadNotesFromStorage } from "./services/storage.js";
import { setupEventListeners } from "./app/events.js";
import { loadAllData } from "./services/data.js";
import { handleHashChange } from "./app/router.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./basic-react-component";
const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing #root mount point");
}
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);

async function initApp(): Promise<void> {
  loadBookmarksFromStorage();
  loadNotesFromStorage();
  setupEventListeners();

  await loadAllData();
  handleHashChange();
}

void initApp();
