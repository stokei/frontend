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
  AppCouponFragment,
  useGetAppCouponsQuery,
} from "./graphql/coupons.query.graphql.generated";
import { CouponSelectItem } from "./coupon-select-item";
import { CouponSelectItemContent } from "./coupon-select-item-content";

interface SelectCouponsProps {
  readonly label?: string;
  readonly value?: AppCouponFragment[];
  readonly onChooseCoupon: (value?: AppCouponFragment) => void;
  readonly onRemoveChooseCoupon: (value?: AppCouponFragment) => void;
}

export const SelectCoupons: FC<SelectCouponsProps> = ({
  label,
  value,
  onChooseCoupon,
  onRemoveChooseCoupon,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchCoupon: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const [searchCouponQueryText] = useDebounce(watch("searchCoupon"), 500);

  const [{ data: dataGetCoupons, fetching: isLoadingGetCoupons }] =
    useGetAppCouponsQuery({
      pause: !currentApp && !searchCouponQueryText,
      variables: {
        page: {
          limit: 5,
        },
        orderBy: {
          code: OrderBy.Asc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
            code: {
              search: searchCouponQueryText,
            },
          },
        },
      },
    });

  const coupons = useMemo(
    () => dataGetCoupons?.coupons?.items || [],
    [dataGetCoupons?.coupons?.items]
  );

  const onChooseItem = useCallback(
    (value?: AppCouponFragment) => {
      onChooseCoupon?.(value);
    },
    [onChooseCoupon]
  );
  const onRemoveChooseItem = useCallback(
    (value?: AppCouponFragment) => {
      onRemoveChooseCoupon?.(value);
    },
    [onRemoveChooseCoupon]
  );

  return (
    <FormControl flex="3">
      <Label htmlFor="coupon-select-search-input">
        {label || translate.formatMessage({ id: "coupon" })}
      </Label>
      <Select
        isLoading={isLoadingGetCoupons}
        value={value}
        onChooseItem={onChooseItem}
        onRemoveChooseItem={onRemoveChooseItem}
        marginBottom="2"
      >
        <SelectSearchInput
          id="coupon-select-search-input"
          placeholder={translate.formatMessage({
            id: "search",
          })}
          {...register("searchCoupon")}
        />
        <SelectList>
          {coupons?.map((coupon) => (
            <CouponSelectItem key={coupon.id} coupon={coupon} />
          ))}
        </SelectList>
      </Select>
      {!!value?.length && (
        <SelectTagList>
          {value?.map((currentCoupon) => (
            <SelectTagItem key={currentCoupon.id}>
              <Tag>
                <TagLabel>
                  <CouponSelectItemContent coupon={currentCoupon} />
                </TagLabel>
                <TagCloseButton
                  onClick={() => onRemoveChooseCoupon(currentCoupon)}
                />
              </Tag>
            </SelectTagItem>
          ))}
        </SelectTagList>
      )}
    </FormControl>
  );
};
