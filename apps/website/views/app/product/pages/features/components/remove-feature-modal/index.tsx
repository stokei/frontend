import { useAPIErrors, useTranslations } from "@/hooks";
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
import { FC, useCallback } from "react";
import { ProductPageFeatureFragment } from "../../graphql/features.query.graphql.generated";
import { useProductPageRemoveFeatureMutation } from "../../graphql/remove-feature.mutation.graphql.generated";

interface RemoveFeatureModalProps {
  feature?: ProductPageFeatureFragment;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onSuccess: () => void;
}

export const RemoveFeatureModal: FC<RemoveFeatureModalProps> = ({
  feature,
  isOpenModal,
  onSuccess,
  onCloseModal,
}) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingRemoveFeature }, onExecuteRemoveFeature] =
    useProductPageRemoveFeatureMutation();

  const onRemoveFeature = useCallback(async () => {
    try {
      const response = await onExecuteRemoveFeature({
        input: {
          where: {
            feature: feature?.id || "",
          },
        },
      });
      if (!!response?.data?.removeFeature) {
        onShowToast({
          title: translate.formatMessage({ id: "removedSuccessfully" }),
          status: "success",
        });

        onSuccess?.();
        onCloseModal();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [
    feature?.id,
    onCloseModal,
    onExecuteRemoveFeature,
    onShowAPIError,
    onShowToast,
    onSuccess,
    translate,
  ]);

  return (
    <Modal isOpen={!!isOpenModal} onClose={onCloseModal}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "removeFeature" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="5">
          <Text>
            {translate.formatMessage({
              id: "wouldYouReallyLikeToRemoveFeature",
            })}
          </Text>

          <Text as="b" color="primary.500" marginLeft="1">
            {feature?.name}
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingRemoveFeature}
            onClick={onRemoveFeature}
          >
            {translate.formatMessage({ id: "removeFeature" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
