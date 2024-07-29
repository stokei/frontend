import { Price, useShoppingCart } from "@stokei/builder";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, Container, Stack, Text, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { CheckoutLayout } from "../../layout";
import { SubscriptionRenewPageSubscriptionContractItemFragment, useGetSubscriptionRenewPageSubscriptionContractQuery } from "./graphql/subscription-contract.query.graphql.generated";
import { useCallback, useMemo, useState } from "react";
import { Product } from "./interfaces/product";
import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { convertEnumValueToCamelCase } from "@/utils";

export const SubscriptionRenewPage = () => {
  const [isLoadingRenew, setIsLoadingRenew] = useState(false);
  const { onAddOrUpdateShoppingCartItem, onClearShoppingCart } = useShoppingCart();
  const translate = useTranslations();
  const router = useRouter();

  const subscriptionContractId = router.query?.subscription?.toString() || '';
  const [{ data: dataGetSubscription, fetching: isLoadingSubscription }] = useGetSubscriptionRenewPageSubscriptionContractQuery({
    pause: !subscriptionContractId,
    variables: {
      subscriptionContractId
    }
  });
  const subscriptionContract = useMemo(() => dataGetSubscription?.subscriptionContract, [dataGetSubscription?.subscriptionContract]);

  const getSubscriptionContractItemProduct = useCallback((item: SubscriptionRenewPageSubscriptionContractItemFragment) => {
    const currentProduct = item?.product;
    if (currentProduct?.__typename === "Course") {
      return {
        id: currentProduct?.courseId,
        name: currentProduct?.courseName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      };
    }
    if (currentProduct?.__typename === "Plan") {
      return {
        id: currentProduct?.planId,
        name: currentProduct?.planName,
      };
    }
    if (currentProduct?.__typename === "Material") {
      return {
        id: currentProduct?.materialId,
        name: currentProduct?.materialName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      };
    }
    if (currentProduct?.__typename === "Product") {
      return {
        id: currentProduct?.productId,
        name: currentProduct?.productName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      };
    }
    return;
  }, []);

  const onRenew = useCallback(async () => {
    if (!subscriptionContract?.items?.items?.length) {
      return
    }
    onClearShoppingCart();
    setIsLoadingRenew(true);
    for (const item of subscriptionContract?.items?.items) {
      const product = getSubscriptionContractItemProduct(item);
      if (product) {
        onAddOrUpdateShoppingCartItem({
          product,
          price: item.price
        });
      }
    }
    await router.push(appRoutes.checkout.home);
    setIsLoadingRenew(false)
  }, [getSubscriptionContractItemProduct, onAddOrUpdateShoppingCartItem, onClearShoppingCart, router, subscriptionContract?.items?.items]);

  return (
    <CheckoutLayout isLoading={isLoadingSubscription}>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "584px", "584px"]}
          height="fit-content"
          flexDirection="column"
        >
          <Card background="background.50">
            <CardBody>
              <Stack
                direction="column"
                spacing="5"
              >
                <Title>{translate.formatMessage({ id: 'renewSubscriptionRightNow' })}</Title>

                <Stack
                  direction="column"
                  spacing="5"
                >
                  {subscriptionContract?.items?.items?.map(item => {
                    const product = getSubscriptionContractItemProduct(item);
                    return (
                      <Stack
                        key={product?.id}
                        direction="row"
                        spacing="5"
                        align="center"
                      >
                        <Avatar
                          name={product?.name}
                          src={product?.avatarURL}
                        />
                        <Text fontWeight="bold">{product?.name}</Text>
                      </Stack>
                    )
                  })}
                </Stack>

                <ButtonGroup justifyContent="space-between" alignItems="center">
                  <Button
                    onClick={() => router.push(appRoutes.home)}
                    variant="link"
                  >
                    {translate.formatMessage({ id: 'home' })}
                  </Button>
                  <Button
                    onClick={onRenew}
                  >
                    {translate.formatMessage({ id: 'renew' })}
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
