import { Box, BoxProps } from "../box";

export interface StepPanelsProps extends BoxProps {}
export const StepPanels: React.FC<StepPanelsProps> = ({
  children,
  ...props
}) => (
  <Box width="full" flexDirection="column" {...props}>
    {children}
  </Box>
);
