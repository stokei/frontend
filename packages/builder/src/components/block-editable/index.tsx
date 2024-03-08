import { Box, BoxProps, useDisclosure, useOutsideClick } from "@stokei/ui";
import { PropsWithChildren, useRef } from "react";
import { BlockEditableMenu } from "./menu";

interface BlockEditableProps {
  readonly id: string;
}

export const BlockEditable = ({
  id,
  children,
}: PropsWithChildren<BlockEditableProps>) => {
  const blockRef = useRef<any>();
  const {
    isOpen: isClicked,
    onOpen: onClick,
    onClose: onClickOutside,
  } = useDisclosure();

  useOutsideClick({
    ref: blockRef,
    handler(e) {
      onClickOutside();
    },
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
      id={id}
      ref={blockRef}
      flexDirection="column"
      onClick={onClick}
      position="relative"
      {...clickedProps}
    >
      {isClicked && <BlockEditableMenu direction="top" />}
      {children}
    </Box>
  );
};
