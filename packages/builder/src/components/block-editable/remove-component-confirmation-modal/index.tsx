import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
} from "@stokei/ui";
import { useTranslations } from "../../../hooks";

interface RemoveComponentConfirmationModalProps {
  isOpen?: boolean;
  onCancel: () => void;
  onRemove: () => void;
}

export const RemoveComponentConfirmationModal = ({
  isOpen,
  onCancel,
  onRemove,
}: RemoveComponentConfirmationModalProps) => {
  const translate = useTranslations();

  return (
    <Modal isOpen={!!isOpen} onClose={onCancel}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeComponent" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Text>
          {translate.formatMessage({
            id: "wouldYouReallyLikeToRemoveComponent",
          })}
        </Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button variant="ghost" onClick={onRemove}>
            {translate.formatMessage({ id: "remove" })}
          </Button>
          <Button onClick={onCancel}>
            {translate.formatMessage({ id: "cancel" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
