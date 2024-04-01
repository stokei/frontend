import { Box, BoxProps, useDisclosure, useOutsideClick } from "@stokei/ui";
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
  readonly hasSortable?: boolean;
}

export const BlockEditable = ({
  id,
  children,
  onRemove,
  hasSortable,
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
      {isClicked && (
        <BlockEditableMenu hasSortable={hasSortable} onRemove={onRemove} />
      )}
      {children}
    </Box>
  );
};
