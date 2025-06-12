import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/policies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/policies"!</div>
}
