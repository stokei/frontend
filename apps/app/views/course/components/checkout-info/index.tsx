import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getRoutes } from "@/routes";
import { Box, Button, Card, CardBody, Image, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { GetProductCourseQuery } from "../../graphql/course.query.graphql.generated";
import { useSubscribeProductMutation } from "../../graphql/subscribe-product.mutation.graphql.generated";
import { Features } from "../features";

export interface CheckoutInfoProps {
  readonly product?: GetProductCourseQuery["product"] | null;
}

export const CheckoutInfo: FC<CheckoutInfoProps> = ({ product }) => {
  const router = useRouter();
  const translate = useTranslations();
  const { isAuthenticated } = useCurrentAccount();

  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingSubscribeProduct }, onExecuteSubscribeProduct] =
    useSubscribeProductMutation();

  const onRedirectToCheckout = async () => {
    try {
      const response = await onExecuteSubscribeProduct({
        input: {
          price: product?.defaultPrice?.id || "",
        },
      });
      if (!!response?.data?.subscribeProduct) {
        const checkoutURL = getRoutes().checkout.home({
          product: product?.id || "",
          clientSecret: response?.data?.subscribeProduct?.clientSecret || "",
        });
        if (!isAuthenticated) {
          router.push(getRoutes().login, {
            query: {
              redirectTo: checkoutURL,
            },
          });
          return;
        }
        router.push(checkoutURL);
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
    <Box
      width={["full", "full", "350px", "350px"]}
      height="fit-content"
      flexDirection="column"
    >
      <Card
        width="full"
        background="background.50"
        flex="auto"
        marginTop={["0", "0", "-100px", "-100px"]}
      >
        <CardBody>
          <Stack direction="column" spacing="4">
            {product?.avatar?.file?.url && (
              <Image
                width="full"
                height="fit-content"
                rounded="md"
                src={product?.avatar?.file?.url || ""}
                fallbackSrc={defaultNoImage.src}
              />
            )}
            <Price size="lg" price={product?.defaultPrice} />
            <Button
              width="full"
              onClick={onRedirectToCheckout}
              isLoading={isLoadingSubscribeProduct}
            >
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
