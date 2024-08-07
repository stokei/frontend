import { SelectMembers } from "@/components/select-members";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { PaymentStatusFilter } from "@/interfaces/payment-status-filter";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
} from "@stokei/ui";
import { useState } from "react";
import { SelectFilterStatus } from "../select-filter-status";
import { addOrRemoveItemFromArray } from "@stokei/utils";

interface PaymentFiltersProps {
  readonly isOpen: boolean;
  readonly currentStatus: PaymentStatusFilter;
  readonly currentPayers?: AppAccountFragment[];
  readonly onClose: () => void;
  readonly onChooseCurrentPayers: (values: AppAccountFragment[]) => void;
  readonly onRemoveCurrentPayers: () => void;
  readonly onChooseCurrentStatus: (value: PaymentStatusFilter) => void;
  readonly onRemoveCurrentStatus: () => void;
}

export const PaymentFilters = ({
  isOpen,
  currentStatus,
  currentPayers,
  onClose,
  onRemoveCurrentPayers,
  onChooseCurrentPayers,
  onChooseCurrentStatus,
  onRemoveCurrentStatus,
}: PaymentFiltersProps) => {
  const [status, setStatus] = useState<PaymentStatusFilter>(currentStatus);
  const [payers, setPayers] = useState<AppAccountFragment[]>(
    currentPayers || []
  );

  const translate = useTranslations();
  const onChoosePayer = (payer?: AppAccountFragment) => {
    if (payer) {
      setPayers((currentPayers) => addOrRemoveItemFromArray(currentPayers, payer, "id"));
    }
  };

  const onSubmit = () => {
    onChooseCurrentStatus(status);
    onChooseCurrentPayers(payers);
    onClose();
  };

  const onClean = () => {
    setStatus(PaymentStatusFilter.All);
    setPayers([]);

    onRemoveCurrentPayers();
    onRemoveCurrentStatus();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader>
        {translate.formatMessage({ id: "addSubscription" })}
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={payers}
            onChange={onChoosePayer}
          />
          <SelectFilterStatus
            value={status}
            onChange={setStatus}
          />
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <ButtonGroup>
          <Button variant="ghost" onClick={onClean}>
            {translate.formatMessage({ id: "clear" })}
          </Button>
          <Button onClick={onSubmit}>
            {translate.formatMessage({ id: "save" })}
          </Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>
  );
};
