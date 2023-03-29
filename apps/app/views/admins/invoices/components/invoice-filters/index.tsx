import { useTranslations } from "@/hooks";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
import { Card, CardBody, Stack } from "@stokei/ui";
import { FC } from "react";
import { AppAccountFragment } from "../../graphql/accounts.query.graphql.generated";
import { SelectFilterCustomers } from "../select-filter-customers";
import { SelectFilterStatus } from "../select-filter-status";

interface InvoiceFiltersProps {
  readonly currentStatus: InvoiceStatusFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onChooseCurrentStatus: (value: InvoiceStatusFilter) => void;
  readonly onRemoveChooseCurrentStatus: (value: InvoiceStatusFilter) => void;
}

export const InvoiceFilters: FC<InvoiceFiltersProps> = ({
  currentStatus,
  currentCustomers,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}) => {
  const translate = useTranslations();

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction={["column", "column", "row", "row"]} spacing="5">
          <SelectFilterCustomers
            currentCustomers={currentCustomers}
            onChooseCurrentCustomer={onChooseCurrentCustomer}
            onRemoveChooseCurrentCustomer={onRemoveChooseCurrentCustomer}
          />
          <SelectFilterStatus
            currentStatus={currentStatus}
            onChooseCurrentStatus={onChooseCurrentStatus}
            onRemoveChooseCurrentStatus={onRemoveChooseCurrentStatus}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};
