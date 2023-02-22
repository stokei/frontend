import { Avatar, Card, CardHeader, Stack, Text, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppAdminFragment } from "../../graphql/admin.fragment.graphql.generated";

export interface AdminItemProps {
  readonly appAdmin?: AppAdminFragment;
}

export const AdminItem: FC<AdminItemProps> = memo(({ appAdmin }) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="row" spacing="5">
          <Avatar
            name={appAdmin?.admin?.fullname}
            src={appAdmin?.admin?.avatar?.file?.url || ""}
          />
          <Stack direction="column" spacing="1">
            <Title size="md">{appAdmin?.admin?.firstname}</Title>
            <Text>{appAdmin?.admin?.email}</Text>
          </Stack>
        </Stack>
      </CardHeader>
    </Card>
  );
});
