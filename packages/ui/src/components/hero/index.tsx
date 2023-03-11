import { Stack, StackProps } from "../stack";

export interface HeroProps extends StackProps {}
export const Hero: React.FC<HeroProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    minHeight={["1", "1", "65vh", "65vh"]}
    direction={["column", "column", "row", "row"]}
    spacing="10"
    align="center"
    {...props}
  >
    {children}
  </Stack>
);
