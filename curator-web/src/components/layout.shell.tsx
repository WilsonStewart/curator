import { LayoutNav } from "@/components/layout.nav"
import { LayoutTopbar } from "@/components/layout.topbar"

export const LayoutShell = () => {
    return (
        <div className="layout-shell">
            <div className="layout-shell-upper">
                <LayoutTopbar />
            </div>
            <div className="layout-shell-middle">
                <LayoutNav />
            </div>
        </div>
    )
}