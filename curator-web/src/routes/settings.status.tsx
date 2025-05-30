import { MainLayout } from "@/components/main.layout";
import { Box, Title, Text, Flex, Pill, Table, Loader } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/settings/status")({
  component: RouteComponent,
});

function RouteComponent() {
  const [serverVersion, setServerVersion] = useState(false);
  const [serverVersionIsQueried, setServerVersionIsQueried] = useState(false);
  const [backendStatus, setBackendStatus] = useState(false);
  const [backendStatusIsQueried, setBackendStatusIsQueried] = useState(false);

  useEffect(() => { }, []);

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

        <Box className="box-status-list">
          <Table>
            <Table.Tbody>
              <tr>
                <td>
                  <Text>Backend status:</Text>
                </td>
                {backendStatusIsQueried ? (
                  backendStatus ? (
                    <Pill c={"white"} bg={"green.7"}>
                      Online
                    </Pill>
                  ) : (
                    <Pill c={"white"} bg={"red.7"}>
                      Offline
                    </Pill>
                  )
                ) : (
                  <Loader color="grape" size="md" type="dots" />
                )}
              </tr>
              <tr>
                <td>
                  <Text>Server version:</Text>
                </td>
                <td>
                  {serverVersionIsQueried ? (
                    serverVersion ? (
                      <Text>{serverVersion}</Text>
                    ) : (
                      <Text c={"red.7"}>
                        Query failed! Is the backend down?
                      </Text>
                    )
                  ) : (
                    <Loader color="grape" size="md" type="dots" />
                  )}
                </td>
              </tr>
            </Table.Tbody>
          </Table>
        </Box>
      </Flex>
    </MainLayout>
  );
}
