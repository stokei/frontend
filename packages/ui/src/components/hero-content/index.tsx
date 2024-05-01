import { Stack, StackProps } from "../stack";

export interface HeroContentProps extends StackProps { }
export const HeroContent = ({ children, ...props }: HeroContentProps) => (
  <Stack
    width="full"
    flex="1"
    direction="column"
    spacing="5"
    justify="center"
    {...props}
  >
    {children}
  </Stack>
);
