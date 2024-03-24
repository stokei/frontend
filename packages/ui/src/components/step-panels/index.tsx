import { Box, BoxProps } from "../box";

export interface StepPanelsProps extends BoxProps {}
export const StepPanels = ({ children, ...props }: StepPanelsProps) => (
  <Box width="full" flexDirection="column" {...props}>
    {children}
  </Box>
);
