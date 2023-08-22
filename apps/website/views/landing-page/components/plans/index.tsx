import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Box,
  Container,
  Divider,
  Highlight,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { PlanItem } from "../plan-item";
import { useGetLandingPageProductsQuery } from "../../graphql/products.query.graphql.generated";
import { OrderBy } from "@/services/graphql/stokei";
import { PlanItemPaymentWithCard } from "../plan-item-payment-with-card";
import { PlanItemSkeleton } from "../plan-item-skeleton";
import { PlanItemPaymentWithBoleto } from "../plan-item-payment-with-boleto";
import { PlanItemPaymentWithPix } from "../plan-item-payment-with-pix";

const features = [
  { id: "1", description: "1 lorem ipsum" },
  { id: "2", description: "Lorem, ipsum dolor." },
  { id: "3", description: "Monthly Updates" },
];

interface PlansProps {}

export const Plans: FC<PlansProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading, data: dataPlans }] =
    useGetLandingPageProductsQuery({
      pause: !currentApp,
      variables: {
        where: {
          AND: {
            parent: {
              startsWith: "plan_",
            },
            app: {
              equals: currentApp?.id,
            },
          },
        },
        orderBy: {
          name: OrderBy.Asc,
        },
      },
    });

  const products = useMemo(
    () => dataPlans?.products?.items,
    [dataPlans?.products?.items]
  );
  return (
    <Container width="full" paddingY="6" minH="100vh">
      <Stack spacing={4} direction="column">
        <Stack
          p={5}
          alignItems="center"
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            justify="center"
            align="center"
          >
            <Title size="lg" textAlign="center">
              <Highlight
                query={translate.formatMessage({
                  id: "theRightPlansForYourBusinessHighlight",
                })}
              >
                {translate.formatMessage({
                  id: "theRightPlansForYourBusiness",
                })}
              </Highlight>
            </Title>
            <Text textAlign="center">
              {translate.formatMessage({
                id: "withOurPlansYouOnlyPayForWhatYouUse",
              })}
            </Text>
          </Stack>
        </Stack>
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, key) => (
                <PlanItemSkeleton key={key} />
              ))}
            </>
          ) : (
            <>
              {products?.map((product) => {
                const icon =
                  product?.parent?.__typename === "Plan" &&
                  product?.parent?.icon;
                const features = product?.features?.items;
                return (
                  <PlanItem
                    key={product?.id}
                    icon={icon ? (icon as any) : "app"}
                    title={product?.name}
                    features={features || []}
                    price={product?.defaultPrice}
                  />
                );
              })}
              <PlanItemPaymentWithCard />
              <PlanItemPaymentWithBoleto />
              <PlanItemPaymentWithPix />
            </>
          )}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
