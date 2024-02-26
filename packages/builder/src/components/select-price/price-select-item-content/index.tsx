import { Price } from "../../price";
import { PriceComponentFragment } from "../../price/price.fragment.graphql.generated";
import { Stack } from "@stokei/ui";

interface PriceSelectItemContentProps {
  readonly price?: PriceComponentFragment;
  readonly size?: "md" | "lg";
}

export const PriceSelectItemContent = ({
  price,
  size,
}: PriceSelectItemContentProps) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      <Price price={price} size={size} />
    </Stack>
  );
};
