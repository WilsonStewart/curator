import { MainLayout } from '@/components/main.layout'
import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org-configuration')({
    component: RouteComponent,
})

function RouteComponent() {
    return <MainLayout>
        <Title>Museums</Title>
    </MainLayout>
}
