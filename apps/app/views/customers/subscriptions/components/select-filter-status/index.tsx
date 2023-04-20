import { useTranslations } from "@/hooks";
import { StatusSubscriptionContractFilter } from "@/interfaces/subscription-contract-status-filter";
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
  readonly currentStatus: StatusSubscriptionContractFilter;
  readonly onChooseCurrentStatus: (
    value: StatusSubscriptionContractFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: (
    value: StatusSubscriptionContractFilter
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
          <SelectItem value={StatusSubscriptionContractFilter.All}>
            <StatusSelectItemContent
              status={StatusSubscriptionContractFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={StatusSubscriptionContractFilter.Active}>
            <StatusSelectItemContent
              status={StatusSubscriptionContractFilter.Active}
              content={translate.formatMessage({ id: "active" })}
            />
          </SelectItem>
          <SelectItem value={StatusSubscriptionContractFilter.Pending}>
            <StatusSelectItemContent
              status={StatusSubscriptionContractFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={StatusSubscriptionContractFilter.Canceled}>
            <StatusSelectItemContent
              status={StatusSubscriptionContractFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
