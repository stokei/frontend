import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Box } from "../box";
import { Label } from "../label";
import { Description } from "../description";

export interface TextareaProps extends ChakraTextareaProps {
  readonly label?: string;
  readonly labelDescription?: string;
  readonly helperMessage?: string | ReactNode;
  readonly errorMessage?: string | ReactNode;
  readonly successMessage?: string | ReactNode;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  labelDescription,
  helperMessage,
  errorMessage,
  successMessage,
  ...props
}) => (
  <Box flexDir="column">
    {label && <Label marginBottom={labelDescription ? 0 : "2"}>{label}</Label>}
    {labelDescription && (
      <Description marginBottom="2">{labelDescription}</Description>
    )}
    <ChakraTextarea
      colorScheme="primary"
      {...props}
      focusBorderColor="primary.500"
      errorBorderColor="error.500"
      resize="vertical"
    />

    {helperMessage && typeof helperMessage === "string" ? (
      <Description paddingY="1">{helperMessage}</Description>
    ) : (
      helperMessage
    )}

    {!successMessage ? (
      <>
        {errorMessage && typeof errorMessage === "string" ? (
          <Description color="error.500">{errorMessage}</Description>
        ) : (
          errorMessage
        )}
      </>
    ) : (
      <>
        {successMessage && typeof successMessage === "string" ? (
          <Description color="success.500">{successMessage}</Description>
        ) : (
          successMessage
        )}
      </>
    )}
  </Box>
);
