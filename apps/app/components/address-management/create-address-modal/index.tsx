import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader } from "@stokei/ui";
import { FC } from "react";
import { AddressManagementAddressFragment } from "../graphql/addresses.query.graphql.generated";
import { CreateAddressForm } from "../create-address-form";

interface CreateAddressModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly onSuccess: (address: AddressManagementAddressFragment) => void;
}

export const CreateAddressModal: FC<CreateAddressModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>
        {translate.formatMessage({ id: "addNewAddress" })}
      </ModalHeader>
      <ModalBody>
        <CreateAddressForm onSuccess={onSuccess} />
      </ModalBody>
    </Modal>
  );
};
