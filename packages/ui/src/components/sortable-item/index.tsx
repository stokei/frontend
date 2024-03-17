import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren, useEffect } from "react";
import { useSortableContext } from "../../hooks";
import { Box, BoxProps } from "../box";
import { SortableItemProvider } from "../../contexts/sortable-item";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export interface SortableItemProps<TData = any> extends BoxProps {
  id: string;
  type: string;
  isDisabled?: boolean;
  data?: TData;
}
export const SortableItem = ({
  id,
  type,
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

  const style: BoxProps = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (!children) {
    return <></>;
  }
  return (
    <Box
      ref={setNodeRef}
      height="fit-content"
      flexDirection="column"
      {...style}
    >
      <SortableItemProvider listeners={listeners} attributes={attributes}>
        {children}
      </SortableItemProvider>
    </Box>
  );
};
