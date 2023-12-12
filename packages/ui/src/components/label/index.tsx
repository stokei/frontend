import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from "@chakra-ui/react";
import { useTranslations } from "../../hooks";
import { Text } from "../text";

export interface LabelProps extends ChakraFormLabelProps {
  readonly isOptional?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  isOptional,
  ...props
}) => {
  const translate = useTranslations();
  return (
    <ChakraFormLabel width="full" fontSize="sm" color="text.500" {...props}>
      {children}
      {isOptional && (
        <Text marginLeft="1" color="text.300">
          ({translate.formatMessage({ id: "optional" })})
        </Text>
      )}
    </ChakraFormLabel>
  );
};
