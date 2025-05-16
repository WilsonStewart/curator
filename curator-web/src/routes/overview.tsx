import { MainLayout } from '@/components/main.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/overview')({
    component: OverviewRoute,
})

export function OverviewRoute() {
    return <MainLayout>
        <div>OVERVIEW</div>
    </MainLayout>
}
