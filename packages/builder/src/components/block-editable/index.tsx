import { Box, BoxProps, useDisclosure } from "@stokei/ui";
import { useOnClickOutside } from "@stokei/ui/src/hooks/use-on-click-outside";
import { FC, PropsWithChildren, useRef } from "react";
import { BlockEditableMenu } from "./menu";

interface BlockEditableProps {}

export const BlockEditable: FC<PropsWithChildren<BlockEditableProps>> = ({
  children,
}) => {
  const blockRef = useRef<any>();
  const {
    isOpen: isClicked,
    onOpen: onClick,
    onClose: onClickOutside,
  } = useDisclosure();

  useOnClickOutside(blockRef, () => onClickOutside());

  const clickedProps: BoxProps = isClicked
    ? {
        borderWidth: "thin",
        borderColor: "primary.500",
      }
    : {};

  return (
    <Box
      ref={blockRef}
      flexDirection="column"
      onClick={onClick}
      position="relative"
      {...clickedProps}
    >
      {isClicked && <BlockEditableMenu direction="top" />}
      {children}
      {isClicked && <BlockEditableMenu direction="bottom" />}
    </Box>
  );
};
