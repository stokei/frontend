import { Box, BoxProps } from "../box";

export interface ContainerProps extends BoxProps {}
export const Container = ({ children, ...props }: ContainerProps) => (
  <Box width="full" paddingX="5" flexDirection="column" {...props}>
    {children}
  </Box>
);
