import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { useShoppingCart } from "@stokei/builder";
import { Button, ButtonGroup, Loading, Stack, Text, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { ProductItem } from "../../components/product-item";
import { useGetCheckoutProductsQuery } from "../../graphql/products.query.graphql.generated";

export interface ProductsStepProps {
  onNextStep: () => void;
}

export const ProductsStep = ({ onNextStep }: ProductsStepProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { isEmptyShoppingCart, shoppingCartItems } = useShoppingCart();
  const productsIds = useMemo(
    () => shoppingCartItems?.map(({ product }) => product.id)?.filter(Boolean),
    [shoppingCartItems]
  );

  const [{ fetching: isLoadingProducts, data: dataProducts }] =
    useGetCheckoutProductsQuery({
      pause: !productsIds?.length,
      variables: {
        where: {
          AND: {
            ids: productsIds,
          },
        },
      },
    });

  const productsWithPrice = useMemo(() => {
    const products = dataProducts?.products?.items || [];
    return shoppingCartItems?.map((shoppingCartItem) => ({
      product: products.find(
        (product) => shoppingCartItem?.product?.id === product.id
      ),
      price: shoppingCartItem?.price,
    }));
  }, [dataProducts?.products?.items, shoppingCartItems]);

  const goToStore = useCallback(
    () => router.push(appRoutes.store.home),
    [router]
  );

  return (
    <Stack direction="column" spacing="10">
      <Title fontSize="lg">{translate.formatMessage({ id: "products" })}</Title>

      {isLoadingProducts ? (
        <Loading />
      ) : (
        <Stack direction="column" spacing="5">
          {!shoppingCartItems?.length ? (
            <Text lineHeight="shorter">
              {translate.formatMessage({ id: "shoppingCartItemsNotFound" })}
            </Text>
          ) : (
            <>
              {productsWithPrice?.map(({ product, price }) => (
                <ProductItem
                  key={product?.id}
                  product={product}
                  price={price}
                />
              ))}
            </>
          )}
        </Stack>
      )}

      <ButtonGroup
        width="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={goToStore} variant="link">
          {translate.formatMessage({ id: "goToStore" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={isEmptyShoppingCart}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
