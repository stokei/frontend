import { Price } from "@/components/price";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { Stack } from "@stokei/ui";
import { FC } from "react";

interface PriceSelectItemContentProps {
  readonly price?: PriceComponentFragment;
  readonly size?: "md" | "lg";
}

export const PriceSelectItemContent: FC<PriceSelectItemContentProps> = ({
  price,
  size,
}) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      <Price price={price} size={size} />
    </Stack>
  );
};
