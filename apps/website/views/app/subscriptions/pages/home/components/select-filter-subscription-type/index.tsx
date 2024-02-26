import { useTranslations } from "@/hooks";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
} from "@stokei/ui";
import { useMemo } from "react";
import { SubscriptionTypeSelectItemContent } from "../subscription-type-select-item-content";

interface SelectFilterSubscriptionTypeProps {
  readonly currentSubscriptionType: SubscriptionContractTypeFilter;
  readonly onChooseCurrentSubscriptionType: (
    value: SubscriptionContractTypeFilter
  ) => void;
  readonly onRemoveChooseCurrentSubscriptionType: (
    value: SubscriptionContractTypeFilter
  ) => void;
}

export const SelectFilterSubscriptionType: FC<
  SelectFilterSubscriptionTypeProps
> = ({
  currentSubscriptionType,
  onChooseCurrentSubscriptionType,
  onRemoveChooseCurrentSubscriptionType,
}) => {
  const translate = useTranslations();
  const content = useMemo(() => {
    if (currentSubscriptionType === SubscriptionContractTypeFilter.OneTime) {
      return "lifelong";
    }
    return convertEnumValueToCamelCase(currentSubscriptionType) || "all";
  }, [currentSubscriptionType]);

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "type" })}</Label>
      <Select
        value={currentSubscriptionType}
        onChooseItem={onChooseCurrentSubscriptionType}
        onRemoveChooseItem={onRemoveChooseCurrentSubscriptionType}
      >
        <SelectInput
          id="type-invoice-filters-select-input"
          item={(type) => (
            <SubscriptionTypeSelectItemContent
              type={type}
              content={translate.formatMessage({
                id: content,
              })}
            />
          )}
        />
        <SelectList>
          <SelectItem value={SubscriptionContractTypeFilter.All}>
            <SubscriptionTypeSelectItemContent
              type={SubscriptionContractTypeFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={SubscriptionContractTypeFilter.OneTime}>
            <SubscriptionTypeSelectItemContent
              type={SubscriptionContractTypeFilter.OneTime}
              content={translate.formatMessage({ id: "lifelong" })}
            />
          </SelectItem>
          <SelectItem value={SubscriptionContractTypeFilter.Recurring}>
            <SubscriptionTypeSelectItemContent
              type={SubscriptionContractTypeFilter.Recurring}
              content={translate.formatMessage({ id: "recurring" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
