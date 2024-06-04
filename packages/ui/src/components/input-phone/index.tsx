import { useTranslations } from "../../hooks";
import { FormControl } from "../form-control";
import { Input } from "../input";
import { Label } from "../label";
import { SingleSelect, SingleSelectButton, SingleSelectCombobox, SingleSelectOption, SingleSelectOptions } from "../selects";
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
        <SingleSelect
          id={`${id}-country-code`}
          value={countryCode || countryCodes?.[0]}
          onChange={(value) => onChangeCountryCode(value?.code)}
          isDisabled={withCountryCodeDisabled}
        >
          <SingleSelectButton
            placeholder={translate.formatMessage({ id: "country" })}
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
          <SingleSelectCombobox>
            <SingleSelectOptions>
              {countryCodes?.map((currentCountryCode) => (
                <SingleSelectOption
                  key={currentCountryCode?.country + currentCountryCode?.code}
                  value={currentCountryCode}
                >
                  <Stack direction="row" spacing="2">
                    <Text>{currentCountryCode?.country}</Text>
                    <Text>({currentCountryCode?.code})</Text>
                  </Stack>
                </SingleSelectOption>
              ))}
            </SingleSelectOptions>
          </SingleSelectCombobox>
        </SingleSelect>
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
