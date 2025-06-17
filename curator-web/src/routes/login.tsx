import { LoginForm } from '@/components/login-form'
import { Overlay } from '@/components/overlay'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Overlay><LoginForm></LoginForm></Overlay>
}
