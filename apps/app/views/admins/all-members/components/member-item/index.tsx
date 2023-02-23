import {
  Avatar,
  Card,
  CardHeader,
  Stack,
  Tag,
  TagLabel,
  Text,
  Title,
} from "@stokei/ui";
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
        <Stack direction="column" spacing="5" align="center" justify="center">
          <Avatar
            size="lg"
            name={appMember?.fullname}
            src={appMember?.avatar?.file?.url || ""}
          />

          <Stack direction="row" spacing="1" align="center" justify="center">
            {!appMember?.isOwner &&
              (appMember?.isAdmin || appMember?.isInstructor) && (
                <>
                  {appMember?.isAdmin && (
                    <Tag colorScheme="yellow" variant="subtle">
                      <TagLabel>
                        {translate.formatMessage({ id: "admin" })}
                      </TagLabel>
                    </Tag>
                  )}
                  {appMember?.isInstructor && (
                    <Tag>
                      <TagLabel>
                        {translate.formatMessage({ id: "instructor" })}
                      </TagLabel>
                    </Tag>
                  )}
                </>
              )}
            {appMember?.isOwner && (
              <Tag colorScheme="green" variant="subtle">
                <TagLabel>{translate.formatMessage({ id: "owner" })}</TagLabel>
              </Tag>
            )}
          </Stack>
          <Stack width="auto" flex="1" direction="column" spacing="1">
            <Title size="md" textAlign="center">
              {appMember?.fullname}
            </Title>
            <Text justifyContent="center">{appMember?.email}</Text>
          </Stack>
        </Stack>
      </CardHeader>
    </Card>
  );
});
