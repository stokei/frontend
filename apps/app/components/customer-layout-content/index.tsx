import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface CustomerLayoutContentProps extends BoxProps {}

export const CustomerLayoutContent: FC<
  PropsWithChildren<CustomerLayoutContentProps>
> = ({ children, ...props }) => {
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
