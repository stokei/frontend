import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { useTranslations } from "@/hooks";
import { Card, CardBody, Container, Image, Stack, Title } from "@stokei/ui";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useMemo } from "react";
import { CheckoutForm } from "./components/checkout-form";
import { useGetCheckoutProductQuery } from "./graphql/product.query.graphql.generated";
import { CheckoutLayout } from "./layout";

const stripeLoadElements = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface CheckoutPageProps {
  readonly productId: string;
  readonly clientSecret: string;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({
  productId,
  clientSecret,
}) => {
  const translate = useTranslations();

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);

  return (
    <CheckoutLayout isLoading={isLoadingProduct}>
      <Stack paddingY="10" direction="column" spacing="10">
        <Container justify="center">
          <Stack direction="column" spacing="5" justify="center" align="center">
            <Image
              width="40"
              height="fit-content"
              rounded="md"
              src={product?.avatar?.file?.url || ""}
              fallbackSrc={defaultNoImage.src}
            />

            <Title marginBottom="5">{product?.name}</Title>

            <Price justify="center" size="lg" price={product?.defaultPrice} />
          </Stack>
        </Container>
        <Container justify="center" align="center">
          <Card
            width={["full", "full", "500px", "500px"]}
            background="background.50"
          >
            <CardBody>
              <Elements
                stripe={stripeLoadElements}
                options={{
                  appearance: {
                    theme: "stripe",
                  },
                  locale: translate.locale as any,
                }}
              >
                <CheckoutForm clientSecret={clientSecret} product={product} />
              </Elements>
            </CardBody>
          </Card>
        </Container>
      </Stack>
    </CheckoutLayout>
  );
};
