import { LayoutContent } from "@/components/layout.content"
import { LayoutTopbar } from "@/components/layout.topbar"
import type { PropsWithChildren } from "react"

export const LayoutShell = (props: PropsWithChildren) => {
    return (
        <div className="layout-shell">
            <LayoutTopbar />
            <div className="layout-main">
                <LayoutContent>{props.children}</LayoutContent>
            </div>
        </div>
    )
}