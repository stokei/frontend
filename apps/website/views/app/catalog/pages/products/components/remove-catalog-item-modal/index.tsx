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

import { AdminCatalogPageCatalogItemFragment } from "../../graphql/catalog-items.query.graphql.generated";
import { useRemoveCatalogItemMutation } from "../../graphql/remove-catalog-item.mutation.graphql.generated";

interface RemoveCatalogItemModalProps {
  catalogItem?: AdminCatalogPageCatalogItemFragment;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onCatalogItemRemoved: (
    catalogItem: AdminCatalogPageCatalogItemFragment
  ) => void;
}

export const RemoveCatalogItemModal = ({
  catalogItem,
  isOpenModal,
  onCloseModal,
  onCatalogItemRemoved,
}: RemoveCatalogItemModalProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingRemoveCatalogItem }, onExecuteRemoveCatalogItem] =
    useRemoveCatalogItemMutation();

  const onRemoveCatalogItem = async () => {
    try {
      const response = await onExecuteRemoveCatalogItem({
        input: {
          where: {
            catalog: catalogItem?.catalog || "",
            product: catalogItem?.product?.id || "",
          },
        },
      });
      if (!!response?.data?.removeCatalogItem) {
        onCatalogItemRemoved(response?.data?.removeCatalogItem);
        onCloseModal();
        onShowToast({
          title: translate.formatMessage({
            id: "removedSuccessfully",
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
          {translate.formatMessage({ id: "removeCatalogItem" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="5">
          <Text>
            {translate.formatMessage({
              id: "wouldYouReallyLikeToRemoveCatalogItem",
            })}
          </Text>

          <Text as="b" color="primary.500" marginLeft="1">
            {catalogItem?.product?.name}
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingRemoveCatalogItem}
            onClick={onRemoveCatalogItem}
          >
            {translate.formatMessage({ id: "remove" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
