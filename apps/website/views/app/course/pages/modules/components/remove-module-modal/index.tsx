import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
  useToast,
} from "@stokei/ui";

import { AdminCoursePageModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { useRemoveModuleMutation } from "../../graphql/remove-module.mutation.graphql.generated";

interface RemoveModuleModalProps {
  moduleId?: string;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onSuccessRemoveModule: (module: AdminCoursePageModuleFragment) => void;
}

export const RemoveModuleModal = ({
  moduleId,
  isOpenModal,
  onCloseModal,
  onSuccessRemoveModule,
}: RemoveModuleModalProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCreateModule }, removeModule] =
    useRemoveModuleMutation();

  const onRemoveModule = async () => {
    try {
      const response = await removeModule({
        input: {
          where: {
            module: moduleId || "",
          },
        },
      });
      if (!!response?.data?.removeModule) {
        onSuccessRemoveModule(response?.data?.removeModule);
        onShowToast({
          title: translate.formatMessage({
            id: "moduleRemovedSuccessfully",
          }),
          status: "success",
        });
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeModule" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Text>
          {translate.formatMessage({
            id: "wouldYouReallyLikeToRemoveModule",
          })}
        </Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingCreateModule}
            onClick={onRemoveModule}
          >
            {translate.formatMessage({ id: "removeModule" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
