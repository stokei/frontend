import { useAPIErrors, useTranslations } from "@/hooks";
import { Icon, MenuItem, useToast } from "@stokei/ui";

import { useUpdateProductMutation } from "../../../../graphql/update-product.mutation.graphql.generated";

interface MakeDefaultPriceButtonProps {
  priceId: string;
  productId: string;
  onSuccess?: () => void;
}

export const MakeDefaultPriceButton = ({
  priceId,
  productId,
  onSuccess,
}: MakeDefaultPriceButtonProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoading }, updateProduct] = useUpdateProductMutation();

  const onMakeDefaulPrice = async () => {
    try {
      const response = await updateProduct({
        input: {
          data: {
            defaultPrice: priceId,
          },
          where: {
            product: productId,
          },
        },
      });
      if (!!response?.data?.updateProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "priceUpdatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.();
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
    <MenuItem icon={<Icon name="star" />} onClick={onMakeDefaulPrice}>
      {translate.formatMessage({
        id: isLoading ? "loading" : "makeDefault",
      })}
    </MenuItem>
  );
};
