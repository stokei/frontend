import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { SubscriptionContractType } from "@/services/graphql/stokei";
import { getProductURL } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Icon,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useMemo } from "react";
import { AppSubscriptionContractFragment } from "../../graphql/subscription-contracts.query.graphql.generated";
import { getStatusColor } from "../../mappers/get-status-color";

export interface SubscriptionContractItemProps {
  readonly subscriptionContract?: AppSubscriptionContractFragment;
}

interface Customer {
  name: string;
  avatarURL: string;
  email: string;
}
interface Product {
  id: string;
  name: string;
  avatarURL?: string;
}

export const SubscriptionContractItem: FC<SubscriptionContractItemProps> = memo(
  ({ subscriptionContract }) => {
    const translate = useTranslations();
    const router = useRouter();

    const customer = useMemo<Customer | undefined>(() => {
      if (subscriptionContract?.parent?.__typename === "Account") {
        return {
          name: subscriptionContract?.parent?.fullname,
          email: subscriptionContract?.parent?.appEmail || "",
          avatarURL: subscriptionContract?.parent?.avatar?.file?.url || "",
        };
      }
      if (subscriptionContract?.parent?.__typename === "App") {
        return {
          name: subscriptionContract?.parent?.name,
          email: subscriptionContract?.parent?.accountEmail || "",
          avatarURL: subscriptionContract?.parent?.logo?.file?.url || "",
        };
      }
      return;
    }, [subscriptionContract]);

    const product = useMemo<Product | undefined>(() => {
      const currentProduct = subscriptionContract?.items?.items?.[0]?.product;
      if (currentProduct?.__typename === "Course") {
        return {
          id: currentProduct?.courseId,
          name: currentProduct?.courseName,
          avatarURL: currentProduct?.avatar?.file?.url || "",
        };
      }
      if (currentProduct?.__typename === "Plan") {
        return {
          id: currentProduct?.planId,
          name: currentProduct?.planName,
        };
      }
      return;
    }, [subscriptionContract]);

    const statusColor = useMemo(
      () => getStatusColor(subscriptionContract?.status as any),
      [subscriptionContract]
    );

    const isRecurringSubscriptionContract = useMemo(
      () => subscriptionContract?.type === SubscriptionContractType.Recurring,
      [subscriptionContract]
    );

    const goToSubscriptionContractPage = useCallback(
      () =>
        router.push(
          routes.admins.subscriptions.subscription({
            subscription: subscriptionContract?.id,
          })
        ),
      [router, subscriptionContract?.id]
    );

    return (
      <TableRow onClick={goToSubscriptionContractPage}>
        <TableCell>
          <Stack direction="row" spacing="4" align="center">
            <Avatar size="sm" src={customer?.avatarURL} name={customer?.name} />
            <Box flexDirection="column">
              <Text fontWeight="bold">{customer?.name}</Text>
              <Text fontSize="xs" color="text.300">
                {customer?.email}
              </Text>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing="4" align="center">
            <Image
              width="10"
              height="fit-content"
              rounded="sm"
              src={getProductURL(product?.avatarURL)}
              alt={translate.formatMessage({ id: "product" })}
            />
            <Stack direction="column" spacing="4">
              <Text fontWeight="bold">{product?.name}</Text>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>
          <Box>
            <Badge colorScheme={statusColor}>
              {translate.formatMessage({
                id: subscriptionContract?.status?.toLowerCase() as any,
              })}
            </Badge>
          </Box>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing="2" align="center">
            {subscriptionContract?.startAt && (
              <Text>{translate.formatDate(subscriptionContract?.startAt)}</Text>
            )}
            {subscriptionContract?.startAt &&
              (!isRecurringSubscriptionContract ||
                subscriptionContract?.endAt) && <Icon name="arrowRight" />}
            {!isRecurringSubscriptionContract ? (
              <Badge colorScheme="purple">
                {translate.formatMessage({
                  id: "lifelong",
                })}
              </Badge>
            ) : (
              subscriptionContract?.endAt && (
                <Text>{translate.formatDate(subscriptionContract?.endAt)}</Text>
              )
            )}
          </Stack>
        </TableCell>
      </TableRow>
    );
  }
);

SubscriptionContractItem.displayName = "SubscriptionContractItem";
