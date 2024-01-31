import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { usePhoneCodes } from "@/hooks/use-phone-codes";
import {
  Button,
  ButtonGroup,
  DatePicker,
  FormControl,
  Label,
  Stack,
} from "@stokei/ui";
import { useState } from "react";
import { useCreateAccountPagarmeCustomerMutation } from "../../graphql/create-account-pagarme-customer.mutation.graphql.generated";

export interface CouponFormProps {
  onSuccess?: () => void;
}

export const CouponForm: React.FC<CouponFormProps> = ({ onSuccess }) => {
  const [document, setDocument] = useState("");
  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();
  const { phoneCodes } = usePhoneCodes();
  const { onReloadCurrentAccount } = useCurrentAccount();

  const [
    { fetching: isLoadingCreateAccountPagarmeCustomer },
    onExecuteCreateAccountPagarmeCustomer,
  ] = useCreateAccountPagarmeCustomerMutation();

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
  );
};
