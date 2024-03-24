import { useCurrentApp, useTranslations } from "@/hooks";
import { Badge, Button, Card, CardBody, Stack, Text } from "@stokei/ui";

import { CouponPageCouponFragment } from "../../graphql/coupons.query.graphql.generated";

interface CouponItemProps {
  coupon: CouponPageCouponFragment;
  onOpenEditCouponDrawer: () => void;
}

export const CouponItem = ({
  coupon,
  onOpenEditCouponDrawer,
}: CouponItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Card key={coupon.id} width="full" background="background.50">
      <CardBody overflow="hidden" alignItems="center">
        <Stack
          direction={["column", "column", "row", "row"]}
          spacing="5"
          justifyContent="space-between"
          alignItems={["flex-start", "flex-start", "center", "center"]}
        >
          <Stack direction="column" spacing="1">
            <Text fontWeight="semibold">{coupon.code}</Text>
            {coupon.amountOff && (
              <Text fontSize="sm">
                {translate.formatMoney({
                  showSymbol: true,
                  amount: coupon.amountOff || 0,
                  currency: currentApp?.currency?.id || "",
                  minorUnit: currentApp?.currency?.minorUnit,
                })}{" "}
                OFF
              </Text>
            )}
            {coupon.percentOff && (
              <Text fontSize="sm">{coupon.percentOff}% OFF</Text>
            )}
            {coupon?.active ? (
              <Badge colorScheme="green">
                {translate.formatMessage({ id: "active" })}
              </Badge>
            ) : (
              <Badge colorScheme="gray">
                {translate.formatMessage({ id: "inactive" })}
              </Badge>
            )}
          </Stack>
          <Button
            variant={["solid", "solid", "ghost", "ghost"]}
            onClick={onOpenEditCouponDrawer}
          >
            {translate.formatMessage({ id: "edit" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
