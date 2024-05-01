import { WrapItem, WrapItemProps } from "../wrap-item";

export interface SelectTagItemProps extends WrapItemProps {}

export const SelectTagItem = ({ ...props }: SelectTagItemProps) => (
  <WrapItem role="listitem" {...props} />
);
