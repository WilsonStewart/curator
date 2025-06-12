import type { Icon } from "@phosphor-icons/react"

export const LayoutNavItem = (props: {
    name: string
    icon: Icon
    onclick?: () => Promise<void>
}) => {
    return (
        <div onClick={props.onclick} className="nav-item">
            <div className="nav-item-icon">{<props.icon size={20} />}</div>
            <div className="nav-item-label">{props.name}</div>
        </div>
    )
}