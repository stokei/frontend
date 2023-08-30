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
import { FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AppProductFragment,
  useGetAppProductsQuery,
} from "./graphql/products.query.graphql.generated";
import { ProductSelectItem } from "./product-select-item";
import { ProductSelectItemContent } from "./product-select-item-content";

interface SelectProductsProps {
  readonly label?: string;
  readonly currentProducts?: AppProductFragment[];
  readonly onChooseCurrentProduct: (value?: AppProductFragment) => void;
  readonly onRemoveChooseCurrentProduct: (value?: AppProductFragment) => void;
}

export const SelectProducts: FC<SelectProductsProps> = ({
  label,
  currentProducts,
  onChooseCurrentProduct,
  onRemoveChooseCurrentProduct,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchProduct: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const searchProductQueryText = useDebounce(watch("searchProduct"), 500);

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

  const onChooseItem = useCallback(
    (value?: AppProductFragment) => {
      onChooseCurrentProduct?.(value);
    },
    [onChooseCurrentProduct]
  );
  const onRemoveChooseItem = useCallback(
    (value?: AppProductFragment) => {
      onRemoveChooseCurrentProduct?.(value);
    },
    [onRemoveChooseCurrentProduct]
  );

  return (
    <FormControl flex="3">
      <Label htmlFor="product-select-search-input">
        {label || translate.formatMessage({ id: "product" })}
      </Label>
      <Select
        isLoading={isLoadingGetProducts}
        value={currentProducts}
        onChooseItem={onChooseItem}
        onRemoveChooseItem={onRemoveChooseItem}
        marginBottom="2"
      >
        <SelectSearchInput
          id="product-select-search-input"
          placeholder={translate.formatMessage({
            id: "search",
          })}
          {...register("searchProduct")}
        />
        <SelectList>
          {products?.map((product) => (
            <ProductSelectItem key={product.id} product={product} />
          ))}
        </SelectList>
      </Select>
      {!!currentProducts?.length && (
        <SelectTagList>
          {currentProducts?.map((currentProduct) => (
            <SelectTagItem key={currentProduct.id}>
              <Tag>
                <TagLabel>
                  <ProductSelectItemContent product={currentProduct} />
                </TagLabel>
                <TagCloseButton
                  onClick={() => onRemoveChooseCurrentProduct(currentProduct)}
                />
              </Tag>
            </SelectTagItem>
          ))}
        </SelectTagList>
      )}
    </FormControl>
  );
};
