import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { Avatar, Box, Stack, Text } from "@stokei/ui";

interface ProductSelectItemContentProps {
  readonly product?: GeneralProductFragment;
}

export const ProductSelectItemContent = ({
  product,
}: ProductSelectItemContentProps) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      <Avatar
        size="sm"
        src={product?.avatar?.file?.url || ""}
        name={product?.name}
      />
      <Box flexDirection="column">
        <Text fontWeight="bold">{product?.name}</Text>
      </Box>
    </Stack>
  );
};
