import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface AppProductLayoutContentProps extends BoxProps {}

export const AppProductLayoutContent: FC<
  PropsWithChildren<AppProductLayoutContentProps>
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
