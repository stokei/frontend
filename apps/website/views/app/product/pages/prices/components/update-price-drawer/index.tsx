import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
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
  useToast
} from "@stokei/ui";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdatePriceMutation } from "../../graphql/update-price.mutation.graphql.generated";

interface UpdatePriceDrawerProps {
  price?: PriceComponentFragment;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (price: PriceComponentFragment) => void;
}

export const UpdatePriceDrawer = ({
  price,
  isOpenDrawer,
  onSuccess,
  onCloseDrawer,
}: UpdatePriceDrawerProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const validationSchema = z.object({
    amount: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    nickname: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    fromAmount: z.string().optional(),
    automaticRenew: z.boolean().default(false),
  });

  const [{ fetching: isLoadingCreatePrice }, onUpdatePrice] =
    useUpdatePriceMutation();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (price) {
      setValue("nickname", price.nickname || "");
      setValue("automaticRenew", price.automaticRenew);
      setValue("amount", convertAmountToMoney(price?.amount + ""));
      setValue("fromAmount", convertAmountToMoney(price?.fromAmount + ""));
    }
  }, [convertAmountToMoney, price, setValue]);

  const onSubmit = async ({
    nickname,
    amount,
    fromAmount,
    automaticRenew,
  }: z.infer<typeof validationSchema>) => {
    try {
      const response = await onUpdatePrice({
        input: {
          data: {
            nickname,
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
    } catch (error) { }
  };

  const onClose = () => {
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
            <FormControl isInvalid={!!errors?.nickname}>
              <Label htmlFor="nickname">
                {translate.formatMessage({ id: "name" })}
              </Label>
              <InputGroup>
                <Input
                  id="nickname"
                  placeholder={translate.formatMessage({
                    id: "namePlaceholder",
                  })}
                  {...register("nickname")}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.nickname?.message}</FormErrorMessage>
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
