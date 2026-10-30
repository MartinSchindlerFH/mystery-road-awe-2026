import { NavLink } from "react-router";

type TabLinkProps = {
  to: string;
  label: string;
};

export function TabLink({ to, label }: TabLinkProps) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          type="button"
          id={`tab${label}Btn`}
          className={`tab-btn ${isActive ? "active" : ""}`}
        >
          {label}
        </button>
      )}
    </NavLink>
  );
}
