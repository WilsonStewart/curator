import { LayoutShell } from "@/components/layout.shell";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => {
    const pathname = useLocation({ select: (loc) => loc.pathname });

    // list any “public” pages that shouldn’t render your shell
    const noShellPages = ["/login"];

    return (
      <>
        {noShellPages.includes(pathname) ? (
          <div className="container-noshell">
            <Outlet />
          </div>
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
