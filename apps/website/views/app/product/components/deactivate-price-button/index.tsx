import { useAPIErrors, useTranslations } from "@/hooks";
import { Button, useToast } from "@stokei/ui";
import { FC } from "react";
import { useDeactivatePriceMutation } from "../../graphql/deactivate-price.mutation.graphql.generated";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";

interface DeactivatePriceButtonProps {
  priceId?: string;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const DeactivatePriceButton: FC<DeactivatePriceButtonProps> = ({
  priceId,
  onSuccess,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoading }, deactivatePrice] =
    useDeactivatePriceMutation();

  const onDeactivatePrice = async () => {
    try {
      const response = await deactivatePrice({
        input: {
          price: priceId || "",
        },
      });
      if (!!response?.data?.deactivatePrice) {
        onShowToast({
          title: translate.formatMessage({
            id: "priceDeactivatedSuccessfully",
          }),
          status: "success",
        });
        onSuccess?.(response?.data?.deactivatePrice);
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Button
      variant="outline"
      isLoading={isLoading}
      onClick={onDeactivatePrice}
      colorScheme="red"
    >
      {translate.formatMessage({
        id: "deactivate",
      })}
    </Button>
  );
};
