import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Image,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useCreateCheckoutMutation } from "../../graphql/create-checkout.mutation.graphql.generated";
import { useGetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";
import { CheckoutLayout } from "../../layout";

interface CheckoutPageProps {
  readonly productId: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({ productId }) => {
  const [currentPrice, setCurrentPrice] = useState<
    PriceComponentFragment | undefined | null
  >();
  const translate = useTranslations();
  const router = useRouter();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCheckout }, onExecuteCheckout] =
    useCreateCheckoutMutation();

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.defaultPrice || undefined);
    }
  }, [product]);

  const onBuy = async () => {
    try {
      const response = await onExecuteCheckout({
        input: {
          price: currentPrice?.id || "",
        },
      });

      if (!!response?.data?.createCheckout) {
        router.push(response.data.createCheckout.url || "");
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

  const onChoosePrice = useCallback(
    (priceId: string) => {
      const price = product?.prices?.items?.find(
        (productPrice) => productPrice?.id === priceId
      );
      setCurrentPrice(price || null);
    },
    [product]
  );

  return (
    <CheckoutLayout isLoading={isLoadingProduct}>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "584px", "584px"]}
          height="fit-content"
          flexDirection="column"
        >
          <Title fontSize="xl" marginBottom="5">
            {translate.formatMessage({ id: "chooseYourPlan" })}
          </Title>
          <Card background="background.50">
            <CardBody>
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

                <RadioGroup value={currentPrice?.id} onChange={onChoosePrice}>
                  {product?.prices?.items?.map((price) => (
                    <RadioCard
                      key={price?.id}
                      id={price?.id}
                      value={price?.id}
                      isChecked={price?.id === currentPrice?.id}
                    >
                      <Stack direction="column" spacing="3">
                        <Title fontSize="md">{price?.nickname}</Title>
                        <Price price={currentPrice} />
                      </Stack>
                    </RadioCard>
                  ))}
                </RadioGroup>

                <ButtonGroup width="full" justifyContent="flex-end">
                  <Button
                    onClick={onBuy}
                    isDisabled={!currentPrice}
                    isLoading={isLoadingCheckout}
                  >
                    {translate.formatMessage({ id: "subscribe" })}
                  </Button>
                </ButtonGroup>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
