import { useDraggable } from "@dnd-kit/core";
import { PropsWithChildren, useEffect } from "react";
import { DraggableProvider } from "../../contexts";
import { useDragAndDropContext } from "../../hooks";
import { Box, BoxProps } from "../box";

export interface DraggableProps<TData = any> extends BoxProps {
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
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: {
      ...data,
      id,
      type,
    },
    disabled: !!isDisabled,
  });

  const { setDragOverlayElement } = useDragAndDropContext();

  useEffect(() => {
    if (isDragging) {
      setDragOverlayElement(children);
    } else {
      setDragOverlayElement(undefined);
    }
  }, [children, isDragging, setDragOverlayElement]);

  const draggingStyle: BoxProps = isDragging
    ? {
        opacity: ".3",
      }
    : {};

  if (!children) {
    return <></>;
  }
  return (
    <Box ref={setNodeRef} flexDirection="column" {...draggingStyle}>
      <DraggableProvider listeners={listeners} attributes={attributes}>
        {children}
      </DraggableProvider>
    </Box>
  );
};
