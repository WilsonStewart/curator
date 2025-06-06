import { LayoutShell } from '@/components/layout.shell'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LayoutShell />
}
