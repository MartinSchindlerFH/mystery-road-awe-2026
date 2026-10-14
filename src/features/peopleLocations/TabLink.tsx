import { NavLink } from "react-router";

type TabLinkProps = {
  to: string;
  label: string;
};

export function TabLink({ to, label }: TabLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "tab-btn active" : "tab-btn")}
    >
      {label}
    </NavLink>
  );
}
