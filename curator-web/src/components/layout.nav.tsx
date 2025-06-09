import { LayoutNavItem } from "@/components/layout.nav.item"
import { BuildingIcon } from "@phosphor-icons/react"

export const LayoutNav = () => {
    return (
        <div className="nav">
            <LayoutNavItem
                icon={BuildingIcon}
                name="Org Configuration"
            />
        </div>
    )
}