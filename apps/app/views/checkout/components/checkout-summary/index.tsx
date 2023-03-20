import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Button, Image, Stack, Title } from "@stokei/ui";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { FC } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-methods.query.graphql.generated";
import { useSubscribeProductMutation } from "../../graphql/subscribe-product.mutation.graphql.generated";

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
  productName,
  canBuy,
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
    <Stack direction="column" spacing="4">
      <Stack direction="row" spacing="5" align="center">
        <Image
          width="24"
          height="fit-content"
          rounded="md"
          src={avatarURL || ""}
          fallbackSrc={defaultNoImage.src}
        />

        <Title fontSize="lg" marginBottom="5">
          {productName}
        </Title>
      </Stack>
      <Price size="lg" price={currentPrice} />
      <Button
        width="full"
        onClick={onBuy}
        isLoading={isLoadingSubscribeProduct}
        isDisabled={!canBuy}
      >
        {translate.formatMessage({ id: "subscribe" })}
      </Button>
      <Button width="full" onClick={onPreviousStep} isDisabled={!canBuy}>
        {translate.formatMessage({ id: "previous" })}
      </Button>
    </Stack>
  );
};
