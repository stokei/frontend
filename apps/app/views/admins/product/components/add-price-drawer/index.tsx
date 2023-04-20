import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import {
  BillingScheme,
  IntervalType,
  InventoryType,
  PriceType,
  TiersMode,
  UsageType,
} from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Form,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Stack,
  Text,
  useToast,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePriceMutation } from "../../graphql/create-price.mutation.graphql.generated";

interface AddPriceDrawerProps {
  productId?: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const AddPriceDrawer: FC<AddPriceDrawerProps> = ({
  productId,
  isOpenDrawer,
  onSuccess,
  onCloseDrawer,
}) => {
  const [interval, setInterval] = useState<IntervalType>(IntervalType.Month);
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    amount: z.string().min(1, {
      message: translate.formatMessage({ id: "amountIsRequired" }),
    }),
    intervalCount: z.string().min(1, {
      message: translate.formatMessage({ id: "intervalCountIsRequired" }),
    }),
  });

  const [{ fetching: isLoadingCreatePrice }, createPrice] =
    useCreatePriceMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const intervalCountValue = watch("intervalCount");
  const isPluralIntervalCount = useMemo(
    () => intervalCountValue && intervalCountValue !== "1",
    [intervalCountValue]
  );

  const justNumbers = useCallback((value: string) => {
    if (!value) {
      return 0;
    }
    const valueWithoutNumbers = (value + "")?.trim()?.replace(/\D/g, "");
    return valueWithoutNumbers ? parseInt(valueWithoutNumbers) : 0;
  }, []);

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
    name,
    amount,
    intervalCount,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createPrice({
        input: {
          parent: productId || "",
          nickname: name,
          amount: translate.formatMoneyToNumber(amount),
          recurring: {
            interval,
            intervalCount: parseInt(intervalCount),
            usageType: UsageType.Licensed,
          },
          billingScheme: BillingScheme.PerUnit,
          inventoryType: InventoryType.Infinite,
          tiersMode: TiersMode.Volume,
          type: PriceType.Recurring,
        },
      });
      if (!!response?.data?.createPrice) {
        onShowToast({
          title: translate.formatMessage({ id: "priceCreatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.createPrice);
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
    }
  }, [isOpenDrawer, reset]);

  const onClose = () => {
    reset();
    onCloseDrawer();
  };

  const onChangeIntervalCount = (event: any) => {
    const value = justNumbers(event.target.value);
    event.target.value = value || "";
    return event;
  };

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onClose}>
      <DrawerHeader>{translate.formatMessage({ id: "addPrice" })}</DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <FormControl isInvalid={!!errors?.name}>
              <Label htmlFor="name">
                {translate.formatMessage({ id: "name" })}
              </Label>
              <InputGroup>
                <Input
                  id="name"
                  type="name"
                  placeholder={translate.formatMessage({
                    id: "namePlaceholder",
                  })}
                  {...register("name")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.amount}>
              <Label htmlFor="amount">
                {translate.formatMessage({ id: "price" })}
              </Label>
              <InputGroup>
                <InputLeftAddon paddingX="5">
                  <Text>{currentApp?.currency?.symbol}</Text>
                </InputLeftAddon>
                <Input
                  id="amount"
                  placeholder="0.00"
                  roundedLeft="none"
                  {...register("amount", {
                    onChange(event) {
                      event.target.value = convertAmountToMoney(
                        event.target.value
                      );
                      return event;
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.intervalCount}>
              <Stack direction="row" spacing="5" align="flex-end">
                <Stack direction="column" spacing="0">
                  <Label htmlFor="intervalCount">
                    {translate.formatMessage({ id: "period" })}
                  </Label>
                  <InputGroup>
                    <Input
                      id="intervalCount"
                      type="tel"
                      placeholder={translate.formatMessage({ id: "period" })}
                      {...register("intervalCount", {
                        onChange: onChangeIntervalCount,
                      })}
                    />
                  </InputGroup>
                </Stack>
                <Select
                  value={interval}
                  onChooseItem={setInterval}
                  onRemoveChooseItem={setInterval}
                >
                  <SelectInput
                    id="price-interval"
                    item={(currentInterval) => (
                      <Text>
                        {translate.formatMessage({
                          id: (isPluralIntervalCount
                            ? `${currentInterval}s`
                            : currentInterval
                          )?.toLowerCase() as any,
                        })}
                      </Text>
                    )}
                  />
                  <SelectList>
                    <SelectItem value={IntervalType.Day}>
                      <Text>
                        {translate.formatMessage({
                          id: isPluralIntervalCount ? "days" : "day",
                        })}
                      </Text>
                    </SelectItem>
                    <SelectItem value={IntervalType.Week}>
                      <Text>
                        {translate.formatMessage({
                          id: isPluralIntervalCount ? "weeks" : "week",
                        })}
                      </Text>
                    </SelectItem>
                    <SelectItem value={IntervalType.Month}>
                      <Text>
                        {translate.formatMessage({
                          id: isPluralIntervalCount ? "months" : "month",
                        })}
                      </Text>
                    </SelectItem>
                    <SelectItem value={IntervalType.Year}>
                      <Text>
                        {translate.formatMessage({
                          id: isPluralIntervalCount ? "years" : "year",
                        })}
                      </Text>
                    </SelectItem>
                  </SelectList>
                </Select>
              </Stack>
              <FormErrorMessage>
                {errors?.intervalCount?.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit" isLoading={isLoadingCreatePrice}>
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
