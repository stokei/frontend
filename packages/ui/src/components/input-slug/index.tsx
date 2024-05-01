import { forwardRef } from "@chakra-ui/react";
import { Input, InputProps } from "../input";
import { InputGroup } from "../input-group";
import { InputLeftAddon } from "../input-left-addon";
import { InputRightAddon } from "../input-right-addon";
import { Text } from "../text";

export interface InputSlugProps extends InputProps {}

const maskSlug = (value: string): string => {
  try {
    value = value?.trim();
    if (value) {
      value = value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      return value.replace(/[^A-Za-z0-9]/g, "")?.toLowerCase();
    }
  } catch (error) {}
  return "";
};

export const InputSlug = forwardRef(
  ({ onChange, ...props }: InputSlugProps, ref) => {
    return (
      <InputGroup>
        <InputLeftAddon>
          <Text>https://</Text>
        </InputLeftAddon>
        <Input
          {...props}
          rounded="none"
          ref={ref}
          onChange={(e) => {
            e.target.value = maskSlug(e.target.value);
            return e;
          }}
        />
        <InputRightAddon>
          <Text>.stokei.app</Text>
        </InputRightAddon>
      </InputGroup>
    );
  }
);
