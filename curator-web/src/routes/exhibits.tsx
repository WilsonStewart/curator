import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'

export const Route = createFileRoute('/exhibits')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MainLayout>
        Exhibits
    </MainLayout>
}
