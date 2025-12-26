import { LayoutNavItem } from "@/components/layout.nav.item";
import {
  PresentationIcon,
  RobotIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";

export const LayoutNav = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <LayoutNavItem
        icon={PresentationIcon}
        name="Exhibits"
        onclick={async () => {
          navigate({ to: "/exhibits" });
        }}
      />
      <LayoutNavItem
        icon={RobotIcon}
        name="Automations"
        onclick={async () => {
          navigate({ to: "/automations" });
        }}
      />
      <LayoutNavItem
        icon={ScrollIcon}
        name="Policies"
        onclick={async () => {
          navigate({ to: "/policies" });
        }}
      />
    </div>
  );
};
