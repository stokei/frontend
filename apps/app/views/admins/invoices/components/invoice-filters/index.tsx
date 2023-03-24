import { useTranslations } from "@/hooks";
import { InvoiceStatus } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  Card,
  CardBody,
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  SelectSearchInput,
  Stack,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  Text,
} from "@stokei/ui";
import { FC } from "react";
import { CustomerSelectItem } from "../customer-select-item";

export enum StatusInvoiceFilter {
  All = "ALL",
  Canceled = "CANCELED",
  Paid = "PAID",
  PaymentError = "PAYMENT_ERROR",
  Pending = "PENDING",
}

export interface CustomerInvoiceFilter {
  id: string;
  name: string;
  avatarURL: string;
}

interface InvoiceFiltersProps {
  readonly currentCustomer?: CustomerInvoiceFilter;
  readonly currentStatus: StatusInvoiceFilter;
  readonly onChooseCurrentCustomer: (value?: CustomerInvoiceFilter) => void;
  readonly onRemoveChooseCurrentCustomer: (
    value?: CustomerInvoiceFilter
  ) => void;
  readonly onChooseCurrentStatus: (value: StatusInvoiceFilter) => void;
  readonly onRemoveChooseCurrentStatus: (value: StatusInvoiceFilter) => void;
}

export const InvoiceFilters: FC<InvoiceFiltersProps> = ({
  currentCustomer,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
  currentStatus,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}) => {
  const translate = useTranslations();
  return (
    <Card background="background.50" marginBottom="5">
      <CardBody>
        <Stack direction="row" spacing="5">
          <FormControl flex="3">
            <Label>{translate.formatMessage({ id: "student" })}</Label>
            <Select
              value={currentCustomer}
              onChooseItem={onChooseCurrentCustomer}
              onRemoveChooseItem={onRemoveChooseCurrentCustomer}
            >
              <SelectSearchInput id="customer-invoice-filters-select-search-input" />
              <SelectList>
                {currentCustomer && (
                  <CustomerSelectItem
                    customerId={currentCustomer?.id}
                    name={currentCustomer?.name}
                    avatarURL={currentCustomer?.avatarURL}
                  />
                )}
              </SelectList>
            </Select>
          </FormControl>
          <FormControl flex="1">
            <Label>{translate.formatMessage({ id: "status" })}</Label>
            <Select
              value={currentStatus}
              onChooseItem={onChooseCurrentStatus}
              onRemoveChooseItem={onRemoveChooseCurrentStatus}
            >
              <SelectInput
                id="status-invoice-filters-select-input"
                item={(status) => (
                  <Text>
                    {translate.formatMessage({
                      id: convertEnumValueToCamelCase(status) || "all",
                    })}
                  </Text>
                )}
              />
              <SelectList>
                <SelectItem value={StatusInvoiceFilter.All}>
                  <Text>{translate.formatMessage({ id: "all" })}</Text>
                </SelectItem>
                <SelectItem value={StatusInvoiceFilter.Paid}>
                  <Text>{translate.formatMessage({ id: "paid" })}</Text>
                </SelectItem>
                <SelectItem value={StatusInvoiceFilter.Pending}>
                  <Text>{translate.formatMessage({ id: "pending" })}</Text>
                </SelectItem>
                <SelectItem value={StatusInvoiceFilter.Canceled}>
                  <Text>{translate.formatMessage({ id: "canceled" })}</Text>
                </SelectItem>
                <SelectItem value={StatusInvoiceFilter.PaymentError}>
                  <Text>{translate.formatMessage({ id: "paymentError" })}</Text>
                </SelectItem>
              </SelectList>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
};
