import { Stack, StackProps } from "../stack";

export interface BadgeGroupProps extends StackProps { }

export const BadgeGroup = ({ children, ...props }: BadgeGroupProps) => (
  <Stack spacing="2" {...props}>{children}</Stack>
);
