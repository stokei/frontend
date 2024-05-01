import { Wrap, WrapProps } from "../wrap";

export interface SelectTagListProps extends WrapProps {}

export const SelectTagList = ({ ...props }: SelectTagListProps) => (
  <Wrap width="full" alignItems="center" paddingY="1" role="list" {...props} />
);
