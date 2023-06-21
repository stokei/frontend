import { useTranslations } from "@/hooks";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
} from "@stokei/ui";
import { FC } from "react";
import { StatusSelectItemContent } from "../status-select-item-content";

interface SelectFilterStatusProps {
  readonly currentStatus: SubscriptionContractStatusFilter;
  readonly onChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
}

export const SelectFilterStatus: FC<SelectFilterStatusProps> = ({
  currentStatus,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}) => {
  const translate = useTranslations();

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "status" })}</Label>
      <Select
        value={currentStatus}
        onChooseItem={onChooseCurrentStatus}
        onRemoveChooseItem={onRemoveChooseCurrentStatus}
      >
        <SelectInput
          id="status-invoice-filters-select-input"
          background="background.50"
          item={(status) => (
            <StatusSelectItemContent
              status={status}
              content={translate.formatMessage({
                id: convertEnumValueToCamelCase(status) || "all",
              })}
            />
          )}
        />
        <SelectList>
          <SelectItem value={SubscriptionContractStatusFilter.All}>
            <StatusSelectItemContent
              status={SubscriptionContractStatusFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={SubscriptionContractStatusFilter.Active}>
            <StatusSelectItemContent
              status={SubscriptionContractStatusFilter.Active}
              content={translate.formatMessage({ id: "active" })}
            />
          </SelectItem>
          <SelectItem value={SubscriptionContractStatusFilter.Pending}>
            <StatusSelectItemContent
              status={SubscriptionContractStatusFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={SubscriptionContractStatusFilter.Canceled}>
            <StatusSelectItemContent
              status={SubscriptionContractStatusFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
