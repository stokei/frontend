import {
  Box,
  BoxProps,
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
  readonly components?: BlockEditableProps[];
  readonly onRemove?: () => void;
}

export const BlockEditable = ({
  id,
  type,
  order,
  acceptTypes,
  children,
  components,
  onRemove,
  ...props
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
    <SortableItem
      id={id}
      type={type}
      order={order}
      acceptTypes={acceptTypes}
      {...props}
    >
      <Box
        width="full"
        // id={id}
        ref={blockRef}
        flexDirection="column"
        onClick={onClick}
        position="relative"
        height="auto"
        maxHeight="auto"
        {...clickedProps}
      >
        {isClicked && <BlockEditableMenu onRemove={onRemove} />}
        {children}
      </Box>
    </SortableItem>
  );
};
