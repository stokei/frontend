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
import { useCallback, useMemo } from "react";
import { CourseMaterialFragment } from "../../../materials/graphql/materials.query.graphql.generated";
import { useRemoveCourseMaterialMutation } from "../../graphql/remove-material.mutation.graphql.generated";

interface RemoveMaterialModalProps {
  material?: CourseMaterialFragment;
  isOpenModal?: boolean;
  onCloseModal: () => void;
}

export const RemoveMaterialModal = ({
  material,
  isOpenModal,
  onCloseModal,
}: RemoveMaterialModalProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingRemoveMaterial }, onExecuteRemoveMaterial] =
    useRemoveCourseMaterialMutation();

  const courseId = useMemo(
    () => router?.query?.courseId?.toString() || "",
    [router?.query?.courseId]
  );

  const onGoToMaterialsPage = useCallback(() => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).course({ course: courseId })
        .materials.home
    );
  }, [courseId, currentApp?.id, router]);

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
