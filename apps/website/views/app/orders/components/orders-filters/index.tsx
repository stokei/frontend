import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
} from "@stokei/ui";
import { FC, useState } from "react";
import { SelectFilterStatus } from "../select-filter-status";

interface OrderFiltersProps {
  readonly isOpen: boolean;
  readonly currentStatus: OrderStatusFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onClose: () => void;
  readonly onChooseCurrentCustomers: (values: AppAccountFragment[]) => void;
  readonly onRemoveCurrentCustomers: () => void;
  readonly onChooseCurrentStatus: (value: OrderStatusFilter) => void;
  readonly onRemoveCurrentStatus: () => void;
}

export const OrderFilters: FC<OrderFiltersProps> = ({
  isOpen,
  currentStatus,
  currentCustomers,
  onClose,
  onRemoveCurrentCustomers,
  onChooseCurrentCustomers,
  onChooseCurrentStatus,
  onRemoveCurrentStatus,
}) => {
  const [status, setStatus] = useState<OrderStatusFilter>(currentStatus);
  const [customers, setCustomers] = useState<AppAccountFragment[]>(
    currentCustomers || []
  );

  const translate = useTranslations();
  const onChooseCustomer = (customer?: AppAccountFragment) => {
    if (customer) {
      setCustomers((currentCustomers) => [...currentCustomers, customer]);
    }
  };
  const onRemoveChooseCustomer = (customerRemoved?: AppAccountFragment) => {
    if (customerRemoved) {
      setCustomers((currentCustomers) =>
        currentCustomers?.filter(
          (customer) => customer?.id !== customerRemoved?.id
        )
      );
    }
  };

  const onSubmit = () => {
    onChooseCurrentStatus(status);
    onChooseCurrentCustomers(customers);
    onClose();
  };

  const onClean = () => {
    setStatus(OrderStatusFilter.All);
    setCustomers([]);

    onRemoveCurrentCustomers();
    onRemoveCurrentStatus();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "filters" })}</DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={customers}
            label={translate.formatMessage({ id: "customer" })}
            onChooseCurrentMember={onChooseCustomer}
            onRemoveChooseCurrentMember={onRemoveChooseCustomer}
          />
          <SelectFilterStatus
            status={status}
            onChooseStatus={setStatus}
            onRemoveChooseStatus={setStatus}
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
