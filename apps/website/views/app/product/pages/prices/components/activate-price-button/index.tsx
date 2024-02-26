import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import { Icon, MenuItem, useToast } from "@stokei/ui";

import { useActivatePriceMutation } from "../../graphql/activate-price.mutation.graphql.generated";

interface ActivatePriceButtonProps {
  priceId?: string;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const ActivatePriceButton = ({
  priceId,
  onSuccess,
}: ActivatePriceButtonProps) => {
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
    <MenuItem
      icon={<Icon name="reload" />}
      onClick={onActivatePrice}
      color="green.500"
    >
      {translate.formatMessage({
        id: isLoading ? "loading" : "activate",
      })}
    </MenuItem>
  );
};
