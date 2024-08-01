import { useTranslations } from "@/hooks";
import { SubscriptionContractType } from "@/services/graphql/stokei";
import { getSubscriptionContractStatusColor } from "@/utils/get-subscription-contract-status-color";
import { appRoutes } from "@stokei/routes";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  DatePickerGroup,
  Stack,
  TableCell,
  TableRow,
  Text
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AppSubscriptionContractFragment, SubscriptionContractProductFragment } from "../../graphql/subscription-contracts.query.graphql.generated";

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

export const SubscriptionContractItem = ({
  subscriptionContract,
}: SubscriptionContractItemProps) => {
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

  const getProductInfo = useCallback((currentProduct?: SubscriptionContractProductFragment | null) => {
    if (currentProduct?.__typename === "Course") {
      return {
        id: currentProduct?.courseId,
        name: currentProduct?.courseName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      } as Product;
    }
    if (currentProduct?.__typename === "Plan") {
      return {
        id: currentProduct?.planId,
        name: currentProduct?.planName,
      } as Product;
    }
    if (currentProduct?.__typename === "Material") {
      return {
        id: currentProduct?.materialId,
        name: currentProduct?.materialName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      } as Product;
    }
    if (currentProduct?.__typename === "Product") {
      return {
        id: currentProduct?.productId,
        name: currentProduct?.productName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      } as Product;
    }
    return;
  }, []);

  const subscriptionProducts = subscriptionContract?.items?.items?.filter(item => !!item?.product)?.map(item => getProductInfo(item?.product)) as Product[];


  const statusColor = useMemo(
    () =>
      getSubscriptionContractStatusColor(subscriptionContract?.status as any),
    [subscriptionContract]
  );

  const isRecurringSubscriptionContract = useMemo(
    () => subscriptionContract?.type === SubscriptionContractType.Recurring,
    [subscriptionContract]
  );

  const goToSubscriptionContractPage = useCallback(
    () =>
      router.push(
        appRoutes.customers.subscriptions.subscription({
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
        <AvatarGroup>
          {subscriptionProducts?.map(item => (
            <Avatar
              size="sm"
              name={item?.name}
              src={item?.avatarURL}
            />
          ))}
        </AvatarGroup>
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
        <DatePickerGroup>
          {subscriptionContract?.startAt && (
            <Text>{translate.formatDate(subscriptionContract?.startAt)}</Text>
          )}
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
        </DatePickerGroup>
      </TableCell>
    </TableRow>
  );
};
