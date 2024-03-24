import { PropsWithChildren, cloneElement } from "react";
import { useSortableItemContext } from "../../hooks/use-sortable-item-context";

export const SortableItemTrigger = ({
  children,
  ...props
}: PropsWithChildren) => {
  const { attributes, listeners } = useSortableItemContext();

  return cloneElement(children as any, {
    ...listeners,
    ...attributes,
    ...props,
  });
};
