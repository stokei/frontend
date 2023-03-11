import { Box, Container, SimpleGrid, Stack, Title } from "@stokei/ui";
import { FC, memo } from "react";

import { LandingPageCatalogFragment } from "../../graphql/catalogs.query.graphql.generated";
import { ProductItem } from "../product-item";

export interface CatalogItemProps {
  readonly catalog?: LandingPageCatalogFragment;
}

export const CatalogItem: FC<CatalogItemProps> = memo(({ catalog }) => {
  return (
    <Box flexDirection="column" as="section" paddingY="5">
      <Container>
        <Title size="lg" marginBottom="5">
          {catalog?.title}
        </Title>
      </Container>
      {!!catalog?.items?.items?.length && (
        <Box flexDirection="row" overflowY="hidden">
          <Container
            flexDirection="row"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            paddingLeft="0"
          >
            {catalog?.items?.items?.map(({ product }) => (
              <Box key={product?.id} flexDirection="column" paddingLeft="5">
                <ProductItem
                  id={product?.id}
                  name={product?.name}
                  avatar={product?.avatar?.file?.url || ""}
                  description={product?.description}
                  defaultPrice={product?.defaultPrice}
                  plan={product?.plan}
                  course={product?.course}
                />
              </Box>
            ))}
          </Container>
        </Box>
      )}
    </Box>
  );
});
