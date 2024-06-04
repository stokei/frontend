import { useTranslations } from "@/hooks";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions
} from "@stokei/ui";
import { useMemo } from "react";
import { SubscriptionTypeSelectItemContent } from "../subscription-type-select-item-content";

interface SelectFilterSubscriptionTypeProps {
  readonly value: SubscriptionContractTypeFilter;
  readonly onChange: (
    value: SubscriptionContractTypeFilter
  ) => void;
}

export const SelectFilterSubscriptionType = ({
  value,
  onChange,
}: SelectFilterSubscriptionTypeProps) => {
  const translate = useTranslations();
  const content = useMemo(() => {
    if (value === SubscriptionContractTypeFilter.OneTime) {
      return "lifelong";
    }
    return convertEnumValueToCamelCase(value) || "all";
  }, [value]);

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "type" })}</Label>
      <SingleSelect
        id="type-invoice-filters-select-input"
        value={value}
        onChange={onChange}
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({ id: "type" })}
          item={(type) => (
            <SubscriptionTypeSelectItemContent
              type={type}
              content={translate.formatMessage({
                id: content,
              })}
            />
          )}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            <SingleSelectOption value={SubscriptionContractTypeFilter.All}>
              <SubscriptionTypeSelectItemContent
                type={SubscriptionContractTypeFilter.All}
                content={translate.formatMessage({ id: "all" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={SubscriptionContractTypeFilter.OneTime}>
              <SubscriptionTypeSelectItemContent
                type={SubscriptionContractTypeFilter.OneTime}
                content={translate.formatMessage({ id: "lifelong" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={SubscriptionContractTypeFilter.Recurring}>
              <SubscriptionTypeSelectItemContent
                type={SubscriptionContractTypeFilter.Recurring}
                content={translate.formatMessage({ id: "recurring" })}
              />
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
