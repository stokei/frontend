import { Stack, StackProps } from "../stack";

export interface HeroProps extends StackProps {}
export const Hero: React.FC<HeroProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    minHeight={["50vh", "50vh", "65vh", "65vh"]}
    direction={["column", "column", "row", "row"]}
    spacing="10"
    align="center"
    {...props}
  >
    {children}
  </Stack>
);
