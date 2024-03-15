import { DndContextProps, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext as DnDSortableContext,
  SortableContextProps as DnDSortableContextProps,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PropsWithChildren, ReactNode, createContext, useState } from "react";

export { arrayMove };

export enum SortableStrategy {
  MULTIPLE_CONTAINER = "MULTIPLE_CONTAINER",
  ROW = "ROW",
  COLUMN = "COLUMN",
}

export interface SortableContextProps<
  TItems extends DnDSortableContextProps["items"],
> {
  items: TItems;
  strategy?: SortableStrategy;
}

export interface SortableContextValues {
  setDragOverlayElement: (element: ReactNode) => void;
}

export const SortableContext = createContext({} as any);

const sortingStrategies: Record<SortableStrategy, any> = {
  [SortableStrategy.MULTIPLE_CONTAINER]: rectSortingStrategy,
  [SortableStrategy.ROW]: verticalListSortingStrategy,
  [SortableStrategy.COLUMN]: horizontalListSortingStrategy,
};

export const SortableProvider = <
  TItems extends DnDSortableContextProps["items"],
>({
  children,
  strategy = SortableStrategy.MULTIPLE_CONTAINER,
  ...props
}: PropsWithChildren<SortableContextProps<TItems>>) => {
  const [dragOverlayElement, setDragOverlayElement] = useState<any>();

  const sortingStrategy = sortingStrategies[strategy];

  return (
    <SortableContext.Provider value={{ setDragOverlayElement }}>
      <DnDSortableContext {...props} strategy={sortingStrategy}>
        {children}
        {dragOverlayElement && <DragOverlay>{dragOverlayElement}</DragOverlay>}
      </DnDSortableContext>
    </SortableContext.Provider>
  );
};
