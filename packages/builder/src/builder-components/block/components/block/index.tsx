import { Box, Container } from "@stokei/ui";
import { Children, PropsWithChildren } from "react";
import { DropComponentHere } from "../../../../components/drop-component-here";

interface BlockProps extends PropsWithChildren {}

export const Block = ({ children, ...props }: BlockProps) => {
  return (
    <Container paddingY="5">
      <Box
        as="section"
        width="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {Children.count(children) > 0 ? children : <DropComponentHere />}
      </Box>
    </Container>
  );
};
