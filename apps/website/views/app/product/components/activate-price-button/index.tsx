import { useAPIErrors, useTranslations } from "@/hooks";
import { Button, useToast } from "@stokei/ui";
import { FC } from "react";
import { useActivatePriceMutation } from "../../graphql/activate-price.mutation.graphql.generated";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";

interface ActivatePriceButtonProps {
  priceId?: string;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const ActivatePriceButton: FC<ActivatePriceButtonProps> = ({
  priceId,
  onSuccess,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoading }, activatePrice] = useActivatePriceMutation();

  const onActivatePrice = async () => {
    try {
      const response = await activatePrice({
        input: {
          price: priceId || "",
        },
      });
      if (!!response?.data?.activatePrice) {
        onShowToast({
          title: translate.formatMessage({ id: "priceActivatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.activatePrice);
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
    <Button variant="outline" isLoading={isLoading} onClick={onActivatePrice}>
      {translate.formatMessage({
        id: "activate",
      })}
    </Button>
  );
};
