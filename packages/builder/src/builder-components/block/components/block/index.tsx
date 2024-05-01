import { Box, BoxProps, Container } from "@stokei/ui";
import { Children, PropsWithChildren } from "react";
import { DropComponentHere } from "../../../../components/drop-component-here";

interface BlockProps extends PropsWithChildren<BoxProps> { }

export const Block = ({ children, ...props }: BlockProps) => {
  return (
    <Container
      paddingY="5"
      as="section"
      width="full"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {Children.count(children) > 0 ? children : <DropComponentHere />}
    </Container>
  );
};
