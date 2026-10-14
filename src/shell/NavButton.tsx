import type { ViewName } from "../routing/views.js";

type NavButtonProps = {
  view: ViewName;
  label: string;
  active: boolean;
  onSelect: (view: ViewName) => void;
};

export function NavButton({ view, label, active, onSelect }: NavButtonProps) {
  return (
    <button
      type="button"
      className={active ? "nav-btn active" : "nav-btn"}
      aria-current={active ? "page" : undefined}
      onClick={() => onSelect(view)}
    >
      {label}
    </button>
  );
}
