import { WrapItem, WrapItemProps } from "../wrap-item";

export interface SelectTagItemProps extends WrapItemProps {}

export const SelectTagItem: React.FC<SelectTagItemProps> = ({ ...props }) => (
  <WrapItem role="listitem" {...props} />
);
