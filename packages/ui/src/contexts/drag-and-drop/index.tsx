import {
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PropsWithChildren, ReactNode, createContext, useState } from "react";

export type DragAndDropDragStartEvent = DragStartEvent;
export type DragAndDropDragOverEvent = DragOverEvent;
export type DragAndDropDragEndEvent = DragEndEvent;

export type DragAndDropContextProps = DndContextProps;

export interface DragAndDropContextValues {
  setDragOverlayElement: (element: ReactNode) => void;
}

export const DragAndDropContext = createContext({} as DragAndDropContextValues);

export const DragAndDropProvider = ({
  children,
  ...props
}: PropsWithChildren<DragAndDropContextProps>) => {
  const [dragOverlayElement, setDragOverlayElement] = useState<any>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} {...props}>
      <DragAndDropContext.Provider value={{ setDragOverlayElement }}>
        {children}
        {dragOverlayElement && <DragOverlay>{dragOverlayElement}</DragOverlay>}
      </DragAndDropContext.Provider>
    </DndContext>
  );
};
