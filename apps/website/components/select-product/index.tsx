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
import {
  useGetAppProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { ProductSelectItem } from "./product-select-item";
import { ProductSelectItemContent } from "./product-select-item-content";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface SelectProductsProps {
  readonly label?: string;
  readonly value?: GeneralProductFragment[];
  readonly onChange: (value?: GeneralProductFragment) => void;
}

export const SelectProducts = ({
  label,
  value,
  onChange,
}: SelectProductsProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchProduct: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const [searchProductQueryText] = useDebounce(watch("searchProduct"), 500);

  const [{ data: dataGetProducts, fetching: isLoadingGetProducts }] =
    useGetAppProductsQuery({
      pause: !currentApp && !searchProductQueryText,
      variables: {
        page: {
          limit: 5,
        },
        orderBy: {
          name: OrderBy.Asc,
        },
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
            name: {
              search: searchProductQueryText,
            },
          },
        },
      },
    });

  const products = useMemo(
    () => dataGetProducts?.products?.items || [],
    [dataGetProducts?.products?.items]
  );

  return (
    <FormControl>
      <Label htmlFor="product-select-search-input">
        {label || translate.formatMessage({ id: "product" })}
      </Label>
      <MultiSelect
        id="product-select-search-input"
        isLoading={isLoadingGetProducts}
        value={value}
        onChange={onChange}
      >
        <MultiSelectButton
          placeholder={label || translate.formatMessage({ id: "product" })}
          item={(currentProduct) => (
            <ProductSelectItemContent product={currentProduct} />
          )}
        />
        <MultiSelectCombobox>
          <MultiSelectOptions>
            <MultiSelectSearchInput
              {...register('searchProduct')}
            />
            {products?.map((product) => (
              <ProductSelectItem key={product.id} product={product} />
            ))}
          </MultiSelectOptions>
        </MultiSelectCombobox>
      </MultiSelect>
    </FormControl>
  );
};
