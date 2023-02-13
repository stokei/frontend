import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  SimpleGrid,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, memo, useCallback, useMemo } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { useRouter } from "next/router";
import { PlansProductFragment } from "../../graphql/product.fragment.graphql.generated";
import { Features } from "../features";

export interface ProductItemProps {
  readonly product?: PlansProductFragment;
}

export const ProductItem: FC<ProductItemProps> = memo(({ product }) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Box width="full">
            <Title size="md">{product?.name}</Title>
          </Box>
          {!!product?.features?.totalCount && (
            <Box width="full">
              <Features features={product?.features} />
            </Box>
          )}
          <Box width="full">
            {product?.defaultPrice && <Price price={product?.defaultPrice} />}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
});
