import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { PriceType } from "@/services/graphql/stokei";
import {
  Badge,
  BadgeGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  Text,
} from "@stokei/ui";
import { useMemo } from "react";
import { ActionsMenu } from "../actions-menu";

interface PriceItemProps {
  price?: PriceComponentFragment;
  isFirstPrice?: boolean;
  onSuccessPriceUpdated: () => void;
  onSuccessPriceActivated: (price?: PriceComponentFragment) => void;
  onSuccessPriceDeactivated: (price?: PriceComponentFragment) => void;
}

export const PriceItem = ({
  price,
  isFirstPrice,
  onSuccessPriceUpdated,
  onSuccessPriceActivated,
  onSuccessPriceDeactivated,
}: PriceItemProps) => {
  const translate = useTranslations();

  const isDefaultPrice = useMemo(
    () => !!price?.isDefault || !!isFirstPrice,
    [price, isFirstPrice]
  );
  const isRecurring = useMemo(
    () => price?.type === PriceType.Recurring,
    [price?.type]
  );

  return (
    <Card>
      <CardHeader paddingBottom={0}>
        <Stack direction="row" spacing="5" justify="space-between">
          <Text fontSize="md" lineHeight="shorter" fontWeight="600">
            {price?.nickname}
          </Text>
          <ActionsMenu
            isDefaultPrice={isDefaultPrice}
            price={price}
            onSuccessPriceUpdated={onSuccessPriceUpdated}
            onSuccessPriceDeactivated={onSuccessPriceDeactivated}
            onSuccessPriceActivated={onSuccessPriceActivated}
          />
        </Stack>
      </CardHeader>
      <CardBody paddingBottom={0}>
        <Price price={price} withUnitDescription />
      </CardBody>
      <CardFooter>
        <BadgeGroup direction="row">
          {price?.active ? (
            <Badge colorScheme="green">
              {translate.formatMessage({
                id: "active",
              })}
            </Badge>
          ) : (
            <Badge colorScheme="gray">
              {translate.formatMessage({
                id: "inactive",
              })}
            </Badge>
          )}
          {!isRecurring && (
            <Badge colorScheme="purple">
              {translate.formatMessage({
                id: "lifelong",
              })}
            </Badge>
          )}
          {isDefaultPrice && (
            <Badge colorScheme="gray">
              {translate.formatMessage({
                id: "default",
              })}
            </Badge>
          )}
        </BadgeGroup>
      </CardFooter>
    </Card>
  );
};
