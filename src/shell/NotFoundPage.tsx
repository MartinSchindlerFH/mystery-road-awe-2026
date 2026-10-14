import { Link } from "react-router";
import { PageSection } from "../components/PageSection.jsx";

export function NotFoundPage() {
  return (
    <PageSection title="Page not found">
      <p>
        There is nothing at this address.{" "}
        <Link to="/">Go to the dashboard</Link>.
      </p>
    </PageSection>
  );
}
