import { Box, Title } from "@stokei/ui";

export interface HeaderProps {
  readonly productName?: string;
}

export const Header = ({ productName }: HeaderProps) => {
  return (
    <Box width="full" flexDirection="column">
      <Title color="white.500">{productName}</Title>
    </Box>
  );
};
