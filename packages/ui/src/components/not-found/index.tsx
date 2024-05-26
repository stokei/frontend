import { Stack, StackProps } from "../stack";

export interface NotFoundProps extends StackProps { }
export const NotFound = ({ children, ...props }: NotFoundProps) => (
  <Stack
    width="full"
    spacing="2"
    direction="column"
    align="center"
    justify="center"
    paddingY="5"
    {...props}
  >
    {children}
  </Stack>
);
