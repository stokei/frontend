import { SelectMembers } from "@/components/select-members";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
import { Card, CardBody, Stack } from "@stokei/ui";

import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { SelectFilterStatus } from "../select-filter-status";

interface InvoiceFiltersProps {
  readonly currentStatus: InvoiceStatusFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChangeCustomer: (value?: AppAccountFragment) => void;
  readonly onChangeStatus: (value: InvoiceStatusFilter) => void;
}

export const InvoiceFilters = ({
  currentStatus,
  currentCustomers,
  onChangeCustomer,
  onChangeStatus,
}: InvoiceFiltersProps) => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction={["column", "column", "row", "row"]} spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={currentCustomers}
            onChange={onChangeCustomer}
          />
          <SelectFilterStatus
            value={currentStatus}
            onChange={onChangeStatus}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};
