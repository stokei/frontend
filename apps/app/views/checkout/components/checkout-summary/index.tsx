import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Button, ButtonGroup, Image, Stack, Title } from "@stokei/ui";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { FC } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-methods.query.graphql.generated";
import { useSubscribeProductMutation } from "../../graphql/subscribe-product.mutation.graphql.generated";
import { PaymentMethodItem } from "../payment-method-item";

export interface CheckoutSummaryProps {
  readonly productId?: string;
  readonly productName?: string;
  readonly avatarURL?: string;
  readonly canBuy?: boolean;
  readonly currentPrice?: PriceComponentFragment | null;
  readonly currentPaymentMethod?:
    | CheckoutPaymentMethodFragment
    | undefined
    | null;
  readonly onNextStep: (buySuccessfully: boolean) => void;
  readonly onPreviousStep: () => void;
}

export const CheckoutSummary: FC<CheckoutSummaryProps> = ({
  canBuy,
  productName,
  avatarURL,
  currentPrice,
  currentPaymentMethod,
  onNextStep,
  onPreviousStep,
}) => {
  const translate = useTranslations();
  const { homePageURL } = useCurrentAccount();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingSubscribeProduct }, onExecuteSubscribeProduct] =
    useSubscribeProductMutation();

  const onBuy = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await onExecuteSubscribeProduct({
        input: {
          price: currentPrice?.id || "",
          paymentMethod: currentPaymentMethod?.id || "",
        },
      });

      if (!!response?.data?.subscribeProduct) {
        onNextStep?.(true);
        router.push(homePageURL || "");
        return;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({
        message: translate.formatMessage({ id: "somethingWentWrong" }),
      });
    }
  };

  return (
    <Stack direction="column" spacing="8">
      <Stack direction="column" spacing="2">
        <Stack direction="row" spacing="5" align="center" marginBottom="5">
          <Image
            width="24"
            rounded="md"
            src={avatarURL || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "product" })}
          />

          <Title fontSize="lg">{productName}</Title>
        </Stack>

        <Price size="lg" price={currentPrice} />
      </Stack>

      <Stack direction="column" spacing="2">
        <Title fontSize="lg">
          {translate.formatMessage({ id: "paymentMethod" })}
        </Title>
        <PaymentMethodItem paymentMethod={currentPaymentMethod} />
      </Stack>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button variant="ghost" onClick={onPreviousStep}>
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button
          onClick={onBuy}
          isLoading={isLoadingSubscribeProduct}
          isDisabled={!canBuy}
        >
          {translate.formatMessage({ id: "subscribe" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
