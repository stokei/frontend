import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader } from "@stokei/ui";

import { PaymentMethodComponentFragment } from "@/components/payment-method/graphql/payment-method.fragment.graphql.generated";
import { CreateCreditCardForm } from "../create-credit-card-form";

interface CreateCreditCardModalProps {
  readonly isOpen?: boolean;
  readonly address?: string;
  readonly onClose: () => void;
  readonly onSuccess: (
    paymentMethod: PaymentMethodComponentFragment
  ) => void;
}

export const CreateCreditCardModal = ({
  isOpen,
  address,
  onClose,
  onSuccess,
}: CreateCreditCardModalProps) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>{translate.formatMessage({ id: "addNewCard" })}</ModalHeader>
      <ModalBody>
        <CreateCreditCardForm onSuccess={onSuccess} address={address} />
      </ModalBody>
    </Modal>
  );
};
