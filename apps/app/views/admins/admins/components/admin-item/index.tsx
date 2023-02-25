import { Avatar, Card, CardHeader, Stack, Text, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { AppAdminFragment } from "../../graphql/admin.fragment.graphql.generated";

export interface AdminItemProps {
  readonly appAdmin?: AppAdminFragment;
}

export const AdminItem: FC<AdminItemProps> = memo(({ appAdmin }) => {
  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="column" spacing="5" align="center" justify="center">
          <Avatar
            size="lg"
            name={appAdmin?.admin?.fullname}
            src={appAdmin?.admin?.avatar?.file?.url || ""}
          />
          <Stack direction="column" spacing="1">
            <Title size="md" textAlign="center">
              {appAdmin?.admin?.fullname}
            </Title>
            <Text justifyContent="center">{appAdmin?.admin?.email}</Text>
          </Stack>
        </Stack>
      </CardHeader>
    </Card>
  );
});
