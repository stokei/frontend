import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PaymentMethodManagementPaymentMethodCardFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Link,
  Loading,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { ChoiseEditable } from "../../components/choice-editable";
import { CouponForm } from "../../components/coupon-form";
import { CouponItem } from "../../components/coupon-item";
import { PaymentMethod } from "../../components/payment-method";
import { CheckoutPageCouponFragment } from "../../graphql/coupon.query.graphql.generated";

export interface SummaryStepProps {
  totalAmount?: number;
  couponDiscountAmount?: number;
  coupon?: CheckoutPageCouponFragment;
  isLoadingCheckout: boolean;
  isLoadingGetApplyCouponToValue: boolean;
  paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment;
  paymentMethodType?: PaymentMethodType;
  onChangeCoupon: (coupon?: CheckoutPageCouponFragment) => void;
  onGoToPaymentMethod: () => void;
  onGoToProducts: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const SummaryStep = ({
  coupon,
  paymentMethod,
  paymentMethodType,
  isLoadingCheckout,
  totalAmount,
  couponDiscountAmount,
  isLoadingGetApplyCouponToValue,
  onChangeCoupon,
  onPreviousStep,
  onNextStep,
  onGoToPaymentMethod,
  onGoToProducts,
}: SummaryStepProps) => {
  const translate = useTranslations();
  const { shoppingCartItems, subtotalAmount, promitionItemsAmount, currency } =
    useShoppingCart();

  return (
    <Stack direction="column" spacing="10">
      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "products" })}
        </Title>
        <ChoiseEditable onChange={onGoToProducts}>
          <Stack direction="column" spacing="5">
            {shoppingCartItems?.map((shoppingCartItem) => (
              <Stack
                key={shoppingCartItem?.product?.id}
                direction="row"
                spacing="5"
                align="center"
              >
                <Image
                  width="20"
                  src={shoppingCartItem?.product?.avatarURL || ""}
                  fallbackSrc={defaultNoImage.src}
                  alt={translate.formatMessage({ id: "course" })}
                />
                <Stack direction="column" spacing="1">
                  <Link
                    as={NextLink}
                    href={routes.product.home({
                      product: shoppingCartItem?.product?.id,
                    })}
                  >
                    <Title fontSize="md" color="inherit">
                      {shoppingCartItem?.product?.name}
                    </Title>
                  </Link>
                  <Price price={shoppingCartItem?.price} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </ChoiseEditable>
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "paymentMethod" })}
        </Title>
        <ChoiseEditable onChange={onGoToPaymentMethod}>
          {paymentMethodType && (
            <PaymentMethod
              paymentMethodType={paymentMethodType}
              paymentMethod={paymentMethod}
            />
          )}
        </ChoiseEditable>
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "coupon" })}
        </Title>
        {coupon?.code ? (
          <CouponItem
            coupon={coupon}
            onRemoveCoupon={() => onChangeCoupon(undefined)}
          />
        ) : (
          <CouponForm coupon={coupon} onSuccess={onChangeCoupon} />
        )}
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "payment" })}
        </Title>
        <Card>
          <CardBody>
            {isLoadingGetApplyCouponToValue ? (
              <Loading />
            ) : (
              <Stack direction="column" spacing="5">
                <Stack direction="column" spacing="1">
                  <Text lineHeight="shorter">
                    {translate.formatMessage({ id: "subtotal" })}:
                  </Text>
                  <Text fontSize="md" color="text.400" fontWeight="semibold">
                    {translate.formatMoney({
                      amount: subtotalAmount,
                      currency: currency?.id || "",
                      minorUnit: currency?.minorUnit,
                      showSymbol: true,
                    })}
                  </Text>
                </Stack>
                {promitionItemsAmount && (
                  <Stack direction="column" spacing="1">
                    <Text lineHeight="shorter">
                      {translate.formatMessage({ id: "promitionItems" })}:
                    </Text>
                    <Title
                      fontSize="md"
                      textDecoration="line-through"
                      color="red.400"
                      lineHeight="shorter"
                    >
                      {translate.formatMoney({
                        amount: promitionItemsAmount,
                        currency: currency?.id || "",
                        minorUnit: currency?.minorUnit,
                        showSymbol: true,
                      })}
                    </Title>
                  </Stack>
                )}
                {couponDiscountAmount && (
                  <Stack direction="column" spacing="1">
                    <Text lineHeight="shorter">
                      {translate.formatMessage({ id: "coupon" })}:
                    </Text>
                    <Title
                      fontSize="md"
                      textDecoration="line-through"
                      color="red.400"
                      lineHeight="shorter"
                    >
                      {translate.formatMoney({
                        amount: couponDiscountAmount,
                        currency: currency?.id || "",
                        minorUnit: currency?.minorUnit,
                        showSymbol: true,
                      })}
                    </Title>
                  </Stack>
                )}
                <Stack direction="column" spacing="1">
                  <Text fontWeight="bold" lineHeight="shorter">
                    {translate.formatMessage({ id: "total" })}:
                  </Text>
                  <Stack
                    width="fit-content"
                    direction="row"
                    align="center"
                    justify="center"
                  >
                    <Text fontSize="md" fontWeight="600">
                      {currency?.symbol}
                    </Text>
                    <Text
                      fontSize="3xl"
                      color="green.500"
                      fontWeight="900"
                      lineHeight="shorter"
                    >
                      {translate.formatMoney({
                        amount: totalAmount || 0,
                        currency: currency?.id || "",
                        minorUnit: currency?.minorUnit,
                      })}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </CardBody>
        </Card>
      </Stack>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isLoading={isLoadingCheckout}>
          {translate.formatMessage({ id: "buy" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
