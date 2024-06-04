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

import { SelectFilterStatus } from "../select-filter-status";
import { SelectFilterSubscriptionType } from "../select-filter-subscription-type";

interface SubscriptionContractFiltersProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly currentStatus: SubscriptionContractStatusFilter;
  readonly currentSubscriptionType: SubscriptionContractTypeFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onChooseCurrentSubscriptionType: (
    value?: SubscriptionContractTypeFilter
  ) => void;
  readonly onChooseCurrentStatus: (
    value?: SubscriptionContractStatusFilter
  ) => void;
  readonly onResetCurrentCustomer: () => void;
}

export const SubscriptionContractFilters = ({
  isOpen,
  onClose,
  currentStatus,
  currentSubscriptionType,
  currentCustomers,
  onResetCurrentCustomer,
  onChooseCurrentCustomer,
  onChooseCurrentStatus,
  onChooseCurrentSubscriptionType,
}: SubscriptionContractFiltersProps) => {
  const translate = useTranslations();

  const onClean = () => {
    onChooseCurrentCustomer();
    onChooseCurrentStatus();
    onChooseCurrentSubscriptionType();
    onResetCurrentCustomer();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "filters" })}</DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={currentCustomers}
            onChange={onChooseCurrentCustomer}
          />
          <SelectFilterSubscriptionType
            value={currentSubscriptionType}
            onChange={onChooseCurrentSubscriptionType}
          />
          <SelectFilterStatus
            value={currentStatus}
            onChange={onChooseCurrentStatus}
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
