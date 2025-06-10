import { LayoutContent } from "@/components/layout.content"
import { LayoutNav } from "@/components/layout.nav"
import { LayoutTopbar } from "@/components/layout.topbar"
import type { PropsWithChildren } from "react"

export const LayoutShell = (props: PropsWithChildren) => {
    return (
        <div className="layout-shell">
            <div className="layout-shell-upper">
                <LayoutTopbar />
            </div>
            <div className="layout-shell-middle">
                <LayoutNav />
                <LayoutContent>{props.children}</LayoutContent>
            </div>
        </div>
    )
}