import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface AppLayoutContentProps extends BoxProps {}

export const AppLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<AppLayoutContentProps>) => {
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
