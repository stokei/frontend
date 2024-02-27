import { ListIcon as ChakraListIcon } from "@chakra-ui/react";
import React from "react";
import { Icon, IconProps } from "../icon";

export interface ListIconProps extends IconProps {}
export const ListIcon = ({ children, ...props }: ListIconProps) => {
  return <ChakraListIcon as={() => <Icon marginRight="2" {...props} />} />;
};
