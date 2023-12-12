import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { PriceType } from "@/services/graphql/stokei";
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
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdatePriceMutation } from "../../graphql/update-price.mutation.graphql.generated";

interface UpdatePriceDrawerProps {
  price?: PriceComponentFragment;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const UpdatePriceDrawer: FC<UpdatePriceDrawerProps> = ({
  price,
  isOpenDrawer,
  onSuccess,
  onCloseDrawer,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    amount: z.string().min(1, {
      message: translate.formatMessage({ id: "amountIsRequired" }),
    }),
    fromAmount: z.string(),
    automaticRenew: z.boolean().default(false),
  });

  const [{ fetching: isLoadingCreatePrice }, onUpdatePrice] =
    useUpdatePriceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
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
    amount,
    fromAmount,
    automaticRenew,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdatePrice({
        input: {
          data: {
            automaticRenew,
            fromAmount: fromAmount
              ? translate.formatMoneyToNumber(fromAmount)
              : undefined,
            amount: translate.formatMoneyToNumber(amount),
          },
          where: {
            price: price?.id || "",
          },
        },
      });
      if (!!response?.data?.updatePrice) {
        onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
        onSuccess?.(response?.data?.updatePrice);
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
    if (price) {
      reset({
        automaticRenew: price?.automaticRenew,
        ...(price?.amount && {
          amount: convertAmountToMoney(price?.amount + ""),
        }),
        ...(price?.fromAmount && {
          fromAmount: convertAmountToMoney(price?.fromAmount + ""),
        }),
      });
    }
  }, [convertAmountToMoney, price, reset]);

  useEffect(() => {
    if (!isOpenDrawer) {
      reset();
    }
  }, [isOpenDrawer, reset]);

  const onClose = () => {
    reset();
    onCloseDrawer();
  };

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onClose}>
      <DrawerHeader>
        {translate.formatMessage({ id: "updatePrice" })}
      </DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing="5">
            <Text fontWeight="bold">{price?.nickname || ""}</Text>

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

            {price?.type === PriceType.Recurring && (
              <FormControl isInvalid={!!errors?.automaticRenew}>
                <Stack direction="row" align="center" spacing="5">
                  <Label
                    width="fit-content"
                    margin="0"
                    htmlFor="automaticRenew"
                  >
                    {translate.formatMessage({ id: "automaticRenew" })}
                  </Label>
                  <Switch id="automaticRenew" {...register("automaticRenew")} />
                </Stack>
                <FormErrorMessage>
                  {errors?.automaticRenew?.message}
                </FormErrorMessage>
              </FormControl>
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
