import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface AppProductLayoutContentProps extends BoxProps {}

export const AppProductLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<AppProductLayoutContentProps>) => {
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
