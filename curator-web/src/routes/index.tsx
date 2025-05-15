import { createFileRoute } from '@tanstack/react-router'
import { OverviewRoute } from '@/routes/overview'

export const Route = createFileRoute('/')({
    component: OverviewRoute,
})