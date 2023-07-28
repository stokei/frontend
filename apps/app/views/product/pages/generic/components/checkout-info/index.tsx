import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { Box, Button, Card, CardBody, Image, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { ProductPageProductFragment } from "../../../graphql/product.query.graphql.generated";
import { Features } from "../features";

export interface CheckoutInfoProps {
  readonly productId?: string;
  readonly avatarURL?: string;
  readonly defaultPrice?: PriceComponentFragment | null;
  readonly features?: ProductPageProductFragment["features"];
}

export const CheckoutInfo: FC<CheckoutInfoProps> = ({
  productId,
  avatarURL,
  features,
  defaultPrice,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { isAuthenticated } = useCurrentAccount();

  const onRedirectToCheckout = async () => {
    const checkoutURL = routes.checkout.home({
      product: productId || "",
    });
    if (!isAuthenticated) {
      router.push({
        pathname: routes.auth.login,
        query: {
          redirectTo: checkoutURL,
        },
      });
      return;
    }
    router.push(checkoutURL);
  };

  return (
    <Box
      width={["full", "full", "350px", "350px"]}
      height="fit-content"
      flexDirection="column"
    >
      <Card width="full" background="background.50" flex="auto">
        <CardBody>
          <Stack direction="column" spacing="4">
            <Image
              width="full"
              rounded="md"
              src={avatarURL || ""}
              fallbackSrc={defaultNoImage.src}
              alt={translate.formatMessage({ id: "product" })}
            />
            <Price size="lg" price={defaultPrice} />
            <Button width="full" onClick={onRedirectToCheckout}>
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
            {!!features?.totalCount && <Features features={features} />}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
