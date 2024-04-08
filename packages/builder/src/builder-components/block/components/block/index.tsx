import { Box, Container, Text } from "@stokei/ui";
import { Children, PropsWithChildren } from "react";

interface BlockProps extends PropsWithChildren {}

export const Block = ({ children, ...props }: BlockProps) => {
  return (
    <Container>
      <Box
        as="section"
        width="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {Children.count(children) > 0 ? children : <Text>Add component</Text>}
      </Box>
    </Container>
  );
};
