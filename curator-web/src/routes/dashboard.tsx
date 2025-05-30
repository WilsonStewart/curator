import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})

export function RouteComponent() {
    return <MainLayout>
        <div>Dashboard</div>
    </MainLayout>
}
