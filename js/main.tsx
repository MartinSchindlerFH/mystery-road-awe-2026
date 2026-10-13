import { loadBookmarksFromStorage, loadNotesFromStorage } from "./services/storage.js";
import { setupEventListeners } from "./app/events.js";
import { loadAllData } from "./services/data.js";
import { handleHashChange } from "./app/router.js";
import { initialisePages } from "./render-pages";

async function initApp(): Promise<void> {
  loadBookmarksFromStorage();
  loadNotesFromStorage();
  setupEventListeners();

  initialisePages();

  await loadAllData();
  handleHashChange();
}

void initApp();
