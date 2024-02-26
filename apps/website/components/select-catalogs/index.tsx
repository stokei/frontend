import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Label,
  Select,
  SelectList,
  SelectSearchInput,
  SelectTagItem,
  SelectTagList,
  Tag,
  TagCloseButton,
  TagLabel,
  useDebounce,
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
  readonly onChooseCatalog: (value: SelectCatalogValue) => void;
  readonly onRemoveCatalog: (value: SelectCatalogValue) => void;
}

export const SelectCatalogs = ({
  label,
  catalogs,
  onChooseCatalog,
  onRemoveCatalog,
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
    <FormControl flex="3">
      <Label htmlFor="catalog-select-search-input">
        {label || translate.formatMessage({ id: "catalogs" })}
      </Label>
      <Select
        isLoading={isLoadingGetCatalogs}
        value={catalogs}
        onChooseItem={onChooseCatalog}
        onRemoveChooseItem={onRemoveCatalog}
        marginBottom="2"
      >
        <SelectSearchInput
          id="catalog-select-search-input"
          placeholder={translate.formatMessage({
            id: "title",
          })}
          {...register("searchCatalog")}
        />
        <SelectList>
          {catalogsList?.map((catalog) => (
            <CatalogSelectItem key={catalog.id} catalog={catalog} />
          ))}
        </SelectList>
      </Select>
      {!!catalogs?.length && (
        <SelectTagList>
          {catalogs?.map((catalog) => (
            <SelectTagItem key={catalog.id}>
              <Tag>
                <TagLabel>
                  <CatalogSelectItemContent catalog={catalog} />
                </TagLabel>
                <TagCloseButton onClick={() => onRemoveCatalog(catalog)} />
              </Tag>
            </SelectTagItem>
          ))}
        </SelectTagList>
      )}
    </FormControl>
  );
};
