import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'

export const Route = createFileRoute('/artifacts')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MainLayout>Artifacts</MainLayout>
}
