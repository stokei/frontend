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
import { FC } from "react";
import { useFilters } from "../../hooks/use-filters";
import { SelectFilterStatus } from "../select-filter-status";
import { SelectCoupons } from "@/components/select-coupons";
import { AppCouponFragment } from "@/components/select-coupons/graphql/coupons.query.graphql.generated";

interface OrderFiltersProps {
  readonly isOpen: boolean;
  readonly statusFilter: OrderStatusFilter;
  readonly customersFilter?: AppAccountFragment[];
  readonly onClose: () => void;
  readonly onChooseFilterCustomers: (values: AppAccountFragment[]) => void;
  readonly onChooseFilterCoupons: (values: AppCouponFragment[]) => void;
  readonly onChooseFilterStatus: (value: OrderStatusFilter) => void;
  readonly onClearFilters: () => void;
}

export const OrderFilters: FC<OrderFiltersProps> = ({
  isOpen,
  statusFilter,
  customersFilter,
  onClose,
  onClearFilters,
  onChooseFilterCustomers,
  onChooseFilterCoupons,
  onChooseFilterStatus,
}) => {
  const {
    status,
    coupons,
    customers,
    setStatus,
    onChooseCustomer,
    onRemoveChooseCustomer,
    onChooseCoupon,
    onRemoveChooseCoupon,
    onClearFilters: onClearCurrentFilters,
  } = useFilters({
    customers: customersFilter,
    status: statusFilter,
  });

  const translate = useTranslations();

  const onSubmit = () => {
    onChooseFilterCoupons(coupons);
    onChooseFilterStatus(status);
    onChooseFilterCustomers(customers);
    onClose();
  };

  const onClean = () => {
    onClearCurrentFilters();
    onClearFilters();
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
          <SelectCoupons
            value={coupons}
            onChooseCoupon={onChooseCoupon}
            onRemoveChooseCoupon={onRemoveChooseCoupon}
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
