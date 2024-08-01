import { useTranslations } from "@/hooks";
import { SubscriptionContractType } from "@/services/graphql/stokei";
import { getCardFlagURL, getProductURL } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  DatePickerGroup,
  Image,
  Label,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { useMemo } from "react";
import { SubscriptionPageSubscriptionContractFragment } from "../../graphql/subscription-contract.query.graphql.generated";
import { Customer } from "../../interfaces/customer";
import { Product } from "../../interfaces/product";
import { getSubscriptionContractStatusColor } from "@/utils/get-subscription-contract-status-color";

interface SubscriptionContractDetailsProps {
  readonly subscriptionContract?: SubscriptionPageSubscriptionContractFragment;
  readonly customer?: Customer;
  readonly subscriptionProducts?: Product[];
}

export const SubscriptionContractDetails = ({
  subscriptionContract,
  customer,
  subscriptionProducts,
}: SubscriptionContractDetailsProps) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () =>
      getSubscriptionContractStatusColor(subscriptionContract?.status as any),
    [subscriptionContract]
  );

  const isRecurringSubscriptionContract = useMemo(
    () => subscriptionContract?.type === SubscriptionContractType.Recurring,
    [subscriptionContract]
  );

  const showPeriod = useMemo(() => {
    if (!isRecurringSubscriptionContract) {
      return true;
    }
    return !!subscriptionContract?.startAt || !!subscriptionContract?.endAt;
  }, [isRecurringSubscriptionContract, subscriptionContract]);

  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        <Stack direction="column" spacing="5">
          <Stack direction="row" spacing="5" justify="space-between" align="center">
            <Title fontSize="md" lineHeight="shorter">
              {translate.formatMessage({ id: "subscriptionDetails" })}
            </Title>
            <Badge colorScheme={statusColor}>
              {translate.formatMessage({
                id: subscriptionContract?.status?.toLowerCase() as any,
              })}
            </Badge>
          </Stack>

          <Box flexDirection="column">
            <Label>{translate.formatMessage({ id: "student" })}</Label>

            <Stack direction="row" spacing="4" align="center">
              <Avatar
                size="sm"
                src={customer?.avatarURL}
                name={customer?.name}
              />
              <Box flexDirection="column">
                <Text fontWeight="bold">{customer?.name}</Text>
                <Text fontSize="xs" color="text.300">
                  {customer?.email}
                </Text>
              </Box>
            </Stack>
          </Box>
          <Box flexDirection="column">
            <Label>{translate.formatMessage({ id: "products" })}</Label>
            <Stack direction="column" spacing="4">
              {subscriptionProducts?.map(productInfo => (
                <Stack key={productInfo.id} direction="row" spacing="4" align="center">
                  <Image
                    width="10"
                    rounded="sm"
                    src={getProductURL(productInfo?.avatarURL)}
                    alt={productInfo?.name}
                  />
                  <Stack direction="column" spacing="4">
                    <Text fontWeight="bold">{productInfo?.name}</Text>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>

          {showPeriod && (
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "duration" })}</Label>
              <DatePickerGroup>
                {subscriptionContract?.startAt && (
                  <Text>
                    {translate.formatDate(subscriptionContract?.startAt)}
                  </Text>
                )}
                {!isRecurringSubscriptionContract ? (
                  <Badge colorScheme="purple">
                    {translate.formatMessage({
                      id: "lifelong",
                    })}
                  </Badge>
                ) : (
                  subscriptionContract?.endAt && (
                    <Text>
                      {translate.formatDate(subscriptionContract?.endAt)}
                    </Text>
                  )
                )}
              </DatePickerGroup>
            </Box>
          )}
          {subscriptionContract?.paymentMethod && (
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "paymentMethod" })}</Label>
              <Box>
                <Stack width="auto" direction="row" spacing="4" align="center">
                  <Image
                    width="10"
                    src={getCardFlagURL(
                      subscriptionContract?.paymentMethod?.cardBrand
                    )}
                    fallbackSrc={getCardFlagURL()}
                    alt={subscriptionContract?.paymentMethod?.cardBrand || ""}
                  />
                  <Box width="full" align="center" justify="flex-end">
                    <Text fontWeight="semibold">
                      ****{" "}
                      {subscriptionContract?.paymentMethod?.lastFourCardNumber}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
