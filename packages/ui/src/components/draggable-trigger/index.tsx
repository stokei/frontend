import { PropsWithChildren, cloneElement } from "react";
import { useDraggableContext } from "../../hooks/use-draggable-context";

export const DraggableTrigger = ({ children, ...props }: PropsWithChildren) => {
  const { attributes, listeners } = useDraggableContext();

  return cloneElement(children as any, {
    ...listeners,
    ...attributes,
    ...props,
  });
};
