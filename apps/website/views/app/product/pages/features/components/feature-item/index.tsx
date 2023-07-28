import {
  ButtonGroup,
  Card,
  CardBody,
  Description,
  IconButton,
  Stack,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, memo } from "react";
import { ProductPageFeatureFragment } from "../../graphql/features.query.graphql.generated";
import { RemoveFeatureModal } from "../remove-feature-modal";

interface FeatureItemProps {
  feature?: ProductPageFeatureFragment;
  onRemovedFeatures: () => void;
}

export const FeatureItem: FC<FeatureItemProps> = memo(
  ({ feature, onRemovedFeatures }) => {
    const {
      isOpen: isOpenRemoveFeatureModal,
      onOpen: onOpenRemoveFeatureModal,
      onClose: onCloseRemoveFeatureModal,
    } = useDisclosure();

    return (
      <Card background="background.50">
        <CardBody>
          <RemoveFeatureModal
            feature={feature}
            isOpenModal={isOpenRemoveFeatureModal}
            onCloseModal={onCloseRemoveFeatureModal}
            onSuccess={onRemovedFeatures}
          />
          <Stack direction="row" spacing="5" justify="space-between">
            <Stack width="fit-content" direction="column" spacing="1">
              <Title fontSize="md">{feature?.name}</Title>
              <Description>{feature?.description}</Description>
            </Stack>
            <ButtonGroup variant="ghost">
              <IconButton name="trash" onClick={onOpenRemoveFeatureModal} />
            </ButtonGroup>
          </Stack>
        </CardBody>
      </Card>
    );
  }
);

FeatureItem.displayName = "FeatureItem";
