import { useAPIErrors, useTranslations } from "@/hooks";
import { getProductURL } from "@/utils";
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  Image,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  Title,
  useToast,
} from "@stokei/ui";

import { useCancelSubscriptionContractMutation } from "../../graphql/cancel-subscription-contract.mutation.graphql.generated";

export interface CancelSubscriptionContractModalCustomer {
  name: string;
  avatarURL: string;
  email: string;
}
export interface CancelSubscriptionContractModalProduct {
  id: string;
  name: string;
  avatarURL?: string;
}

interface CancelSubscriptionContractModalProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly subscriptionContractId?: string;
  readonly customer?: CancelSubscriptionContractModalCustomer;
  readonly products?: CancelSubscriptionContractModalProduct[];
}

export const CancelSubscriptionContractModal = ({
  subscriptionContractId,
  customer,
  products,
  isOpen,
  onClose,
}: CancelSubscriptionContractModalProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [
    { fetching: isLoadingCancelSubscriptionContract },
    onExecuteCancelSubscriptionContractMutation,
  ] = useCancelSubscriptionContractMutation();

  const onCancelSubscriptionContract = async () => {
    try {
      const response = await onExecuteCancelSubscriptionContractMutation({
        input: {
          subscriptionContract: subscriptionContractId || "",
        },
      });
      if (!!response?.data?.cancelSubscriptionContract) {
        onClose?.();
        onShowToast({
          title: translate.formatMessage({
            id: "subscriptionCanceledSuccessfully",
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
    } catch (error) { }
  };

  return (
    <Modal isOpen={!!isOpen} onClose={onClose}>
      <ModalHeader>
        <Title fontSize="md">
          {translate.formatMessage({ id: "unsubscribe" })}
        </Title>
      </ModalHeader>
      <ModalBody>
        <Stack direction="column" spacing="5">
          <Text>
            {translate.formatMessage({ id: "wouldYouReallyLikeToUnsubscribe" })}
          </Text>
          <Stack direction="column" spacing="5">
            {customer && (
              <Stack direction="column" spacing="0">
                <Label>
                  {translate.formatMessage({ id: "customer" })}
                </Label>
                <Stack direction="row" spacing="4" align="center">
                  <Avatar
                    size="sm"
                    src={customer?.avatarURL}
                    name={customer?.name}
                  />
                  <Stack direction="column" spacing="0">
                    <Text fontWeight="bold">{customer?.name}</Text>
                    <Text fontSize="xs" color="text.300">
                      {customer?.email}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            )}

            <Stack direction="column" spacing="0">
              <Label>
                {translate.formatMessage({ id: "products" })}
              </Label>
              <Stack direction="column" spacing="2">
                {products?.map(product => (
                  <Stack key={product.id} direction="row" spacing="4" align="center">
                    <Image
                      width="10"
                      rounded="sm"
                      src={getProductURL(product?.avatarURL)}
                      alt={translate.formatMessage({ id: "product" })}
                    />
                    <Stack direction="column" spacing="4">
                      <Text fontWeight="bold">{product?.name}</Text>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button
            variant="ghost"
            isLoading={isLoadingCancelSubscriptionContract}
            onClick={onCancelSubscriptionContract}
            colorScheme="red"
          >
            {translate.formatMessage({ id: "unsubscribe" })}
          </Button>
          <Button onClick={onClose}>
            {translate.formatMessage({ id: "close" })}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  );
};
