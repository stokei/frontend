import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface AppSettingsLayoutContentProps extends BoxProps {}

export const AppSettingsLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<AppSettingsLayoutContentProps>) => {
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
