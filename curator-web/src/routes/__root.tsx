import { LayoutShell } from "@/components/layout.shell";
import { isAuthedAtom, stateStore } from "@/lib/state";
import {
  Outlet,
  createRootRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  beforeLoad: (c) => {
    if (c.location.pathname !== "/login") {
      if (!stateStore.get(isAuthedAtom)) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: () => {
    const pathname = useLocation({ select: (loc) => loc.pathname });

    // list any “public” pages that shouldn’t render your shell
    const noShellPages = ["/login"];

    return (
      <>
        {noShellPages.includes(pathname) ? (
          <Outlet />
        ) : (
          <LayoutShell>
            <Outlet />
          </LayoutShell>
        )}
        <TanStackRouterDevtools />
      </>
    );
  },
});
