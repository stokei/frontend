import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Image,
  Stack,
  Title,
} from "@stokei/ui";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  const router = useRouter();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "emailIsRequired" }) })
      .email({
        message: translate.formatMessage({ id: "mustBeAValidEmail" }),
      }),
    password: z.string().min(6, {
      message: translate.formatMessage({
        id: "passwordMustBeAtleastSixCharacters",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetCheckoutProductQuery({
      variables: {
        product: productId,
      },
    });

  const product = useMemo(() => dataProduct?.product, [dataProduct]);
  const checkoutStripeElementsOptions = useMemo(() => {
    return {
      clientSecret,
    };
  }, [clientSecret]);

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
          </Stack>
        </Container>
        <Container justify="center" align="center">
          <Card
            width={["full", "full", "500px", "500px"]}
            background="background.50"
          >
            <CardBody>
              <Form onSubmit={handleSubmit(() => {})}>
                <Stack direction="column" spacing="5">
                  <Price
                    justify="center"
                    size="lg"
                    price={product?.defaultPrice}
                  />

                  <Elements
                    stripe={stripeLoadElements}
                    options={checkoutStripeElementsOptions}
                  >
                    <PaymentElement />
                  </Elements>
                  <Button width="full">
                    {translate.formatMessage({ id: "buyNow" })}
                  </Button>
                </Stack>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Stack>
    </CheckoutLayout>
  );
};
