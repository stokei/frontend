import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  FormControl,
  Label,
  Select,
  SelectList,
  SelectSearchInput,
  SelectTagItem,
  SelectTagList,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDebounce,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AppAccountFragment,
  useGetAppAccountsQuery,
} from "../../graphql/accounts.query.graphql.generated";
import { CustomerSelectItem } from "../customer-select-item";

interface SelectFilterCustomersProps {
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentCustomer: (value?: AppAccountFragment) => void;
}

export const SelectFilterCustomers: FC<SelectFilterCustomersProps> = ({
  currentCustomers,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchCustomer: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const searchCustomerQueryText = useDebounce(watch("searchCustomer"), 500);

  const [{ data: dataGetCustomers, fetching: isLoadingGetCustomers }] =
    useGetAppAccountsQuery({
      pause: !currentApp && !searchCustomerQueryText,
      variables: {
        page: {
          limit: 5,
        },
        orderBy: {
          firstname: OrderBy.Asc,
          lastname: OrderBy.Asc,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            firstname: {
              search: searchCustomerQueryText,
            },
            lastname: {
              search: searchCustomerQueryText,
            },
          },
          OR: [
            {
              lastname: {
                search: searchCustomerQueryText,
              },
            },
          ],
        },
      },
    });

  const customers = useMemo(
    () => dataGetCustomers?.accounts?.items || [],
    [dataGetCustomers]
  );

  return (
    <FormControl flex="3">
      <Label htmlFor="customer-invoice-filters-select-search-input">
        {translate.formatMessage({ id: "student" })}
      </Label>
      <Select
        isLoading={isLoadingGetCustomers}
        value={currentCustomers}
        onChooseItem={onChooseCurrentCustomer}
        onRemoveChooseItem={onRemoveChooseCurrentCustomer}
        marginBottom="2"
      >
        <SelectSearchInput
          id="customer-invoice-filters-select-search-input"
          placeholder={translate.formatMessage({
            id: "search",
          })}
          {...register("searchCustomer")}
        />
        <SelectList>
          {customers?.map((customer) => (
            <CustomerSelectItem key={customer.id} customer={customer} />
          ))}
        </SelectList>
      </Select>
      {!!currentCustomers?.length && (
        <SelectTagList>
          {currentCustomers?.map((currentCustomer) => (
            <SelectTagItem key={currentCustomer.id}>
              <Tag>
                <TagLabel>
                  <Stack direction="row" spacing="4" align="center">
                    <Avatar
                      size="xs"
                      src={currentCustomer?.avatar?.file?.url || ""}
                      name={currentCustomer?.fullname}
                    />
                    <Text fontWeight="bold">{currentCustomer?.fullname}</Text>
                  </Stack>
                </TagLabel>
                <TagCloseButton
                  onClick={() => onRemoveChooseCurrentCustomer(currentCustomer)}
                />
              </Tag>
            </SelectTagItem>
          ))}
        </SelectTagList>
      )}
    </FormControl>
  );
};
