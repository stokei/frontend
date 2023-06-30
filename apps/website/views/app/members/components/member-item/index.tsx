import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Tag,
  TagLabel,
  Text,
  Title,
} from "@stokei/ui";
import { FC, memo, useCallback, useMemo } from "react";

import { RoleName } from "@/constants/role-names";
import { useCurrentApp, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { AccountStatus } from "@/services/graphql/stokei";
import { getAccountStatusColor } from "@/utils/get-account-status-color";
import { useRouter } from "next/router";
import { AppMemberFragment } from "../../graphql/member.fragment.graphql.generated";

export interface MemberItemProps {
  readonly appMember?: AppMemberFragment;
}

export const MemberItem: FC<MemberItemProps> = memo(({ appMember }) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();
  const { currentApp } = useCurrentApp();

  const memeberStatus = useMemo(() => {
    const labels = {
      [AccountStatus.Active]: translate.formatMessage({ id: "active" }),
      [AccountStatus.Inactive]: translate.formatMessage({ id: "inactive" }),
      [AccountStatus.Blocked]: translate.formatMessage({ id: "blocked" }),
      [AccountStatus.Canceled]: translate.formatMessage({ id: "canceled" }),
      [AccountStatus.ConfigurationPending]: translate.formatMessage({
        id: "configurationPending",
      }),
    };
    return {
      label: labels[appMember?.status || AccountStatus.Active],
      colorSchema: getAccountStatusColor(appMember?.status),
    };
  }, [appMember?.status, translate]);

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

  const goToEditMember = () => {
    if (currentAccount?.id === appMember?.id) {
      return router.push(routes.me.home);
    }
    return router.push(
      routes.app({ appId: currentApp?.id }).member({ member: appMember?.id })
        .home
    );
  };

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader>
        <Stack direction="row" spacing="5" align="center">
          <Avatar
            size="lg"
            name={appMember?.fullname}
            src={appMember?.avatar?.file?.url || ""}
          />

          <Stack direction="column" spacing="1">
            <Title size="sm">{appMember?.fullname}</Title>
            <Text fontSize="sm">{appMember?.email}</Text>

            <Box>
              <Badge
                size="sm"
                colorScheme={memeberStatus.colorSchema}
                variant="subtle"
              >
                {memeberStatus.label}
              </Badge>
            </Box>
          </Stack>
        </Stack>
      </CardHeader>
      <CardBody borderTopWidth="thin">
        <Box maxWidth="full" flexDirection="row" justify="space-between">
          <Stack
            width="fit-content"
            flexWrap="wrap"
            flex="1"
            direction="row"
            spacing="1"
          >
            {appMember?.isOwner && (
              <Tag size="sm" colorScheme="green" variant="subtle">
                <TagLabel>{translate.formatMessage({ id: "owner" })}</TagLabel>
              </Tag>
            )}
            {appMember?.roles?.items?.map((role) => {
              const tagData = getRoleTagData(role?.name);
              return (
                <Tag
                  key={role.id}
                  colorScheme={tagData.colorSchema}
                  variant={tagData.variant}
                  size="sm"
                >
                  <TagLabel>{tagData.label}</TagLabel>
                </Tag>
              );
            })}
          </Stack>
          <Button variant="ghost" onClick={goToEditMember}>
            {translate.formatMessage({ id: "edit" })}
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
});

MemberItem.displayName = "MemberItem";
