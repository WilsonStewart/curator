import { LayoutShell } from '@/components/layout.shell'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <LayoutShell>
        <Outlet />
      </LayoutShell>
      <TanStackRouterDevtools />
    </>
  ),
})
