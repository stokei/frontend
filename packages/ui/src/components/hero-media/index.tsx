import { Box, BoxProps } from "../box";

export interface HeroMediaProps extends BoxProps {}
export const HeroMedia: React.FC<HeroMediaProps> = ({ children, ...props }) => (
  <Box
    width={["full", "full", "50%", "50%"]}
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
