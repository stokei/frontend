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
import { PaymentGatewayItem } from "../payment-gateway-item";

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
    <Box width="full" py={6} px={5} minH="100vh">
      <Container>
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
            {products?.map((product) => {
              const icon =
                product?.parent?.__typename === "Plan" && product?.parent?.icon;
              const features =
                product?.parent?.__typename === "Plan" &&
                product?.parent?.features?.items;
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
            <PaymentGatewayItem />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};
