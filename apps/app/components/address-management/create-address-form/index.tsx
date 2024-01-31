import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Stack,
} from "@stokei/ui";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddressManagementAddressFragment } from "../graphql/addresses.query.graphql.generated";
import { useAddressManagementCreateAddressMutation } from "../graphql/create-address.mutation.graphql.generated";

interface CreateAddressFormProps {
  readonly onSuccess: (address: AddressManagementAddressFragment) => void;
}

export const CreateAddressForm: FC<CreateAddressFormProps> = ({
  onSuccess,
}) => {
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isCreatingAddress }, onCreateAddress] =
    useAddressManagementCreateAddressMutation();

  const validationSchema = z.object({
    street: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    number: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    city: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    country: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "required" }) })
      .max(2, { message: translate.formatMessage({ id: "required" }) }),
    state: z
      .string()
      .min(2, { message: translate.formatMessage({ id: "required" }) })
      .max(2, { message: translate.formatMessage({ id: "required" }) }),
    postalCode: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "required" }) }),
    complement: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({
    street,
    number,
    city,
    country,
    state,
    postalCode,
    complement,
  }: z.infer<typeof validationSchema>) => {
    try {
      const addressResponse = await onCreateAddress({
        input: {
          parent: currentAccount?.id || "",
          street,
          number,
          city,
          country,
          state,
          postalCode,
          complement,
        },
      });
      if (!!addressResponse?.data?.createAddress) {
        onSuccess(addressResponse.data?.createAddress);
        return;
      }
      if (!!addressResponse.error?.graphQLErrors?.length) {
        addressResponse.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="4">
        <FormControl isInvalid={!!errors?.postalCode}>
          <Label htmlFor="postalCode">
            {translate.formatMessage({ id: "postalCode" })}
          </Label>
          <InputGroup>
            <Input
              id="postalCode"
              placeholder={translate.formatMessage({
                id: "postalCodePlaceholder",
              })}
              {...register("postalCode")}
              maxLength={16}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.postalCode?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.street}>
          <Label htmlFor="street">
            {translate.formatMessage({ id: "street" })}
          </Label>
          <InputGroup>
            <Input
              id="street"
              placeholder={translate.formatMessage({
                id: "streetPlaceholder",
              })}
              {...register("street")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.street?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.number}>
          <Label htmlFor="number">
            {translate.formatMessage({ id: "number" })}
          </Label>
          <InputGroup>
            <Input
              id="number"
              placeholder={translate.formatMessage({
                id: "numberPlaceholder",
              })}
              {...register("number")}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.number?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.complement}>
          <Label htmlFor="complement" isOptional>
            {translate.formatMessage({ id: "complement" })}
          </Label>
          <InputGroup>
            <Input
              id="complement"
              placeholder={translate.formatMessage({
                id: "complementPlaceholder",
              })}
              {...register("complement")}
              maxLength={128}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.complement?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.country}>
          <Label htmlFor="country">
            {translate.formatMessage({ id: "country" })}
          </Label>
          <InputGroup>
            <Input
              id="country"
              placeholder={translate.formatMessage({
                id: "countryPlaceholder",
              })}
              {...register("country")}
              minLength={2}
              maxLength={2}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.country?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.state}>
          <Label htmlFor="state">
            {translate.formatMessage({ id: "state" })}
          </Label>
          <InputGroup>
            <Input
              id="state"
              placeholder={translate.formatMessage({
                id: "statePlaceholder",
              })}
              {...register("state")}
              minLength={2}
              maxLength={2}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.state?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.city}>
          <Label htmlFor="city">
            {translate.formatMessage({ id: "city" })}
          </Label>
          <InputGroup>
            <Input
              id="city"
              placeholder={translate.formatMessage({
                id: "cityPlaceholder",
              })}
              {...register("city")}
              maxLength={64}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.city?.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={isCreatingAddress}
            isDisabled={!isValid}
          >
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
