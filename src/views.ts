export type ViewName =
  "dashboard" | "evidence" | "people" | "timeline" | "workspace";

export type ViewInfo = {
  id: ViewName;
  label: string;
};

export const VIEWS: ViewInfo[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "evidence", label: "Evidence" },
  { id: "people", label: "People & Locations" },
  { id: "timeline", label: "Timeline" },
  { id: "workspace", label: "Workspace" },
];

export function parseView(hash: string): ViewName {
  const name = hash.replace("#", "");
  const match = VIEWS.find((view) => view.id === name);
  return match ? match.id : "dashboard";
}

export function navigateTo(view: ViewName): void {
  window.location.hash = view;
}
