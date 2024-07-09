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
import { useFilters, UseFiltersResponse } from "../../hooks/use-filters";

interface SubscriptionContractFiltersProps {
  readonly isOpen: boolean;
  readonly currentFilters: UseFiltersResponse;
  readonly onClose: () => void;
}

export const SubscriptionContractFilters = ({
  isOpen,
  currentFilters,
  onClose,
}: SubscriptionContractFiltersProps) => {
  const translate = useTranslations();
  const newFilters = useFilters(currentFilters);

  const onSubmit = () => {
    currentFilters.setCustomers(newFilters.customers);
    currentFilters.setStatus(newFilters.status);
    currentFilters.setType(newFilters.type);
    onClose();
  };
  const onClean = () => {
    onClose();
    currentFilters.onClearFilters();
    newFilters.onClearFilters();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "filters" })}</DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={newFilters.customers}
            onChange={newFilters.onChangeCustomer}
          />
          <SelectFilterSubscriptionType
            value={newFilters.type}
            onChange={newFilters.setType}
          />
          <SelectFilterStatus
            value={newFilters.status}
            onChange={newFilters.setStatus}
          />
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <ButtonGroup>
          <Button variant="ghost" onClick={onClean}>
            {translate.formatMessage({ id: "clear" })}
          </Button>
          <Button onClick={onSubmit}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>
  );
};
