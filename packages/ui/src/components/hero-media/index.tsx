import { Box, BoxProps } from "../box";

export interface HeroMediaProps extends BoxProps { }
export const HeroMedia = ({ children, ...props }: HeroMediaProps) => (
  <Box
    flex="1"
    height="full"
    flexDirection="column"
    justify="center"
    align="center"
    rounded="lg"
    overflow="hidden"
    {...props}
  >
    {children}
  </Box>
);
