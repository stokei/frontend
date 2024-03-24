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

export interface InputPhoneCountryCode {
  country: string;
  code: string;
}

export interface InputPhoneProps {
  id: string;
  countryCodes: InputPhoneCountryCode[];
  number: string;
  areaCode: string;
  countryCode: string;
  withCountryCodeDisabled?: boolean;
  onChangeNumber: (number: string) => void;
  onChangeAreaCode: (areaCode: string) => void;
  onChangeCountryCode: (countryCode: string) => void;
}

export const InputPhone = ({
  id,
  number,
  areaCode,
  countryCode,
  countryCodes,
  withCountryCodeDisabled,
  onChangeNumber,
  onChangeAreaCode,
  onChangeCountryCode,
  ...props
}: InputPhoneProps) => {
  const translate = useTranslations();

  const getPhoneCode = (countryCodeValue: string) => {
    return countryCodes?.find(
      (currentCountryCode) => currentCountryCode?.code === countryCodeValue
    );
  };

  return (
    <Stack
      direction={["column", "column", "row", "row"]}
      spacing={["5", "5", "2", "2"]}
      {...props}
    >
      <FormControl width={["full", "full", "fit-content", "fit-content"]}>
        <Label htmlFor={`${id}-country-code`}>
          {translate.formatMessage({ id: "country" })}
        </Label>
        <Select
          id={`${id}-country-code`}
          value={countryCode || countryCodes?.[0]}
          onChooseItem={(value) => onChangeCountryCode(value?.code)}
          onRemoveChooseItem={(value) => onChangeCountryCode(value?.code)}
          isDisabled={withCountryCodeDisabled}
        >
          <SelectInput
            id={`${id}-country-code`}
            item={(code) => {
              const countryCodeItem = getPhoneCode(code);
              return (
                <Stack direction="row" spacing="2">
                  <Text>{countryCodeItem?.country}</Text>
                  <Text>({countryCodeItem?.code})</Text>
                </Stack>
              );
            }}
          />
          <SelectList>
            {countryCodes?.map((currentCountryCode) => (
              <SelectItem
                key={currentCountryCode?.country + currentCountryCode?.code}
                value={currentCountryCode}
              >
                <Stack direction="row" spacing="2">
                  <Text>{currentCountryCode?.country}</Text>
                  <Text>({currentCountryCode?.code})</Text>
                </Stack>
              </SelectItem>
            ))}
          </SelectList>
        </Select>
      </FormControl>
      <Stack direction="row" spacing="2">
        <FormControl width="40">
          <Label htmlFor={`${id}-area-code`}>
            {translate.formatMessage({ id: "ddd" })}
          </Label>
          <Input
            id={`${id}-area-code`}
            value={areaCode}
            placeholder="99"
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
    </Stack>
  );
};
