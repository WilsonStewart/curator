import { LayoutContent } from "@/components/layout.content"
import { LayoutNav } from "@/components/layout.nav"
import { LayoutTopbar } from "@/components/layout.topbar"
import type { PropsWithChildren } from "react"

export const LayoutShell = (props: PropsWithChildren) => {
    return (
        <div className="layout-shell">
            <LayoutTopbar />
            <div className="layout-main">
                {/* <LayoutNav /> */}
                <LayoutContent>{props.children}</LayoutContent>
            </div>
        </div>
    )
}