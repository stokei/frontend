import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface CustomerLayoutContentProps extends BoxProps {}

export const CustomerLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<CustomerLayoutContentProps>) => {
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
