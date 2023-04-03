import { Box, BoxProps } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface AdminCourseLayoutContentProps extends BoxProps {}

export const AdminCourseLayoutContent: FC<
  PropsWithChildren<AdminCourseLayoutContentProps>
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
