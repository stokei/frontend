import { useAPIErrors, useTranslations } from "@/hooks";
import { createPagarmeCardToken } from "@/services/pagarme/create-card-token";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  DatePicker,
  DatePickerType,
  DocumentType,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputDocument,
  InputGroup,
  Label,
  Stack,
} from "@stokei/ui";
import { useState } from "react";
import { getOnlyNumbers } from "@stokei/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePaymentMethodManagementCreatePaymentMethodCardMutation } from "../graphql/create-payment-method.mutation.graphql.generated";
import { PaymentMethodManagementPaymentMethodCardFragment } from "../graphql/payment-methods.query.graphql.generated";

interface CreateCreditCardFormProps {
  readonly address?: string;
  readonly onSuccess: (
    paymentMethod: PaymentMethodManagementPaymentMethodCardFragment
  ) => void;
}

export const CreateCreditCardForm = ({
  address,
  onSuccess,
}: CreateCreditCardFormProps) => {
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>(
    DocumentType.Cpf
  );
  const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState(false);
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();

  const [{}, onCreatePaymentMethod] =
    usePaymentMethodManagementCreatePaymentMethodCardMutation();

  const validationSchema = z.object({
    holderName: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    cardNumber: z.string().min(1, {
      message: translate.formatMessage({ id: "required" }),
    }),
    cvv: z
      .string()
      .min(1, { message: translate.formatMessage({ id: "required" }) }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onCreateCreditCardPaymentMethod = async ({
    cardNumber,
    cvv,
    holderName,
  }: z.infer<typeof validationSchema>) => {
    setIsCreatingPaymentMethod(true);
    let cardToken: string | undefined;
    try {
      const expiryMonth = expirationDate
        ? expirationDate?.getMonth() + 1 + ""
        : "";
      const expiryYear = expirationDate
        ? expirationDate?.getFullYear() + ""
        : "";

      const cardTokenResponse = await createPagarmeCardToken({
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
        holderDocument: document,
        holderName,
      });
      cardToken = cardTokenResponse?.token;
    } catch (error: any) {
      const isCardNumberError = error?.message?.match(/number field/i);
      if (isCardNumberError) {
        setError("cardNumber", {
          message: translate.formatMessage({ id: "invalidCardNumber" }),
        });
        onShowAPIError({
          message: "invalidCardNumber",
        });
      } else {
        onShowAPIError({ message: error?.message });
      }
    }
    try {
      if (!cardToken) {
        setIsCreatingPaymentMethod(false);
        return;
      }
      const paymentMethodResponse = await onCreatePaymentMethod({
        input: {
          address: address || "",
          cardHash: cardToken,
        },
      });
      if (!!paymentMethodResponse?.data?.createPaymentMethodCard) {
        onSuccess(paymentMethodResponse.data?.createPaymentMethodCard);
        setIsCreatingPaymentMethod(false);
        return;
      }
      if (!!paymentMethodResponse.error?.graphQLErrors?.length) {
        paymentMethodResponse.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
    setIsCreatingPaymentMethod(false);
  };

  return (
    <Form onSubmit={handleSubmit(onCreateCreditCardPaymentMethod, console.log)}>
      <Stack direction="column" spacing="4">
        <FormControl isInvalid={!!errors?.cardNumber}>
          <Label htmlFor="cardNumber">
            {translate.formatMessage({ id: "cardNumber" })}
          </Label>
          <InputGroup>
            <Input
              id="cardNumber"
              placeholder={translate.formatMessage({
                id: "cardNumberPlaceholder",
              })}
              {...register("cardNumber", {
                onChange(event) {
                  event.target.value = getOnlyNumbers(event.target.value);
                },
              })}
              minLength={13}
              maxLength={19}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.cardNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!expirationDate}>
          <Label htmlFor="expirationDate">
            {translate.formatMessage({ id: "expirationDate" })}
          </Label>
          <InputGroup>
            <DatePicker
              id="expirationDate"
              value={expirationDate}
              minDate={new Date()}
              onChange={setExpirationDate}
              type={DatePickerType.MONTH_YEAR}
            />
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={!!errors?.cvv}>
          <Label htmlFor="cvv">{translate.formatMessage({ id: "cvv" })}</Label>
          <InputGroup>
            <Input
              id="cvv"
              placeholder={translate.formatMessage({
                id: "cvvPlaceholder",
              })}
              {...register("cvv", {
                onChange(event) {
                  event.target.value = getOnlyNumbers(event.target.value);
                },
              })}
              maxLength={4}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.cvv?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.holderName}>
          <Label htmlFor="holderName">
            {translate.formatMessage({ id: "holderName" })}
          </Label>
          <InputGroup>
            <Input
              id="holderName"
              placeholder={translate.formatMessage({
                id: "holderNamePlaceholder",
              })}
              {...register("holderName")}
              maxLength={64}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.holderName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!document}>
          <Label htmlFor="holderDocument">
            {translate.formatMessage({ id: "holderDocument" })}
          </Label>
          <InputDocument
            id="holderDocument"
            document={document}
            documentType={documentType}
            withDocumentTypeDisabled
            documentTypesAllowed={[DocumentType.Cpf]}
            onChangeDocument={setDocument}
            onChangeDocumentType={setDocumentType}
          />
        </FormControl>
        <ButtonGroup justifyContent="flex-end">
          <Button
            type="submit"
            isLoading={isCreatingPaymentMethod}
            isDisabled={!isValid || !document || !expirationDate}
          >
            {translate.formatMessage({ id: "addCard" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
