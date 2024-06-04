import { useTranslations } from "@/hooks";
import { PageType } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions,
  Text
} from "@stokei/ui";

interface SelectPageTypeProps {
  id: string;
  value: PageType;
  onChange: (value: PageType) => void
}
export const SelectPageType = ({ id, value, onChange }: SelectPageTypeProps) => {
  const translate = useTranslations();
  return (
    <SingleSelect id={id} value={value} onChange={onChange}>
      <SingleSelectButton
        placeholder={translate.formatMessage({ id: 'type' })}
        item={item => <Text>{translate.formatMessage({ id: convertEnumValueToCamelCase(item) })}</Text>}
      />
      <SingleSelectCombobox>
        <SingleSelectOptions>
          <SingleSelectOption value={PageType.Default}>
            <Text>{translate.formatMessage({ id: "default" })}</Text>
          </SingleSelectOption>
          <SingleSelectOption value={PageType.External}>
            <Text>{translate.formatMessage({ id: "external" })}</Text>
          </SingleSelectOption>
        </SingleSelectOptions>
      </SingleSelectCombobox>
    </SingleSelect>
  );
};
