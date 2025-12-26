import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/automations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/automations"!</div>
}
