import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import { Icon, MenuItem, useToast } from "@stokei/ui";

import { useDeactivatePriceMutation } from "../../graphql/deactivate-price.mutation.graphql.generated";

interface DeactivatePriceButtonProps {
  priceId?: string;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const DeactivatePriceButton = ({
  priceId,
  onSuccess,
}: DeactivatePriceButtonProps) => {
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
    <MenuItem
      icon={<Icon name="close" />}
      onClick={onDeactivatePrice}
      color="red.500"
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "deactivate",
      })}
    </MenuItem>
  );
};
