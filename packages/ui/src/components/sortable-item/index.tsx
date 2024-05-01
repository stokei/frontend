import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren, useEffect, useRef } from "react";
import { SortableItemProvider } from "../../contexts/sortable-item";
import { useSortableContext } from "../../hooks";
import { Box, BoxProps } from "../box";

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);

export interface SortableItemProps<TData = any> extends BoxProps {
  id: string;
  type: string;
  acceptTypes?: string[];
  isDisabled?: boolean;
  data?: TData;
}
export const SortableItem = ({
  id,
  type,
  acceptTypes,
  isDisabled,
  children,
  data,
  ...props
}: PropsWithChildren<SortableItemProps>) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
    active,
  } = useSortable({
    id,
    data: {
      ...data,
      id,
      type,
    },
    disabled: !!isDisabled,
    animateLayoutChanges,
  });

  const { setDragOverlayElement } = useSortableContext();

  useEffect(() => {
    if (isDragging) {
      setDragOverlayElement(children);
    } else {
      setDragOverlayElement(undefined);
    }
  }, [children, isDragging, setDragOverlayElement]);

  const droppableStyle: BoxProps = isOver
    ? {
        background: "primary.100",
      }
    : {};

  const style: BoxProps = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...droppableStyle,
  };
  if (!children) {
    return <></>;
  }
  return (
    <Box
      ref={setNodeRef}
      height="fit-content"
      flexDirection="column"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      {...style}
    >
      <SortableItemProvider listeners={listeners} attributes={attributes}>
        {children}
      </SortableItemProvider>
    </Box>
  );
};
