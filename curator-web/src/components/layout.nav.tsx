import { LayoutNavItem } from "@/components/layout.nav.item"
import { BoneIcon, BuildingIcon, PaperclipIcon, RobotIcon, ScrollIcon } from "@phosphor-icons/react"
import { useNavigate } from '@tanstack/react-router';

export const LayoutNav = () => {
    const navigate = useNavigate();
    return (
        <div className="nav">
            <LayoutNavItem
                icon={BoneIcon}
                name="Exhibits"
            />
            <LayoutNavItem
                icon={RobotIcon}
                name="Automations"
            />
            <LayoutNavItem
                icon={ScrollIcon}
                name="Policies"
            />
            <LayoutNavItem
                icon={BuildingIcon}
                name="Org Configuration"
            />
        </div>
    )
}