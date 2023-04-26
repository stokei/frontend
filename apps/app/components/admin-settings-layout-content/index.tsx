import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface AdminSettingsLayoutContentProps extends BoxProps {}

export const AdminSettingsLayoutContent: FC<
  PropsWithChildren<AdminSettingsLayoutContentProps>
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
