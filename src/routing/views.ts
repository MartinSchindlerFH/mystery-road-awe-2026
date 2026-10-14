export type ViewInfo = {
  path: string;
  label: string;
};

export const VIEWS: ViewInfo[] = [
  { path: "/", label: "Dashboard" },
  { path: "/evidence", label: "Evidence" },
  { path: "/team", label: "People & Locations" },
  { path: "/timeline", label: "Timeline" },
  { path: "/workspace", label: "Workspace" },
];
