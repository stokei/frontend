import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from "@chakra-ui/react";
import { useTranslations } from "../../hooks";

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
      {isOptional ? " " + translate.formatMessage({ id: "optional" }) : ""}
    </ChakraFormLabel>
  );
};
