import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface MeLayoutContentProps extends BoxProps {}

export const MeLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<MeLayoutContentProps>) => {
  return (
    <Box
      minHeight="100vh"
      overflowX="hidden"
      flex="1"
      flexDirection="column"
      {...props}
    >
      {children}
    </Box>
  );
};
