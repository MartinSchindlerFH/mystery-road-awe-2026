import { NavLink } from "react-router";

type NavItemProps = {
  to: string;
  label: string;
};

export function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}
    >
      {label}
    </NavLink>
  );
}
