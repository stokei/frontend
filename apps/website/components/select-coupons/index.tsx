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
import { CouponSelectItem } from "./coupon-select-item";
import { CouponSelectItemContent } from "./coupon-select-item-content";
import {
  AppCouponFragment,
  useGetAppCouponsQuery,
} from "./graphql/coupons.query.graphql.generated";

interface SelectCouponsProps {
  readonly label?: string;
  readonly value?: AppCouponFragment[];
  readonly onChange: (value?: AppCouponFragment) => void;
}

export const SelectCoupons = ({
  label,
  value,
  onChange,
}: SelectCouponsProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    searchCoupon: z.string(),
  });

  const { register, watch } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
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

  return (
    <FormControl>
      <Label htmlFor="coupon-select-search-input">
        {label || translate.formatMessage({ id: "coupon" })}
      </Label>
      <MultiSelect
        id="coupon-select-search-input"
        isLoading={isLoadingGetCoupons}
        value={value}
        onChange={onChange}
        marginBottom="2"
      >
        <MultiSelectButton
          placeholder={label || translate.formatMessage({ id: "coupon" })}
          item={currentCoupon => <CouponSelectItemContent coupon={currentCoupon} />}
        />
        <MultiSelectCombobox>
          <MultiSelectOptions>
            <MultiSelectSearchInput
              {...register('searchCoupon')}
            />
            {coupons?.map((coupon) => (
              <CouponSelectItem key={coupon.id} coupon={coupon} />
            ))}
          </MultiSelectOptions>
        </MultiSelectCombobox>
      </MultiSelect>
    </FormControl>
  );
};
