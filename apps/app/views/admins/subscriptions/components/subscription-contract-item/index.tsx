import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { SubscriptionContractType } from "@/services/graphql/stokei";
import { getProductURL } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";
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

    return (
      <TableRow
        onClick={() =>
          router.push(
            routes.admins.subscriptions.subscription({
              subscription: subscriptionContract?.id,
            })
          )
        }
      >
        <TableCell>
          <Stack direction="row" spacing="4" align="center">
            <Avatar size="sm" src={customer?.avatarURL} name={customer?.name} />
            <Stack direction="column" spacing="0">
              <Text fontWeight="bold">{customer?.name}</Text>
              <Text fontSize="xs" color="text.300">
                {customer?.email}
              </Text>
            </Stack>
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
          <Text>
            {translate.formatDate(subscriptionContract?.startAt || "")}
          </Text>
        </TableCell>
        <TableCell>
          <Text>{translate.formatDate(subscriptionContract?.endAt || "")}</Text>
        </TableCell>
        <TableCell>
          <Box>
            <Badge
              colorScheme={isRecurringSubscriptionContract ? "green" : "gray"}
            >
              {translate.formatMessage({
                id: isRecurringSubscriptionContract ? "recurring" : "lifelong",
              })}
            </Badge>
          </Box>
        </TableCell>
      </TableRow>
    );
  }
);

SubscriptionContractItem.displayName = "SubscriptionContractItem";
