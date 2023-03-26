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
import { FC, memo, useCallback, useMemo } from "react";

import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppMemberFragment } from "../../graphql/member.fragment.graphql.generated";
import { RoleName } from "@/constants/role-names";

export interface MemberItemProps {
  readonly appMember?: AppMemberFragment;
}

export const MemberItem: FC<MemberItemProps> = memo(({ appMember }) => {
  const router = useRouter();
  const translate = useTranslations();

  const getRoleTagData = useCallback(
    (roleName: string) => {
      const data: Record<
        string,
        {
          label?: string;
          variant: string;
          colorSchema: string;
        }
      > = {
        [RoleName.ADMIN]: {
          label: translate.formatMessage({ id: "admin" }),
          variant: "subtle",
          colorSchema: "blue",
        },
        [RoleName.INSTRUCTOR]: {
          label: translate.formatMessage({ id: "instructor" }),
          variant: "subtle",
          colorSchema: "red",
        },
        [RoleName.STUDENT]: {
          label: translate.formatMessage({ id: "student" }),
          variant: "subtle",
          colorSchema: "yellow",
        },
      };
      return data[roleName];
    },
    [translate]
  );

  const hasRoles = useMemo(() => {
    return !!appMember?.isOwner || !!appMember?.roles?.totalCount;
  }, [appMember]);

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="column" spacing="5" align="center" justify="center">
          <Avatar
            size="lg"
            name={appMember?.fullname}
            src={appMember?.avatar?.file?.url || ""}
          />

          {hasRoles && (
            <Stack direction="row" spacing="1" align="center" justify="center">
              {appMember?.isOwner && (
                <Tag colorScheme="green" variant="subtle">
                  <TagLabel>
                    {translate.formatMessage({ id: "owner" })}
                  </TagLabel>
                </Tag>
              )}
              {appMember?.roles?.items?.map((role) => {
                const tagData = getRoleTagData(role?.name);
                return (
                  <Tag
                    key={role.id}
                    colorScheme={tagData.colorSchema}
                    variant={tagData.variant}
                  >
                    <TagLabel>{tagData.label}</TagLabel>
                  </Tag>
                );
              })}
            </Stack>
          )}
          <Stack direction="column" spacing="1">
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

MemberItem.displayName = "MemberItem";
