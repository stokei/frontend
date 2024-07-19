import { Price, PriceComponentFragment } from "@stokei/builder";
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
