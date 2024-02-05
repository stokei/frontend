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
  Text,
  useToast,
} from "@stokei/ui";
import { getOnlyLettersAndNumbers } from "@stokei/utils";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CouponPageCouponFragment } from "../../graphql/coupons.query.graphql.generated";
import { useCreateCouponMutation } from "../../graphql/create-coupon.mutation.graphql.generated";
import { DiscountType, SelectDiscountType } from "../select-discount-type";

interface AddCouponDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (coupon?: CouponPageCouponFragment) => void;
}

export const AddCouponDrawer: FC<AddCouponDrawerProps> = ({
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const [discountType, setDiscountType] = useState<DiscountType>(
    DiscountType.AMOUNT
  );
  // const [recipient, setRecipient] = useState<AppAccountFragment>();

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
  });

  const [{ fetching: isLoadingCreateCoupon }, onExecuteCreateCoupon] =
    useCreateCouponMutation();

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

    reset({
      amountOff: undefined,
      percentOff: undefined,
    });
  }, [clearErrors, discountType, reset]);

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

  const onSubmit = async ({
    code,
    amountOff,
    percentOff,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onExecuteCreateCoupon({
        input: {
          code,
          amountOff:
            amountOff && discountType === DiscountType.AMOUNT
              ? translate.formatMoneyToNumber(amountOff)
              : 0,
          percentOff:
            percentOff && discountType === DiscountType.PERCENT
              ? percentOff
              : 0,
          // recipient: recipient?.id,
        },
      });
      if (!!response?.data?.createCoupon) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.createCoupon);
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

  const onClearForm = () => {
    reset();
    setDiscountType(DiscountType.AMOUNT);
  };

  return (
    <Drawer
      isOpen={!!isOpenDrawer}
      onClose={() => {
        onCloseDrawer?.();
        onClearForm();
      }}
    >
      <DrawerHeader>
        {translate.formatMessage({ id: "addCoupon" })}
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
                    onBlur(event) {
                      if (!event.target.value) {
                        setError("code", {
                          type: "required",
                          message: translate.formatMessage({
                            id: "required",
                          }),
                        });
                      } else {
                        clearErrors("code");
                      }
                      return event;
                    },
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
                        } else {
                          clearErrors("amountOff");
                        }
                        return event;
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
                        } else {
                          clearErrors("percentOff");
                        }
                        return event;
                      },
                      onChange(event) {
                        const valueNumber = event.target.valueAsNumber;
                        if (valueNumber < 0) {
                          event.target.value = "";
                        } else if (valueNumber > 100) {
                          event.target.value = "100";
                        }
                        return event;
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.percentOff?.message}
                </FormErrorMessage>
              </FormControl>
            )}

            {/* <SelectMembers
              isOptional
              currentMembers={recipient ? [recipient] : []}
              onChooseCurrentMember={setRecipient}
              onRemoveChooseCurrentMember={setRecipient}
              label={translate.formatMessage({ id: "recipient" })}
            /> */}

            <Button
              type="submit"
              isLoading={isLoadingCreateCoupon}
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
