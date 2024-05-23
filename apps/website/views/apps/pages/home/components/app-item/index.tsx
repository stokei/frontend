import { useTranslations } from "@/hooks";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Stack,
  Title
} from "@stokei/ui";
import { useMemo } from "react";

import { AppStatus } from "@/services/graphql/stokei";
import { getAppStatusColor } from "@/utils";
import { websiteRoutes } from "@stokei/routes";
import { AdminAppPageAppFragment } from "../../graphql/apps.query.graphql.generated";

export interface AppItemProps {
  readonly app: AdminAppPageAppFragment;
}

export const AppItem = ({ app }: AppItemProps) => {
  const translate = useTranslations();

  const appStatus = useMemo(() => {
    const labels = {
      [AppStatus.Active]: translate.formatMessage({ id: "active" }),
      [AppStatus.Inactive]: translate.formatMessage({ id: "inactive" }),
      [AppStatus.Blocked]: translate.formatMessage({ id: "blocked" }),
    };
    return {
      label: labels[app?.status || AppStatus.Active],
      colorScheme: getAppStatusColor(app?.status),
    };
  }, [app?.status, translate]);

  const goToEditAppURL = () =>
    window?.location?.assign(websiteRoutes.app({ appId: app?.id }).home);

  return (
    <Card
      background="background.50"
      overflow="hidden"
      onClick={goToEditAppURL}
      _hover={{
        boxShadow: "base",
        cursor: "pointer",
      }}
    >
      <CardBody>
        <Stack direction="row" spacing="5" align="center">
          <Avatar size="lg" name={app?.name} src={app?.logo?.file?.url || ""} />
          <Stack direction="column" spacing="1">
            <Title size="sm">{app?.name}</Title>
            <Box>
              <Badge
                size="sm"
                colorScheme={appStatus.colorScheme}
                variant="subtle"
              >
                {appStatus.label}
              </Badge>
            </Box>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
