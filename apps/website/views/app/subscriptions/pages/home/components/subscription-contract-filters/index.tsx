import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
} from "@stokei/ui";
import { FC } from "react";
import { SelectFilterStatus } from "../select-filter-status";
import { SelectFilterSubscriptionType } from "../select-filter-subscription-type";

interface SubscriptionContractFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentStatus: SubscriptionContractStatusFilter;
  readonly currentSubscriptionType: SubscriptionContractTypeFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentSubscriptionType: (
    value?: SubscriptionContractTypeFilter
  ) => void;
  readonly onChooseCurrentSubscriptionType: (
    value: SubscriptionContractTypeFilter
  ) => void;
  readonly onChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: () => void;
  readonly onResetCurrentCustomer: () => void;
}

export const SubscriptionContractFilters: FC<
  SubscriptionContractFiltersProps
> = ({
  isOpen,
  onClose,
  currentStatus,
  currentSubscriptionType,
  currentCustomers,
  onResetCurrentCustomer,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
  onChooseCurrentSubscriptionType,
  onRemoveChooseCurrentSubscriptionType,
}) => {
  const translate = useTranslations();

  const onClean = () => {
    onRemoveChooseCurrentStatus();
    onRemoveChooseCurrentSubscriptionType();
    onResetCurrentCustomer();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addSubscription" })}
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={currentCustomers}
            onChooseCurrentMember={onChooseCurrentCustomer}
            onRemoveChooseCurrentMember={onRemoveChooseCurrentCustomer}
          />
          <SelectFilterSubscriptionType
            currentSubscriptionType={currentSubscriptionType}
            onChooseCurrentSubscriptionType={onChooseCurrentSubscriptionType}
            onRemoveChooseCurrentSubscriptionType={
              onRemoveChooseCurrentSubscriptionType
            }
          />
          <SelectFilterStatus
            currentStatus={currentStatus}
            onChooseCurrentStatus={onChooseCurrentStatus}
            onRemoveChooseCurrentStatus={onRemoveChooseCurrentStatus}
          />
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <ButtonGroup>
          <Button variant="ghost" onClick={onClean}>
            {translate.formatMessage({ id: "clear" })}
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>
  );
};
