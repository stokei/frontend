import { useTranslations } from "@/hooks";
import { PaymentStatusFilter } from "@/interfaces/payment-status-filter";
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

import { StatusSelectItemContent } from "../status-select-item-content";

interface SelectFilterStatusProps {
  readonly value: PaymentStatusFilter;
  readonly onChange: (value: PaymentStatusFilter) => void;
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
            <SingleSelectOption value={PaymentStatusFilter.All}>
              <StatusSelectItemContent
                status={PaymentStatusFilter.All}
                content={translate.formatMessage({ id: "all" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={PaymentStatusFilter.Paid}>
              <StatusSelectItemContent
                status={PaymentStatusFilter.Paid}
                content={translate.formatMessage({ id: "paid" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={PaymentStatusFilter.Pending}>
              <StatusSelectItemContent
                status={PaymentStatusFilter.Pending}
                content={translate.formatMessage({ id: "pending" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={PaymentStatusFilter.PaymentError}>
              <StatusSelectItemContent
                status={PaymentStatusFilter.PaymentError}
                content={translate.formatMessage({ id: "paymentError" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={PaymentStatusFilter.Canceled}>
              <StatusSelectItemContent
                status={PaymentStatusFilter.Canceled}
                content={translate.formatMessage({ id: "canceled" })}
              />
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
