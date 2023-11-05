import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useShoppingCart, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ProductPageProductFragment } from "../../graphql/product.query.graphql.generated";
import { Features } from "../../pages/generic/components/features";

export interface CheckoutInfoProps {
  readonly product?: ProductPageProductFragment;
  readonly avatarURL?: string;
  readonly defaultPrice?: PriceComponentFragment | null;
  readonly features?: ProductPageProductFragment["features"];
  readonly prices?: ProductPageProductFragment["prices"];
}

export const CheckoutInfo: FC<CheckoutInfoProps> = ({
  product,
  avatarURL,
  features,
  defaultPrice,
  prices,
}) => {
  const [currentPrice, setCurrentPrice] =
    useState<PriceComponentFragment | null>();

  const router = useRouter();
  const translate = useTranslations();
  const { isAuthenticated } = useCurrentAccount();
  const { onAddShoppingCartItem } = useShoppingCart();

  const priceURLParamId = useMemo(
    () => router.query?.price?.toString() || "",
    [router.query?.price]
  );

  useEffect(() => {
    let priceSelected = defaultPrice;
    if (priceURLParamId) {
      priceSelected = prices?.items?.find(
        (currentPriceItem) => priceURLParamId === currentPriceItem?.id
      );
      if (!priceSelected) {
        priceSelected = defaultPrice;
      }
    }
    if (priceSelected) {
      setCurrentPrice(priceSelected || undefined);
    }
  }, [defaultPrice, priceURLParamId, prices?.items]);

  const onRedirectToCheckout = async () => {
    const checkoutURL = routes.checkout.home;
    onAddShoppingCartItem({
      price: currentPrice,
      product: {
        id: product?.id || "",
        name: product?.name || "",
        avatarURL: product?.avatar?.file?.url || "",
      },
    });
    if (!isAuthenticated) {
      await router.push({
        pathname: routes.auth.login,
        query: {
          redirectTo: checkoutURL,
        },
      });
      return;
    }
    await router.push(checkoutURL);
  };

  const onChoosePrice = useCallback(
    (priceId: string) => {
      const price = prices?.items?.find(
        (productPrice) => productPrice?.id === priceId
      );
      setCurrentPrice(price || null);
    },
    [prices]
  );

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

            <RadioGroup value={currentPrice?.id} onChange={onChoosePrice}>
              <Stack spacing="5" direction="column">
                {prices?.items?.map((price) => (
                  <RadioCard
                    key={price?.id}
                    id={price?.id}
                    value={price?.id}
                    isChecked={price?.id === currentPrice?.id}
                  >
                    <Stack direction="column" spacing="3">
                      {price?.nickname && (
                        <Title fontSize="md">{price?.nickname}</Title>
                      )}
                      <Price price={price} />
                    </Stack>
                  </RadioCard>
                ))}
              </Stack>
            </RadioGroup>

            <Button
              width="full"
              onClick={onRedirectToCheckout}
              isDisabled={!currentPrice}
            >
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
            {!!features?.totalCount && <Features features={features} />}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
