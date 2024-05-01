import { useTranslations } from "@/hooks";
import { PageType } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  Select,
  SelectInput,
  SelectItem,
  SelectList,
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
    <Select id={id} value={value} onChooseItem={onChange} onRemoveChooseItem={onChange}>
      <SelectInput
        item={item => <Text>{translate.formatMessage({ id: convertEnumValueToCamelCase(item) })}</Text>}
      />
      <SelectList>
        <SelectItem value={PageType.Default}>
          <Text>{translate.formatMessage({ id: "default" })}</Text>
        </SelectItem>
        <SelectItem value={PageType.External}>
          <Text>{translate.formatMessage({ id: "external" })}</Text>
        </SelectItem>
      </SelectList>
    </Select>
  );
};
