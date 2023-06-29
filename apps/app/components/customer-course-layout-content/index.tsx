import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface CustomerCourseLayoutContentProps extends BoxProps {}

export const CustomerCourseLayoutContent: FC<
  PropsWithChildren<CustomerCourseLayoutContentProps>
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
