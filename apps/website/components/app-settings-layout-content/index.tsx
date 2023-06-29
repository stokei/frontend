import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface AppSettingsLayoutContentProps extends BoxProps {}

export const AppSettingsLayoutContent: FC<
  PropsWithChildren<AppSettingsLayoutContentProps>
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
