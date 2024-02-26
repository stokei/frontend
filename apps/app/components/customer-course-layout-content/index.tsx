import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface CustomerCourseLayoutContentProps extends BoxProps {}

export const CustomerCourseLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<CustomerCourseLayoutContentProps>) => {
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
