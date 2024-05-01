import { Box, BoxProps, Draggable, Droppable, useDisclosure, useOutsideClick } from "@stokei/ui";
import { PropsWithChildren, useRef } from "react";
import { ComponentType } from "../../services/graphql/stokei";
import { BlockEditableMenu } from "./menu";
import { RemoveComponentConfirmationModal } from "./remove-component-confirmation-modal";

interface BlockEditableProps {
  readonly id: string;
  readonly order: number;
  readonly type: ComponentType;
  readonly acceptTypes?: ComponentType[];
  readonly components?: BlockEditableProps[];
  readonly onRemove?: () => void;
  readonly onUpdate?: (data?: any) => void;
  readonly hasDnD?: boolean;
  readonly isUpdating?: boolean;
}

const ContainerDefault = ({ children, ...props }: PropsWithChildren<BlockEditableProps>) => (
  <Box
    width="full"
    flexDirection="column"
    position="relative"
    height="auto"
    maxHeight="auto" {...props}>
    {children}
  </Box>
)

const ContainerWithDnD = ({ children, ...props }: PropsWithChildren<BlockEditableProps>) => (
  <Droppable {...props}>
    <Draggable {...props}>
      {children}
    </Draggable>
  </Droppable>
)

export const BlockEditable = ({
  children,
  hasDnD,
  isUpdating,
  onRemove,
  onUpdate,
  ...props
}: PropsWithChildren<BlockEditableProps>) => {
  const blockRef = useRef<any>();
  const {
    isOpen: isOpenRemoveComponentConfirmationModal,
    onClose: onCloseRemoveComponentConfirmationModal,
    onOpen: onOpenRemoveComponentConfirmationModal,
  } = useDisclosure();

  const {
    isOpen: isClicked,
    onOpen: onClick,
    onClose: onClickOutside,
  } = useDisclosure();

  useOutsideClick({
    ref: blockRef,
    handler: onClickOutside,
    enabled: !isUpdating,
  });

  const clickedProps: BoxProps = isClicked
    ? {
      rounded: "sm",
      borderWidth: "2px",
      borderColor: "primary.500",
      background: 'background.100',
    }
    : {};

  const Container = !!hasDnD ? ContainerWithDnD : ContainerDefault;

  return (
    <Container {...(hasDnD ? props : {} as any)}>
      <Box
        width="full"
        ref={blockRef}
        flexDirection="column"
        onClick={onClick}
        position="relative"
        height="auto"
        maxHeight="auto"
        {...clickedProps}
      >
        {!!onRemove && (
          <RemoveComponentConfirmationModal
            isOpen={isOpenRemoveComponentConfirmationModal}
            onRemove={onRemove}
            onCancel={onCloseRemoveComponentConfirmationModal}
          />
        )}
        {isClicked && (
          <BlockEditableMenu
            hasDnD={!!hasDnD}
            onUpdate={onUpdate}
            onRemove={onOpenRemoveComponentConfirmationModal}
          />
        )}
        {children}
      </Box>
    </Container>
  );
};
