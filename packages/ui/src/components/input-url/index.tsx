import { forwardRef } from "@chakra-ui/react";
import { Input, InputProps } from "../input";

export interface InputURLProps extends InputProps { }

const maskURL = (value: string): string => {
  try {
    value = value?.trim();
    if (value) {
      return value;
    }
  } catch (error) { }
  return "";
};

export const InputURL = forwardRef(
  ({ onChange, ...props }: InputURLProps, ref) => {
    return (
      <Input
        {...props}
        ref={ref}
        type="url"
        onChange={(e) => {
          e.target.value = maskURL(e.target.value);
          return e;
        }}
      />
    );
  }
);
