import { Stack, StackProps } from "../stack";

export interface StepListProps extends StackProps {}
export const StepList: React.FC<StepListProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    direction={["column", "column", "row", "row"]}
    spacing="2"
    {...props}
  >
    {children}
  </Stack>
);
