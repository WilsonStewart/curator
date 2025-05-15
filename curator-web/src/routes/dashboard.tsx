import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { IconSitemap } from "@tabler/icons-react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure(true);
  const pinned = useHeadroom({ fixedAt: 120 }); // Adjust fixedAt as needed

  return (
    <AppShell
      header={{
        height: { sm: 0 }, // 60px on mobile, 0px on desktop
        // collapsed: { base: !pinned, sm: true }, // Collapse on scroll down in mobile, always collapsed on desktop
        offset: false,
      }}
      navbar={{
        width: { base: "80%", sm: desktopCollapsed ? 60 : 190 }, // 80% on mobile, toggle between 80px and 300px on desktop
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: false },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div>
          <Burger
            opened={!desktopCollapsed}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            mb="md"
          />
          <h1>curator</h1>
        </div>
        <NavLink
          label={desktopCollapsed ? null : "Home"}
          leftSection={<IconSitemap size="1.2rem" />}
          rightSection="Nav1"
        />
        <NavLink
          label={desktopCollapsed ? null : "Profile"}
          leftSection={<IconSitemap size="1.2rem" />}
          rightSection="Nav2"
        />
        {/* Add more NavLinks as needed */}
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="mainDiv"></div>
      </AppShell.Main>
    </AppShell>
  );
}
