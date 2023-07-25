import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  Title,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { AppMaterialFragment } from "../../../home/graphql/materials.query.graphql.generated";
import { useRemoveMaterialMutation } from "../../graphql/remove-material.mutation.graphql.generated";

interface RemoveMaterialModalProps {
  material?: AppMaterialFragment;
  isOpenModal?: boolean;
  onCloseModal: () => void;
}

export const RemoveMaterialModal: FC<RemoveMaterialModalProps> = ({
  material,
  isOpenModal,
  onCloseModal,
}) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingRemoveMaterial }, onExecuteRemoveMaterial] =
    useRemoveMaterialMutation();

  const onGoToMaterialsPage = useCallback(() => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).materials.home
    );
  }, [currentApp?.id, router]);

  const onRemoveMaterial = useCallback(async () => {
    try {
      const response = await onExecuteRemoveMaterial({
        input: {
          where: {
            material: material?.id || "",
          },
        },
      });
      if (!!response?.data?.removeMaterial) {
        onShowToast({
          title: translate.formatMessage({ id: "removedSuccessfully" }),
          status: "success",
        });

        onGoToMaterialsPage();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [
    material?.id,
    onExecuteRemoveMaterial,
    onGoToMaterialsPage,
    onShowAPIError,
    onShowToast,
    translate,
  ]);

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeMaterial" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="5">
          <Text>
            {translate.formatMessage({
              id: "wouldYouReallyLikeToRemoveMaterial",
            })}
          </Text>

          <Text as="b" color="primary.500" marginLeft="1">
            {material?.name}
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingRemoveMaterial}
            onClick={onRemoveMaterial}
          >
            {translate.formatMessage({ id: "removeMaterial" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
