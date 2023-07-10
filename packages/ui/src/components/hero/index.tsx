import { Stack, StackProps } from "../stack";

export interface HeroProps extends StackProps {}
export const Hero: React.FC<HeroProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    minHeight={["60vh", "60vh", "70vh", "70vh"]}
    direction={["column", "column", "row", "row"]}
    spacing="10"
    align="center"
    {...props}
  >
    {children}
  </Stack>
);
