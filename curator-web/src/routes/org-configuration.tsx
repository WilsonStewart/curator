import { LayoutShell } from "@/components/layout.shell";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/org-configuration")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LayoutShell>
      <h1>Org Configuration</h1>
      <div>
        <h2>Musuems</h2>
      </div>
    </LayoutShell>
  );
}
