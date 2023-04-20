import { useAPIErrors, useTranslations } from "@/hooks";
import { Button, useToast } from "@stokei/ui";
import { FC } from "react";
import { useActivatePriceMutation } from "../../graphql/activate-price.mutation.graphql.generated";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useUpdateProductMutation } from "../../graphql/update-product.mutation.graphql.generated";

interface MakeDefaultPriceButtonProps {
  priceId: string;
  productId: string;
  onSuccess?: () => void;
}

export const MakeDefaultPriceButton: FC<MakeDefaultPriceButtonProps> = ({
  priceId,
  productId,
  onSuccess,
}) => {
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
    <Button
      variant="link"
      isLoading={isLoading}
      onClick={onMakeDefaulPrice}
      colorScheme="blue"
    >
      {translate.formatMessage({
        id: "makeDefault",
      })}
    </Button>
  );
};
