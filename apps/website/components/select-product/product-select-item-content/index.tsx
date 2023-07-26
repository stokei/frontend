import { Avatar, Box, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { AppProductFragment } from "../graphql/products.query.graphql.generated";

interface ProductSelectItemContentProps {
  readonly product?: AppProductFragment;
}

export const ProductSelectItemContent: FC<ProductSelectItemContentProps> = ({
  product,
}) => {
  const currentAvatar = useMemo(() => {
    if (product?.avatar?.file?.url) {
      return product?.avatar?.file?.url;
    }
    if (product?.parent?.__typename === "Course") {
      return product?.parent?.avatar?.file?.url || "";
    }
    if (product?.parent?.__typename === "Material") {
      return product?.parent?.avatar?.file?.url || "";
    }
    return;
  }, [product]);

  return (
    <Stack direction="row" spacing="2" align="center">
      <Avatar size="sm" src={currentAvatar} name={product?.name} />
      <Box flexDirection="column">
        <Text fontWeight="bold">{product?.name}</Text>
      </Box>
    </Stack>
  );
};
