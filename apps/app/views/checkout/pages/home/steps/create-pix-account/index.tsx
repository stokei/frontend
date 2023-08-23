import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { usePhoneCodes } from "@/hooks/use-phone-codes";
import {
  Button,
  ButtonGroup,
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

export interface CreatePixAccountStepProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const CreatePixAccountStep: React.FC<CreatePixAccountStepProps> = ({
  onNextStep,
  onPreviousStep,
}) => {
  const [cpf, setCPF] = useState("");
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
      !!cpf &&
      !!dateBirthday &&
      !!phoneNumber &&
      !!phoneAreaCode &&
      !!phoneCountryCode,
    [cpf, dateBirthday, phoneAreaCode, phoneCountryCode, phoneNumber]
  );

  const onSubmit = async () => {
    try {
      const response = await onExecuteCreateAccountPagarmeCustomer({
        input: {
          cpf,
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
        return onNextStep();
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
    <Stack direction="column" spacing="5">
      <FormControl>
        <Label htmlFor="input-document">
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
          {translate.formatMessage({ id: "cpf" })}
        </Label>
        <InputDocument
          id="input-document"
          document={cpf}
          documentType={DocumentType.CPF}
          onChangeDocument={setCPF}
          onChangeDocumentType={() => {}}
          withDocumentTypeDisabled
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
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button
          onClick={onSubmit}
          isLoading={isLoadingCreateAccountPagarmeCustomer}
          isDisabled={!isValid}
        >
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
