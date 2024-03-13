import { useDraggable } from "@dnd-kit/core";
import { Box, BoxProps } from "../box";
import { PropsWithChildren } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DraggableProvider } from "../../contexts";

export interface DraggableProps<TData = any> {
  id: string;
  type: string;
  isDisabled?: boolean;
  data?: TData;
}
export const Draggable = ({
  id,
  type,
  isDisabled,
  children,
  data,
  ...props
}: PropsWithChildren<DraggableProps>) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        ...data,
        id,
        type,
      },
      disabled: !!isDisabled,
    });

  const draggingStyle: BoxProps = isDragging
    ? {
        position: "fixed",
        zIndex: "9999",
        shadow: "md",
        rounded: "md",
        transform: CSS.Translate.toString(transform),
      }
    : {};

  return (
    <Box ref={setNodeRef} flexDirection="column" {...draggingStyle}>
      <DraggableProvider listeners={listeners} attributes={attributes}>
        {children}
      </DraggableProvider>
    </Box>
  );
};
