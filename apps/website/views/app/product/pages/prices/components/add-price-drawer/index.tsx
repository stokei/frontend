import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { RecurringIntervalInput } from "@/components/recurring-interval-input";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import {
  BillingScheme,
  IntervalType,
  InventoryType,
  PriceType,
  TiersMode,
  UsageType,
} from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
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
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions,
  Stack,
  Switch,
  Text,
  useToast
} from "@stokei/ui";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePriceMutation } from "../../graphql/create-price.mutation.graphql.generated";

interface AddPriceDrawerProps {
  productId?: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const AddPriceDrawer = ({
  productId,
  isOpenDrawer,
  onSuccess,
  onCloseDrawer,
}: AddPriceDrawerProps) => {
  const [type, setType] = useState<PriceType>(PriceType.OneTime);
  const [interval, setInterval] = useState<IntervalType>(IntervalType.Month);
  const [intervalCount, setIntervalCount] = useState<string>("");
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
    fromAmount: z.string(),
    automaticRenew: z.boolean().default(false),
  });

  const [{ fetching: isLoadingCreatePrice }, createPrice] =
    useCreatePriceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

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
    fromAmount,
    automaticRenew,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await createPrice({
        input: {
          parent: productId || "",
          nickname: name,
          fromAmount: fromAmount
            ? translate.formatMoneyToNumber(fromAmount)
            : undefined,
          amount: translate.formatMoneyToNumber(amount),
          billingScheme: BillingScheme.PerUnit,
          inventoryType: InventoryType.Infinite,
          tiersMode: TiersMode.Volume,
          automaticRenew,
          type,
          ...(type === PriceType.Recurring && {
            recurring: {
              interval,
              intervalCount: parseInt(intervalCount),
              usageType: UsageType.Licensed,
            },
          }),
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
    } catch (error) { }
  };

  const onClose = () => {
    reset();
    setType(PriceType.OneTime)
    setInterval(IntervalType.Month)
    setIntervalCount("")
    onCloseDrawer();
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
            <FormControl isInvalid={!!errors?.fromAmount}>
              <Label htmlFor="fromAmount" isOptional>
                {translate.formatMessage({ id: "fromAmount" })}
              </Label>
              <InputGroup>
                <InputLeftAddon paddingX="5">
                  <Text>{currentApp?.currency?.symbol}</Text>
                </InputLeftAddon>
                <Input
                  id="fromAmount"
                  placeholder="0.00"
                  roundedLeft="none"
                  {...register("fromAmount", {
                    onChange(event) {
                      event.target.value = convertAmountToMoney(
                        event.target.value
                      );
                      return event;
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.fromAmount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.amount}>
              <Label htmlFor="amount">
                {translate.formatMessage({ id: "toAmount" })}
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

            <FormControl isInvalid={!!errors?.automaticRenew}>
              <Label htmlFor="price-type">
                {translate.formatMessage({ id: "type" })}
              </Label>
              <SingleSelect
                id="price-type"
                value={type}
                onChange={setType}
              >
                <SingleSelectButton
                  placeholder={translate.formatMessage({ id: "type" })}
                  item={(item) => (
                    <Text>
                      {translate.formatMessage({
                        id:
                          item === PriceType.OneTime
                            ? "lifelong"
                            : (convertEnumValueToCamelCase(item) as any),
                      })}
                    </Text>
                  )}
                />
                <SingleSelectCombobox>
                  <SingleSelectOptions>
                    <SingleSelectOption value={PriceType.OneTime}>
                      <Text>{translate.formatMessage({ id: "lifelong" })}</Text>
                    </SingleSelectOption>
                    <SingleSelectOption value={PriceType.Recurring}>
                      <Text>{translate.formatMessage({ id: "recurring" })}</Text>
                    </SingleSelectOption>
                  </SingleSelectOptions>
                </SingleSelectCombobox>
              </SingleSelect>
            </FormControl>

            {type === PriceType.Recurring && (
              <>
                <RecurringIntervalInput
                  interval={interval}
                  intervalCount={intervalCount}
                  onChangeInterval={setInterval}
                  onChangeIntervalCount={setIntervalCount}
                />
                <FormControl isInvalid={!!errors?.automaticRenew}>
                  <Stack direction="row" align="center" spacing="5">
                    <Label
                      width="fit-content"
                      margin="0"
                      htmlFor="automaticRenew"
                    >
                      {translate.formatMessage({ id: "automaticRenew" })}
                    </Label>
                    <Switch
                      id="automaticRenew"
                      {...register("automaticRenew")}
                    />
                  </Stack>
                  <FormErrorMessage>
                    {errors?.automaticRenew?.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              isLoading={isLoadingCreatePrice}
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
