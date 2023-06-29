import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface AppLayoutContentProps extends BoxProps {}

export const AppLayoutContent: FC<PropsWithChildren<AppLayoutContentProps>> = ({
  children,
  ...props
}) => {
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
