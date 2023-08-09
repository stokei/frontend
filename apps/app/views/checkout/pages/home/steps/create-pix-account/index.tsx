import { useTranslations } from "@/hooks";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  InputPhone,
  RadioCard,
  RadioGroup,
  Stack,
  Text,
} from "@stokei/ui";
import { useMemo, useState } from "react";

export interface CreatePixAccountStepProps {
  phoneNumber: string;
  phoneAreaCode: string;
  phoneCountryCode: string;
  onChangeNumber: (number: string) => void;
  onChangeAreaCode: (areaCode: string) => void;
  onChangeCountryCode: (countryCode: string) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const CreatePixAccountStep: React.FC<CreatePixAccountStepProps> = ({
  phoneNumber,
  phoneAreaCode,
  phoneCountryCode,
  onChangeNumber,
  onChangeAreaCode,
  onChangeCountryCode,
  onNextStep,
  onPreviousStep,
}) => {
  const translate = useTranslations();

  const isValid = useMemo(
    () => !!phoneNumber && !!phoneAreaCode && !!phoneCountryCode,
    [phoneAreaCode, phoneCountryCode, phoneNumber]
  );

  return (
    <Stack direction="column" spacing="10">
      <InputPhone
        id="input-number"
        countryCodeDisabled
        number={phoneNumber}
        areaCode={phoneAreaCode}
        countryCode={phoneCountryCode}
        onChangeNumber={onChangeNumber}
        onChangeAreaCode={onChangeAreaCode}
        onChangeCountryCode={onChangeCountryCode}
      />

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!isValid}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
