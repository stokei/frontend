import { Avatar, Card, CardHeader, Stack, Text, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppMemberFragment } from "../../graphql/member.fragment.graphql.generated";

export interface MemberItemProps {
  readonly appMember?: AppMemberFragment;
}

export const MemberItem: FC<MemberItemProps> = memo(({ appMember }) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="row" spacing="5">
          <Avatar
            name={appMember?.fullname}
            src={appMember?.avatar?.file?.url || ""}
          />
          <Stack width="auto" flex="1" direction="column" spacing="1">
            <Title size="md">{appMember?.firstname}</Title>
            <Text>{appMember?.email}</Text>
          </Stack>
        </Stack>
      </CardHeader>
    </Card>
  );
});
