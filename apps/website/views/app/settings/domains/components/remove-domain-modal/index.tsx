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

import { AppDomainFragment } from "../../graphql/domains.query.graphql.generated";
import { useRemoveDomainMutation } from "../../graphql/remove-domain.mutation.graphql.generated";

interface RemoveDomainModalProps {
  domain?: AppDomainFragment;
  isOpenModal?: boolean;
  onCloseModal: () => void;
  onSuccessRemoveDomain: (domain: AppDomainFragment) => void;
}

export const RemoveDomainModal = ({
  domain,
  isOpenModal,
  onCloseModal,
  onSuccessRemoveDomain,
}: RemoveDomainModalProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingCreateDomain }, removeDomain] =
    useRemoveDomainMutation();

  const onRemoveDomain = async () => {
    try {
      const response = await removeDomain({
        input: {
          where: {
            domain: domain?.id || "",
          },
        },
      });
      if (!!response?.data?.removeDomain) {
        onSuccessRemoveDomain(response?.data?.removeDomain);
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
          {translate.formatMessage({ id: "removeDomain" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Text>
          {translate.formatMessage(
            {
              id: "wouldYouReallyLikeToRemoveDomain",
            },
            {
              domain: (
                <Text as="b" color="primary.500" marginLeft="1">
                  {domain?.name}
                </Text>
              ),
            }
          )}
        </Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingCreateDomain}
            onClick={onRemoveDomain}
          >
            {translate.formatMessage({ id: "removeDomain" })}
          </Button>
          <Button onClick={onCloseModal}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
