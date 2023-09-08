import { Stack, StackProps } from "../stack";

export interface HeroProps extends StackProps {}
export const Hero: React.FC<HeroProps> = ({ children, ...props }) => (
  <Stack
    width="full"
    paddingY={["20", "20", "24", "24"]}
    minHeight={["60vh", "60vh", "70vh", "70vh"]}
    direction={["column", "column", "row", "row"]}
    spacing="14"
    align="center"
    justify="space-between"
    {...props}
  >
    {children}
  </Stack>
);
