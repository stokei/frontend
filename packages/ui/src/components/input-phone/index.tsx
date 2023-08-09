import { useCallback } from "react";
import { useTranslations } from "../../hooks";
import { Box } from "../box";
import { FormControl } from "../form-control";
import { Input } from "../input";
import { Label } from "../label";
import { Select } from "../select";
import { SelectInput } from "../select-input";
import { SelectItem } from "../select-item";
import { SelectList } from "../select-list";
import { Stack } from "../stack";
import { Text } from "../text";

const onlyNumbers = (value: string) => value?.trim()?.replace(/\D/g, "");

export interface InputPhoneProps {
  id: string;
  number: string;
  areaCode: string;
  countryCode: string;
  countryCodeDisabled?: boolean;
  onChangeNumber: (number: string) => void;
  onChangeAreaCode: (areaCode: string) => void;
  onChangeCountryCode: (countryCode: string) => void;
}

export const InputPhone: React.FC<InputPhoneProps> = ({
  id,
  number,
  areaCode,
  countryCode,
  countryCodeDisabled,
  onChangeNumber,
  onChangeAreaCode,
  onChangeCountryCode,
  ...props
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="row" spacing="2" {...props}>
      <FormControl width="24">
        <Label htmlFor={`${id}-country-code`}>
          {translate.formatMessage({ id: "country" })}
        </Label>
        <Input
          id={`${id}-country-code`}
          value={countryCode}
          placeholder="55"
          maxLength={2}
          onChange={(e) => onChangeCountryCode(onlyNumbers(e.target.value))}
          isDisabled={countryCodeDisabled}
        />
      </FormControl>
      <FormControl width="24">
        <Label htmlFor={`${id}-area-code`}>
          {translate.formatMessage({ id: "ddd" })}
        </Label>
        <Input
          id={`${id}-area-code`}
          value={areaCode}
          placeholder="51"
          maxLength={2}
          onChange={(e) => onChangeAreaCode(onlyNumbers(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <Label htmlFor={`${id}-number`}>
          {translate.formatMessage({ id: "phone" })}
        </Label>
        <Input
          id={`${id}-number`}
          value={number}
          placeholder="999999999"
          maxLength={9}
          onChange={(e) => onChangeNumber(onlyNumbers(e.target.value))}
        />
      </FormControl>
    </Stack>
  );
};
