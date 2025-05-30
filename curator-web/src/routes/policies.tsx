import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'

export const Route = createFileRoute('/policies')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MainLayout>Policies</MainLayout>
}
