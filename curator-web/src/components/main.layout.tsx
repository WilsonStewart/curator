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
  PulseIcon,
} from "@phosphor-icons/react";
import type { PropsWithChildren } from "react";

export function MainLayout(props: PropsWithChildren) {
  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box style={{ padding: ".5em 0 0 .5em" }}>
        <Box>
          <Box
            component="a"
            href="/"
            style={{ fontFamily: "Manrope", fontSize: 30, fontWeight: 400 }}
          >
            Curator
          </Box>
        </Box>
        {/* <NavLink
          
          leftSection={<BankIcon />}
          label={"Overview"}
          active={true}
        />
        <NavLink
          
          leftSection={<PresentationIcon />}
          label={"Exhibits"}
          active={false}
        />
        <NavLink
          
          leftSection={<BoneIcon />}
          label={"Artifacts"}
          active={false}
        />
        <NavLink
          
          leftSection={<HardDrivesIcon />}
          label={"Repositories"}
          active={false}
        />
        <Divider my="sm" />
        <NavLink
          
          leftSection={<RobotIcon />}
          label={"Automation"}
          active={false}
        />
        <NavLink
          
          leftSection={<ScrollIcon />}
          label={"Policies"}
          active={false}
        />
        <Divider my="sm" /> */}
        <NavLink
          //
          leftSection={<GearIcon />}
          label={"Settings"}
          active={false}
        >
          {/* <NavLink
            leftSection={<UsersIcon />}
            label={"Users"}
            active={false}
          /> */}
          <NavLink leftSection={<PulseIcon />} label={"Status"} active={true} />
        </NavLink>
      </Box>
      <Paper radius={10} className="main" shadow="xl">
        {props.children}
      </Paper>
    </Box>
  );
}
