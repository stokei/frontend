import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { usePhoneCodes } from "@/hooks/use-phone-codes";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  DatePicker,
  DocumentType,
  FormControl,
  InputDocument,
  InputPhone,
  Label,
  Stack,
} from "@stokei/ui";
import { useMemo, useState } from "react";
import { useCreateAccountPagarmeCustomerMutation } from "../../graphql/create-account-pagarme-customer.mutation.graphql.generated";

export interface CreateAccountFormProps {
  onSuccess?: () => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSuccess,
}) => {
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>(
    DocumentType.Cpf
  );
  const [dateBirthday, setDateBirthday] = useState<Date>(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneAreaCode, setPhoneAreaCode] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("55");
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();
  const { phoneCodes } = usePhoneCodes();
  const { onReloadCurrentAccount } = useCurrentAccount();

  const [
    { fetching: isLoadingCreateAccountPagarmeCustomer },
    onExecuteCreateAccountPagarmeCustomer,
  ] = useCreateAccountPagarmeCustomerMutation();

  const isValid = useMemo(
    () =>
      !!document &&
      !!dateBirthday &&
      !!phoneNumber &&
      !!phoneAreaCode &&
      !!phoneCountryCode,
    [document, dateBirthday, phoneAreaCode, phoneCountryCode, phoneNumber]
  );

  const onSubmit = async () => {
    try {
      const response = await onExecuteCreateAccountPagarmeCustomer({
        input: {
          document: {
            document,
            type: documentType,
          },
          dateBirthday: dateBirthday?.toISOString(),
          phone: {
            areaCode: phoneAreaCode,
            countryCode: phoneCountryCode,
            number: phoneNumber,
          },
        },
      });
      if (!!response?.data?.createAccountPagarmeCustomer) {
        await onReloadCurrentAccount();
        return onSuccess?.();
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({ message: "somethingWentWrong" });
    }
  };

  return (
    <Card>
      <CardBody>
        <Stack direction="column" spacing="5">
          <FormControl>
            <Label htmlFor="input-date-birthday">
              {translate.formatMessage({ id: "dateBirthday" })}
            </Label>
            <DatePicker
              id="input-date-birthday"
              value={dateBirthday}
              onChange={setDateBirthday}
            />
          </FormControl>

          <FormControl>
            <Label htmlFor="input-document">
              {translate.formatMessage({ id: "document" })}
            </Label>
            <InputDocument
              id="input-document"
              document={document}
              documentType={documentType}
              onChangeDocument={setDocument}
              onChangeDocumentType={setDocumentType}
            />
          </FormControl>

          <InputPhone
            id="input-phone"
            countryCodes={phoneCodes}
            number={phoneNumber}
            areaCode={phoneAreaCode}
            countryCode={phoneCountryCode}
            onChangeNumber={setPhoneNumber}
            onChangeAreaCode={setPhoneAreaCode}
            onChangeCountryCode={setPhoneCountryCode}
          />

          <ButtonGroup width="full" justifyContent="space-between">
            <Button
              onClick={onSubmit}
              isLoading={isLoadingCreateAccountPagarmeCustomer}
              isDisabled={!isValid}
            >
              {translate.formatMessage({ id: "save" })}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
