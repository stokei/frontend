import { Stack, StackProps } from "../stack";

export interface HeroContentProps extends StackProps {}
export const HeroContent: React.FC<HeroContentProps> = ({
  children,
  ...props
}) => (
  <Stack
    width="auto"
    flex="1"
    direction="column"
    spacing="5"
    justify="center"
    {...props}
  >
    {children}
  </Stack>
);
