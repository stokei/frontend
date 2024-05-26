import { Price } from "@/components/price";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { Stack } from "@stokei/ui";

interface PriceSelectItemContentProps {
  readonly price?: PriceComponentFragment;
}

export const PriceSelectItemContent = ({
  price,
}: PriceSelectItemContentProps) => {
  return (
    <Stack
      width="fit-content"
      direction="row"
      spacing="2"
      align="center"
      flexWrap="wrap"
    >
      <Price price={price} />
    </Stack>
  );
};
