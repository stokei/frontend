import { Box, BoxProps } from "../box";

export interface ContainerProps extends BoxProps {}
export const Container: React.FC<ContainerProps> = ({ children, ...props }) => (
  <Box width="full" paddingX="5" flexDirection="column" {...props}>
    {children}
  </Box>
);
