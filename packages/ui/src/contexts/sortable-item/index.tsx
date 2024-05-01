import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { PropsWithChildren, createContext } from "react";

export interface SortableItemContextProps {
  readonly listeners?: SyntheticListenerMap;
  readonly attributes?: DraggableAttributes;
}

export const SortableItemContext = createContext(
  {} as SortableItemContextProps
);

export const SortableItemProvider = ({
  children,
  ...props
}: PropsWithChildren<SortableItemContextProps>) => {
  return (
    <SortableItemContext.Provider value={props}>
      {children}
    </SortableItemContext.Provider>
  );
};
