import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Label,
  MultiSelect,
  MultiSelectButton,
  MultiSelectCombobox,
  MultiSelectOptions,
  MultiSelectSearchInput,
  useDebounce
} from "@stokei/ui";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CatalogSelectItem } from "./catalog-select-item";
import { CatalogSelectItemContent } from "./catalog-select-item-content";
import {
  AppCatalogFragment,
  useGetAppCatalogsQuery,
} from "./graphql/catalogs.query.graphql.generated";

export type SelectCatalogValue = AppCatalogFragment;

interface SelectCatalogsProps {
  readonly label?: string;
  readonly catalogs?: SelectCatalogValue[];
  readonly onChange: (value: SelectCatalogValue) => void;
}

export const SelectCatalogs = ({
  label,
  catalogs,
  onChange,
}: SelectCatalogsProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchCatalog: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const [searchCatalogQueryText] = useDebounce(watch("searchCatalog"), 500);

  const [{ data: dataGetCatalogs, fetching: isLoadingGetCatalogs }] =
    useGetAppCatalogsQuery({
      pause: !currentApp && !searchCatalogQueryText,
      variables: {
        page: {
          limit: 5,
        },
        orderBy: {
          title: OrderBy.Asc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
          OR: [
            {
              title: {
                search: searchCatalogQueryText,
              },
            },
          ],
        },
      },
    });

  const catalogsList = useMemo(
    () => dataGetCatalogs?.catalogs?.items || [],
    [dataGetCatalogs?.catalogs?.items]
  );

  return (
    <FormControl>
      <Label htmlFor="catalog-select-search-input">
        {label || translate.formatMessage({ id: "catalogs" })}
      </Label>
      <MultiSelect
        id="catalog-select-search-input"
        isLoading={isLoadingGetCatalogs}
        value={catalogs}
        onChange={onChange}
        marginBottom="2"
      >
        <MultiSelectButton
          placeholder={label || translate.formatMessage({ id: "catalogs" })}
          item={(catalog) => (
            <CatalogSelectItemContent key={catalog.id} catalog={catalog} />
          )}
        />
        <MultiSelectCombobox>
          <MultiSelectOptions>
            <MultiSelectSearchInput
              {...register('searchCatalog')}
            />
            {catalogsList?.map((catalog) => (
              <CatalogSelectItem key={catalog.id} catalog={catalog} />
            ))}
          </MultiSelectOptions>
        </MultiSelectCombobox>
      </MultiSelect>
    </FormControl>
  );
};
