import { useTranslations } from "@/hooks";
import { SubscriptionContractType } from "@/services/graphql/stokei";
import { getCardFlagURL, getProductURL } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Icon,
  Image,
  Label,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { SubscriptionPageSubscriptionContractFragment } from "../../graphql/subscription-contract.query.graphql.generated";
import { Customer } from "../../interfaces/customer";
import { Product } from "../../interfaces/product";

interface SubscriptionContractDetailsProps {
  readonly subscriptionContract?: SubscriptionPageSubscriptionContractFragment;
  readonly customer?: Customer;
  readonly product?: Product;
}

export const SubscriptionContractDetails: FC<
  SubscriptionContractDetailsProps
> = ({ subscriptionContract, customer, product }) => {
  const translate = useTranslations();

  const isRecurringSubscriptionContract = useMemo(
    () => subscriptionContract?.type === SubscriptionContractType.Recurring,
    [subscriptionContract]
  );

  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        <Stack direction="column" spacing="5">
          <Title fontSize="md" lineHeight="shorter">
            {translate.formatMessage({ id: "subscriptionDetails" })}
          </Title>

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
            <Label>{translate.formatMessage({ id: "product" })}</Label>
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
          </Box>
          <Box flexDirection="column">
            <Label>{translate.formatMessage({ id: "period" })}</Label>
            <Stack direction="row" spacing="2" align="center">
              {subscriptionContract?.startAt && (
                <Text>
                  {translate.formatDate(subscriptionContract?.startAt)}
                </Text>
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
                  <Text>
                    {translate.formatDate(subscriptionContract?.endAt)}
                  </Text>
                )
              )}
            </Stack>
          </Box>
          {subscriptionContract?.paymentMethod && (
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "paymentMethod" })}</Label>
              <Box>
                <Stack width="auto" direction="row" spacing="4" align="center">
                  <Image
                    width="10"
                    height="fit-content"
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
