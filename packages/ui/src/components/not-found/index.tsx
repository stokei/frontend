import { Stack, StackProps } from "../stack";

export interface NotFoundProps extends StackProps {}
export const NotFound: React.FC<NotFoundProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    spacing="2"
    direction="column"
    align="center"
    justify="center"
    {...props}
  >
    {children}
  </Stack>
);
