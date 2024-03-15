import {
  Box,
  BoxProps,
  Draggable,
  Droppable,
  SortableItem,
  useDisclosure,
  useOutsideClick,
} from "@stokei/ui";
import { PropsWithChildren, useRef } from "react";
import { ComponentType } from "../../services/graphql/stokei";
import { BlockEditableMenu } from "./menu";

interface BlockEditableProps {
  readonly id: string;
  readonly order: number;
  readonly type: ComponentType;
  readonly acceptTypes?: ComponentType[];
  readonly onRemove?: () => void;
}

export const BlockEditable = ({
  id,
  type,
  order,
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
    // <Droppable id={id} acceptTypes={acceptTypes}>
    //   <Draggable id={id} type={type}>
    <SortableItem id={id} type={type}>
      <Box
        width="full"
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
    </SortableItem>
    //   </Draggable>
    // </Droppable>
  );
};
