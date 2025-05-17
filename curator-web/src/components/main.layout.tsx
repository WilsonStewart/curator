import { Box, Divider, NavLink, Paper } from "@mantine/core";
import {
  GearIcon,
  BankIcon,
  RobotIcon,
  ScrollIcon,
  PresentationIcon,
  BoneIcon,
  HardDrivesIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";

export function MainLayout(props: PropsWithChildren) {
  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f6f8fa",
      }}
    >
      <Box style={{ padding: ".5em 0 0 .5em" }}>
        <Box>
          <Box
            component="a"
            href="/"
            style={{ fontFamily: "Manrope", fontSize: 30, fontWeight: 800 }}
          >
            Curator
          </Box>
        </Box>
        <NavLink
          color="grape"
          leftSection={<BankIcon />}
          label={"Overview"}
          active={true}
        />
        <NavLink
          color="grape"
          leftSection={<PresentationIcon />}
          label={"Exhibits"}
          active={false}
        />
        <NavLink
          color="grape"
          leftSection={<BoneIcon />}
          label={"Artifacts"}
          active={false}
        />
        <NavLink
          color="grape"
          leftSection={<HardDrivesIcon />}
          label={"Repositories"}
          active={false}
        />
        <Divider my="sm" />
        <NavLink
          color="grape"
          leftSection={<RobotIcon />}
          label={"Automation"}
          active={false}
        />
        <NavLink
          color="grape"
          leftSection={<ScrollIcon />}
          label={"Policies"}
          active={false}
        />
        <Divider my="sm" />
        <NavLink
          color="grape"
          leftSection={<GearIcon />}
          label={"Settings"}
          active={false}
        >
          <NavLink
            color="grape"
            leftSection={<UsersIcon />}
            label={"Users"}
            active={false}
          />
        </NavLink>
      </Box>
      <Paper radius={10} className="main" shadow="xl">
        {props.children}
      </Paper>
    </Box>
  );
}
