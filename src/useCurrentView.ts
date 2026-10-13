import { useEffect, useState } from "react";
import { parseView, type ViewName } from "./views.js";

function readView(): ViewName {
  return parseView(window.location.hash);
}

export function useCurrentView(): ViewName {
  const [view, setView] = useState<ViewName>(readView);

  useEffect(() => {
    function handleHashChange(): void {
      setView(readView());
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return view;
}
