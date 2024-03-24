import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Box, Button, ButtonGroup, Label, Stack, Text } from "@stokei/ui";
import { useEffect, useMemo, useState } from "react";
import { ChoiseEditable } from "../../components/choice-editable";
import { CreateAccountForm } from "../../components/create-account-form";
import { UpdateAccountForm } from "../../components/update-account-form";

export enum AccountStepUserDataStep {
  SHOW_DATA = "SHOW_DATA",
  UPDATE = "UPDATE",
  CREATE = "CREATE",
}

export interface AccountStepProps {
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const AccountStep = ({
  onNextStep,
  onPreviousStep,
}: AccountStepProps) => {
  const [userDataStep, setUserDataStep] = useState<AccountStepUserDataStep>(
    AccountStepUserDataStep.SHOW_DATA
  );
  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();

  const existsOneAccountData = useMemo(
    () =>
      !!currentAccount?.document ||
      !!currentAccount?.phone ||
      !!currentAccount?.dateBirthday,
    [
      currentAccount?.dateBirthday,
      currentAccount?.document,
      currentAccount?.phone,
    ]
  );
  const isValidData = useMemo(
    () =>
      !!currentAccount?.pagarmeCustomer &&
      !!currentAccount?.document &&
      !!currentAccount?.phone &&
      !!currentAccount?.dateBirthday,
    [
      currentAccount?.dateBirthday,
      currentAccount?.document,
      currentAccount?.pagarmeCustomer,
      currentAccount?.phone,
    ]
  );

  useEffect(() => {
    if (!currentAccount?.pagarmeCustomer) {
      setUserDataStep(AccountStepUserDataStep.CREATE);
    } else if (existsOneAccountData && !isValidData) {
      setUserDataStep(AccountStepUserDataStep.UPDATE);
    } else {
      setUserDataStep(AccountStepUserDataStep.SHOW_DATA);
    }
  }, [currentAccount?.pagarmeCustomer, existsOneAccountData, isValidData]);

  return (
    <Stack direction="column" spacing="5">
      {userDataStep === AccountStepUserDataStep.SHOW_DATA && (
        <ChoiseEditable
          onChange={() => setUserDataStep(AccountStepUserDataStep.UPDATE)}
        >
          <Stack direction="column" spacing="5">
            {currentAccount?.dateBirthday && (
              <Box flexDirection="column">
                <Label>{translate.formatMessage({ id: "dateBirthday" })}</Label>
                <Text>
                  {translate.formatDate(currentAccount?.dateBirthday)}
                </Text>
              </Box>
            )}
            {currentAccount?.phone?.fullnumber && (
              <Box flexDirection="column">
                <Label>{translate.formatMessage({ id: "phone" })}</Label>
                <Text>{currentAccount?.phone?.fullnumber}</Text>
              </Box>
            )}
            {currentAccount?.document && (
              <Box flexDirection="column">
                <Label>{translate.formatMessage({ id: "document" })}</Label>
                <Text>
                  {translate.formatMessage({
                    id: currentAccount?.document?.type?.toLowerCase() as any,
                  })}
                  {" - "}
                  {currentAccount?.document?.document}
                </Text>
              </Box>
            )}
          </Stack>
        </ChoiseEditable>
      )}
      {userDataStep === AccountStepUserDataStep.UPDATE && (
        <UpdateAccountForm
          onSuccess={() => setUserDataStep(AccountStepUserDataStep.SHOW_DATA)}
          onCancel={() => setUserDataStep(AccountStepUserDataStep.SHOW_DATA)}
        />
      )}
      {userDataStep === AccountStepUserDataStep.CREATE && (
        <CreateAccountForm
          onSuccess={() => setUserDataStep(AccountStepUserDataStep.SHOW_DATA)}
        />
      )}

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!isValidData}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
