import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { useShoppingCart, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { Button, ButtonGroup, Image, Link, Stack, Title } from "@stokei/ui";
import NextLink from "next/link";
import { ChoiseEditableSummary } from "../../components/choice-editable-summary";
import { PaymentMethod } from "../../components/payment-method";

export interface SummaryStepProps {
  isLoadingCheckout: boolean;
  paymentMethodType?: PaymentMethodType;
  onGoToPaymentMethod: () => void;
  onGoToProducts: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  paymentMethodType,
  isLoadingCheckout,
  onPreviousStep,
  onNextStep,
  onGoToPaymentMethod,
  onGoToProducts,
}) => {
  const translate = useTranslations();
  const { shoppingCartItems } = useShoppingCart();

  return (
    <Stack direction="column" spacing="10">
      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "products" })}
        </Title>
        <ChoiseEditableSummary onChange={onGoToProducts}>
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
        </ChoiseEditableSummary>
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "paymentMethod" })}
        </Title>
        <ChoiseEditableSummary onChange={onGoToPaymentMethod}>
          {paymentMethodType && (
            <PaymentMethod paymentMethodType={paymentMethodType} />
          )}
        </ChoiseEditableSummary>
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
