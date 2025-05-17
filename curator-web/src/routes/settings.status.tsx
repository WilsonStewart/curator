import { MainLayout } from "@/components/main.layout";
import {
  Box,
  Card,
  Title,
  Text,
  Group,
  Flex,
  Pill,
  Table,
  Divider,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import { DotOutlineIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/status")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Flex
        mih={50}
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
        rowGap={"xs"}
      >
        <Title>Status</Title>
        <Grid columns={24}>
          <Grid.Col span={"content"}>
            <Text>Backend status:</Text>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Pill c={"white"} color={"white"} bg={"red.7"}>
              Offline
            </Pill>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Text>Database status:</Text>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Pill c={"white"} bg={"green.7"}>
              Online
            </Pill>
          </Grid.Col>
        </Grid>
      </Flex>
    </MainLayout>
  );
}
