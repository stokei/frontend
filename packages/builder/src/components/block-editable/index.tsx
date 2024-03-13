import {
  Box,
  BoxProps,
  Draggable,
  DraggableTrigger,
  Droppable,
  useDisclosure,
  useOutsideClick,
} from "@stokei/ui";
import { PropsWithChildren, useRef } from "react";
import { BlockEditableMenu } from "./menu";
import { ComponentType } from "../../services/graphql/stokei";

interface BlockEditableProps {
  readonly id: string;
  readonly type: ComponentType;
  readonly acceptTypes?: ComponentType[];
  readonly onRemove?: () => void;
}

export const BlockEditable = ({
  id,
  type,
  acceptTypes,
  children,
  onRemove,
}: PropsWithChildren<BlockEditableProps>) => {
  const blockRef = useRef<any>();
  const {
    isOpen: isClicked,
    onOpen: onClick,
    onClose: onClickOutside,
  } = useDisclosure();

  useOutsideClick({
    ref: blockRef,
    handler: onClickOutside,
  });

  const clickedProps: BoxProps = isClicked
    ? {
        rounded: "sm",
        borderWidth: "2px",
        borderColor: "primary.500",
      }
    : {};

  return (
    <Droppable id={id} acceptTypes={acceptTypes}>
      <Draggable id={id} type={type}>
        <Box
          id={id}
          ref={blockRef}
          flexDirection="column"
          onClick={onClick}
          position="relative"
          {...clickedProps}
        >
          {isClicked && <BlockEditableMenu onRemove={onRemove} />}
          {children}
        </Box>
      </Draggable>
    </Droppable>
  );
};
