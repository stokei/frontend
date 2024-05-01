import { AddressManagement } from "@/components/address-management";
import { AddressManagementAddressFragment } from "@/components/address-management/graphql/addresses.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack } from "@stokei/ui";

export interface AddressStepProps {
  address?: AddressManagementAddressFragment;
  onChangeAddress: (address: AddressManagementAddressFragment) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const AddressStep = ({
  address,
  onChangeAddress,
  onNextStep,
  onPreviousStep,
}: AddressStepProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <AddressManagement
        title={translate.formatMessage({ id: "billingAddress" })}
        onChooseAddress={onChangeAddress}
        selectedAddress={address}
      />

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!address}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
