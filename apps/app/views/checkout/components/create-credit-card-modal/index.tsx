import { useTranslations } from "@/hooks";
import { Modal, ModalBody, ModalHeader } from "@stokei/ui";
import { FC } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-method.fragment.graphql.generated";
import { CreateCreditCardForm } from "../create-credit-card-form";

interface CreateCreditCardModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly onSuccess: (paymentMethod: CheckoutPaymentMethodFragment) => void;
}

export const CreateCreditCardModal: FC<CreateCreditCardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const translate = useTranslations();
  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>{translate.formatMessage({ id: "save" })}</ModalHeader>
      <ModalBody>
        <CreateCreditCardForm onSuccess={onSuccess} />
      </ModalBody>
    </Modal>
  );
};
