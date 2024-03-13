import { DndContext, DndContextProps } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export type DragAndDropContextProps = DndContextProps;

export const DragAndDropProvider = ({
  children,
  ...props
}: PropsWithChildren<DragAndDropContextProps>) => {
  return <DndContext {...props}>{children}</DndContext>;
};
