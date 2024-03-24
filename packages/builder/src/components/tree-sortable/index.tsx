import { SortableProvider } from "@stokei/ui";
import { PropsWithChildren } from "react";
import { BuilderComponentData } from "../../factories/builder-component";

export interface TreeSortableProps {
  items: BuilderComponentData[];
}

export const TreeSortable = ({
  items,
  children,
  ...props
}: PropsWithChildren<TreeSortableProps>) => {
  return <SortableProvider items={items || []}>{children}</SortableProvider>;
};
