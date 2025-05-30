import { Box, Divider, NavLink, Paper, Text } from "@mantine/core";
import {
  GearIcon,
  BankIcon,
  RobotIcon,
  ScrollIcon,
  PresentationIcon,
  BoneIcon,
  HardDrivesIcon,
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
        flexDirection: "column"
      }}
    >
      <Box className="topbar" bg="grape.9">
        <Box
          style={{
            display: "flex",
          }}>
          {/* <Burger color="white"></Burger> */}
          <Text style={{
            fontFamily: "Manrope",
            fontSize: 20,
            fontWeight: 400
          }} size="xl">Curator</Text>
        </Box>
        {/* <input placeholder="Search exhibits, artifacts, etc..." className="search-bar">
        </input> */}
        <Box>
        </Box>
      </Box>
      <Box style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        flexDirection: "row"
      }}>
        <Box className="sidebar shadow-xs" bg="gray.0">
          <NavLink
            leftSection={<BankIcon size={15} />}
            label={"Dashboard"}
            active={true}
            href="/dashboard"
          />
          <NavLink
            leftSection={<PresentationIcon size={15} />}
            label={"Exhibits"}
            active={false}
            href="/exhibits"
          />
          <NavLink
            leftSection={<BoneIcon size={15} />}
            label={"Artifacts"}
            active={false}
            href="/artifacts"
          />
          <NavLink
            leftSection={<HardDrivesIcon size={15} />}
            label={"Repositories"}
            active={false}
            href="/repositories"
          />
          <Divider my="sm" />
          <NavLink
            leftSection={<RobotIcon size={15} />}
            label={"Automations"}
            active={false}
            href="/automations"
          />
          <NavLink
            leftSection={<ScrollIcon size={15} />}
            label={"Policies"}
            active={false}
            href="/policies"
          />
          <Divider my="sm" />
          <NavLink
            //
            leftSection={<GearIcon size={15} />}
            label={"Settings"}
            active={false}
          >
            <NavLink leftSection={<PulseIcon size={15} />} label={"Status"} active={true} href="/settings/status" />
          </NavLink>
        </Box>
        <Box className="main-content">
          {props.children}
        </Box>
      </Box>
    </Box >
  );
}
