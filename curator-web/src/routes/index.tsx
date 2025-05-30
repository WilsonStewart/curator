import { createFileRoute } from '@tanstack/react-router'
import { RouteComponent } from '@/routes/dashboard'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})