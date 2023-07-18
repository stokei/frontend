import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface MeLayoutContentProps extends BoxProps {}

export const MeLayoutContent: FC<PropsWithChildren<MeLayoutContentProps>> = ({
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
