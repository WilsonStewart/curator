import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'

export const Route = createFileRoute('/repositories')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MainLayout>Repositories</MainLayout>
}
