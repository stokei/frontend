import { Price } from "../../price";
import { PriceComponentFragment } from "../../price/price.fragment.graphql.generated";
import { Stack } from "@stokei/ui";

interface PriceSelectItemContentProps {
  readonly price?: PriceComponentFragment;
}

export const PriceSelectItemContent = ({
  price,
}: PriceSelectItemContentProps) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      <Price price={price} />
    </Stack>
  );
};
