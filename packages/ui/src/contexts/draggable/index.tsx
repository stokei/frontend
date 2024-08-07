import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { PropsWithChildren, createContext } from "react";

export interface DraggableContextProps {
  readonly listeners?: SyntheticListenerMap;
  readonly attributes?: DraggableAttributes;
}

export const DraggableContext = createContext({} as DraggableContextProps);

export const DraggableProvider = ({
  children,
  ...props
}: PropsWithChildren<DraggableContextProps>) => {
  return (
    <DraggableContext.Provider value={props}>
      {children}
    </DraggableContext.Provider>
  );
};
