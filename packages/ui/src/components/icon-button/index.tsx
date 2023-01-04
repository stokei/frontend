import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import { IconName, Icon } from "../icon";

export interface IconButtonProps
  extends Omit<ChakraIconButtonProps, "aria-label"> {
  readonly name: IconName;
}
export const IconButton: React.FC<IconButtonProps> = ({ name, ...props }) => (
  <ChakraIconButton
    colorScheme="primary"
    {...props}
    aria-label={name}
    icon={<Icon name={name} />}
  />
);
