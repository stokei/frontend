import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Label,
  Stack,
  Switch,
  Text,
  useToast,
} from "@stokei/ui";
import { getOnlyLettersAndNumbers } from "@stokei/utils";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CouponPageCouponFragment } from "../../graphql/coupons.query.graphql.generated";
import { useUpdateCouponMutation } from "../../graphql/update-coupon.mutation.graphql.generated";
import { DiscountType, SelectDiscountType } from "../select-discount-type";

interface EditCouponDrawerProps {
  coupon?: CouponPageCouponFragment;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (coupon?: CouponPageCouponFragment) => void;
}

export const EditCouponDrawer = ({
  coupon,
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}: EditCouponDrawerProps) => {
  const [discountType, setDiscountType] = useState<DiscountType>(
    DiscountType.AMOUNT
  );
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    code: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    amountOff: z.string().optional(),
    percentOff: z.coerce.number().optional(),
    active: z.boolean(),
  });

  const [{ fetching: isLoadingUpdateCoupon }, onExecuteUpdateCoupon] =
    useUpdateCouponMutation();

  const {
    reset,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    clearErrors("amountOff");
    clearErrors("percentOff");
  }, [discountType, clearErrors]);

  const convertAmountToMoney = useCallback(
    (value: string) => {
      const amount = translate.formatMoneyToNumber(value);
      if (isNaN(amount) && amount !== 0) {
        return "";
      }
      const moneyValue = translate.formatMoney({
        amount,
        currency: currentApp?.currency?.id || "",
        minorUnit: currentApp?.currency?.minorUnit,
      });
      return moneyValue;
    },
    [currentApp, translate]
  );

  useEffect(() => {
    if (coupon) {
      if (coupon?.percentOff) {
        setDiscountType(DiscountType.PERCENT);
      } else if (coupon?.amountOff) {
        setDiscountType(DiscountType.AMOUNT);
      }

      reset({
        code: coupon?.code,
        active: !!coupon?.active,
        percentOff: coupon?.percentOff || 0,
        amountOff: coupon?.amountOff
          ? convertAmountToMoney(coupon?.amountOff + "")
          : "",
      });
    }
  }, [convertAmountToMoney, coupon, reset]);

  const onSubmit = async ({
    code,
    active,
    amountOff,
    percentOff,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteUpdateCoupon({
        input: {
          data: {
            code,
            active,
            amountOff:
              amountOff && discountType === DiscountType.AMOUNT
                ? translate.formatMoneyToNumber(amountOff)
                : 0,
            percentOff:
              percentOff && discountType === DiscountType.PERCENT
                ? percentOff
                : 0,
          },
          where: {
            coupon: coupon?.id || "",
          },
        },
      });
      if (!!response?.data?.updateCoupon) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.updateCoupon);
        onCloseDrawer?.();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerHeader>
        {translate.formatMessage({ id: "editCoupon" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.code}>
              <Label htmlFor="code">
                {translate.formatMessage({ id: "code" })}
              </Label>
              <InputGroup>
                <Input
                  id="code"
                  placeholder={translate.formatMessage({
                    id: "couponCodePlaceholder",
                  })}
                  {...register("code", {
                    onChange(event) {
                      event.target.value = getOnlyLettersAndNumbers(
                        event.target.value
                      )?.toUpperCase();
                      return event;
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!discountType}>
              <Label htmlFor="discountType">
                {translate.formatMessage({ id: "discountType" })}
              </Label>
              <SelectDiscountType
                value={discountType}
                onChange={setDiscountType}
              />
            </FormControl>
            {discountType === DiscountType.AMOUNT && (
              <FormControl isInvalid={!!errors?.amountOff}>
                <Label htmlFor="amountOff">
                  {translate.formatMessage({ id: "value" })}
                </Label>
                <InputGroup>
                  <InputLeftAddon paddingX="5">
                    <Text>{currentApp?.currency?.symbol}</Text>
                  </InputLeftAddon>
                  <Input
                    id="amountOff"
                    placeholder="0.00"
                    roundedLeft="none"
                    {...register("amountOff", {
                      onBlur(event) {
                        if (!event.target.value) {
                          setError("amountOff", {
                            type: "required",
                            message: translate.formatMessage({
                              id: "required",
                            }),
                          });
                        }
                      },
                      onChange(event) {
                        event.target.value = convertAmountToMoney(
                          event.target.value
                        );
                        return event;
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.amountOff?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            {discountType === DiscountType.PERCENT && (
              <FormControl isInvalid={!!errors?.percentOff}>
                <Label htmlFor="percentOff">
                  {translate.formatMessage({ id: "percent" })}
                </Label>
                <InputGroup>
                  <InputLeftAddon paddingX="5">
                    <Text>%</Text>
                  </InputLeftAddon>
                  <Input
                    id="percentOff"
                    placeholder="0"
                    roundedLeft="none"
                    type="number"
                    {...register("percentOff", {
                      onBlur(event) {
                        if (!event.target.value) {
                          setError("percentOff", {
                            type: "required",
                            message: translate.formatMessage({
                              id: "required",
                            }),
                          });
                        }
                      },
                      onChange(event) {
                        const valueNumber = event.target.valueAsNumber;
                        if (valueNumber < 0) {
                          event.target.value = "";
                        } else if (valueNumber > 100) {
                          event.target.value = "100";
                        }
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.percentOff?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <FormControl isInvalid={!!errors?.active}>
              <Stack direction="row" align="center" spacing="5">
                <Label width="fit-content" margin="0" htmlFor="active">
                  {translate.formatMessage({ id: "active" })}
                </Label>
                <Switch id="active" {...register("active")} />
              </Stack>
              <FormErrorMessage>{errors?.active?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              isLoading={isLoadingUpdateCoupon}
              isDisabled={!isValid}
            >
              {translate.formatMessage({
                id: "save",
              })}
            </Button>
          </Stack>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
