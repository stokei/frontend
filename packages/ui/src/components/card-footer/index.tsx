import React from "react";
import { BoxProps, Box } from "../box";

export interface CardFooterProps extends BoxProps {}
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <Box width="full" padding="5" {...props}>
      {children}
    </Box>
  );
};
