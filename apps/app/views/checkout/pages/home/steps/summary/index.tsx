import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { CheckoutProductFragment } from "@/views/checkout/graphql/product.query.graphql.generated";
import { Button, ButtonGroup, Image, Stack, Title } from "@stokei/ui";
import { ChoiseEditableSummary } from "../../components/choice-editable-summary";
import { PaymentMethod } from "../../components/payment-method";

export interface SummaryStepProps {
  isLoadingCheckout: boolean;
  product?: CheckoutProductFragment | null;
  price?: PriceComponentFragment | null;
  paymentMethodType: PaymentMethodType;
  onGoToPaymentMethod: () => void;
  onGoToSubscription: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  price,
  product,
  paymentMethodType,
  isLoadingCheckout,
  onPreviousStep,
  onNextStep,
  onGoToPaymentMethod,
  onGoToSubscription,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="10">
      <Stack direction="row" spacing="5" align="center">
        <Image
          width="24"
          rounded="md"
          src={product?.avatar?.file?.url || ""}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />

        <Title fontSize="lg">{product?.name}</Title>
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "price" })}
        </Title>
        <ChoiseEditableSummary onChange={onGoToSubscription}>
          <Stack direction="column" spacing="3">
            {price?.nickname && <Title fontSize="md">{price?.nickname}</Title>}
            <Price price={price} withUnitDescription />
          </Stack>
        </ChoiseEditableSummary>
      </Stack>

      <Stack direction="column" spacing="3">
        <Title fontSize="sm" color="text.700">
          {translate.formatMessage({ id: "paymentMethod" })}
        </Title>
        <ChoiseEditableSummary onChange={onGoToPaymentMethod}>
          <PaymentMethod paymentMethodType={paymentMethodType} />
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
