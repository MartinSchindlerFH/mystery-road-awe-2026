import { loadBookmarksFromStorage, loadNotesFromStorage } from "./services/storage.js";
import { setupEventListeners } from "./app/events.js";
import { loadAllData } from "./services/data.js";
import { handleHashChange } from "./app/router.js";
import { initReact } from "./app/App";

async function initApp(): Promise<void> {
  loadBookmarksFromStorage();
  loadNotesFromStorage();
  setupEventListeners();

  initReact();

  await loadAllData();
  handleHashChange();
}

void initApp();
