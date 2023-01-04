import React from "react";
import { BoxProps, Box } from "../box";

export interface CardBodyProps extends BoxProps {}
export const CardBody: React.FC<CardBodyProps> = ({ children, ...props }) => {
  return (
    <Box width="full" padding="5" flexDir="column" {...props}>
      {children}
    </Box>
  );
};
