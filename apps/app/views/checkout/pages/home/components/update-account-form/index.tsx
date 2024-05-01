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
import { useEffect, useMemo, useState } from "react";
import { useUpdateAccountPagarmeCustomerMutation } from "../../graphql/update-account-pagarme-customer.mutation.graphql.generated";

export interface UpdateAccountFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const UpdateAccountForm = ({
  onCancel,
  onSuccess,
}: UpdateAccountFormProps) => {
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
  const { onReloadCurrentAccount, currentAccount } = useCurrentAccount();

  const [
    { fetching: isLoadingUpdateAccountPagarmeCustomer },
    onExecuteUpdateAccountPagarmeCustomer,
  ] = useUpdateAccountPagarmeCustomerMutation();

  useEffect(() => {
    if (currentAccount) {
      if (currentAccount?.document) {
        setDocument(currentAccount?.document?.document);
        setDocumentType(currentAccount?.document?.type);
      }
      if (currentAccount?.dateBirthday) {
        setDateBirthday(new Date(currentAccount?.dateBirthday));
      }
      if (currentAccount?.phone) {
        setPhoneNumber(currentAccount?.phone?.number);
        setPhoneAreaCode(currentAccount?.phone?.areaCode);
        setPhoneCountryCode(currentAccount?.phone?.countryCode);
      }
    }
  }, [currentAccount]);

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
      const response = await onExecuteUpdateAccountPagarmeCustomer({
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
      if (!!response?.data?.updateAccountPagarmeCustomer) {
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
              maxDate={new Date()}
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
            <Button variant="ghost" onClick={onCancel}>
              {translate.formatMessage({ id: "cancel" })}
            </Button>
            <Button
              onClick={onSubmit}
              isLoading={isLoadingUpdateAccountPagarmeCustomer}
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
