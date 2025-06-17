import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exhibits")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Exhibits</h1>
    </div>
  );
}
