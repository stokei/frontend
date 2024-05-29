import { useTranslations } from "@/hooks";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectList,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions
} from "@stokei/ui";

import { StatusSelectItemContent } from "../status-select-item-content";

interface SelectFilterStatusProps {
  readonly value: SubscriptionContractStatusFilter;
  readonly onChange: (
    value: SubscriptionContractStatusFilter
  ) => void;
}

export const SelectFilterStatus = ({
  value,
  onChange,
}: SelectFilterStatusProps) => {
  const translate = useTranslations();

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "status" })}</Label>
      <SingleSelect
        id="status-invoice-filters-select-input"
        value={value}
        onChange={onChange}
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({ id: "status" })}
          item={(status) => (
            <StatusSelectItemContent
              status={status}
              content={translate.formatMessage({
                id: convertEnumValueToCamelCase(status) || "all",
              })}
            />
          )}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            <SingleSelectOption value={SubscriptionContractStatusFilter.All}>
              <StatusSelectItemContent
                status={SubscriptionContractStatusFilter.All}
                content={translate.formatMessage({ id: "all" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={SubscriptionContractStatusFilter.Active}>
              <StatusSelectItemContent
                status={SubscriptionContractStatusFilter.Active}
                content={translate.formatMessage({ id: "active" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={SubscriptionContractStatusFilter.Pending}>
              <StatusSelectItemContent
                status={SubscriptionContractStatusFilter.Pending}
                content={translate.formatMessage({ id: "pending" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={SubscriptionContractStatusFilter.Canceled}>
              <StatusSelectItemContent
                status={SubscriptionContractStatusFilter.Canceled}
                content={translate.formatMessage({ id: "canceled" })}
              />
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl >
  );
};
