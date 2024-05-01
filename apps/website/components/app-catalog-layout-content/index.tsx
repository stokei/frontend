import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface AppCatalogLayoutContentProps extends BoxProps {}

export const AppCatalogLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<AppCatalogLayoutContentProps>) => {
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
