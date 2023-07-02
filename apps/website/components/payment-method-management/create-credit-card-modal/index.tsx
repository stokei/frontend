import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader } from "@stokei/ui";
import { FC } from "react";
import { PaymentMethodManagementPaymentMethodFragment } from "../graphql/payment-methods.query.graphql.generated";
import { CreateCreditCardForm } from "../create-credit-card-form";

interface CreateCreditCardModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly onSuccess: (
    paymentMethod: PaymentMethodManagementPaymentMethodFragment
  ) => void;
}

export const CreateCreditCardModal: FC<CreateCreditCardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>{translate.formatMessage({ id: "addNewCard" })}</ModalHeader>
      <ModalBody>
        <CreateCreditCardForm onSuccess={onSuccess} />
      </ModalBody>
    </Modal>
  );
};
