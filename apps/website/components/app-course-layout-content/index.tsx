import { Box, BoxProps } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface AppCourseLayoutContentProps extends BoxProps {}

export const AppCourseLayoutContent = ({
  children,
  ...props
}: PropsWithChildren<AppCourseLayoutContentProps>) => {
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
