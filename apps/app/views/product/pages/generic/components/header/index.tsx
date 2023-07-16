import { Box, Title } from "@stokei/ui";
import { FC } from "react";

export interface HeaderProps {
  readonly productName?: string;
}

export const Header: FC<HeaderProps> = ({ productName }) => {
  return (
    <Box width="full" flexDirection="column">
      <Title color="white.500">{productName}</Title>
    </Box>
  );
};
