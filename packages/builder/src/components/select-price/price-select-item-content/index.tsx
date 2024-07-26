import { Price } from "../../price";
import { PriceComponentFragment } from "../../price/price.fragment.graphql.generated";
import { Box, Stack } from "@stokei/ui";

interface PriceSelectItemContentProps {
  readonly price?: PriceComponentFragment;
}

export const PriceSelectItemContent = ({
  price,
}: PriceSelectItemContentProps) => {
  return (
    <Box width="full" paddingY="2">
      <Price price={price} />
    </Box>
  );
};
