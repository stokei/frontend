import { Wrap, WrapProps } from "../wrap";

export interface SelectTagListProps extends WrapProps {}

export const SelectTagList: React.FC<SelectTagListProps> = ({ ...props }) => (
  <Wrap width="full" alignItems="center" paddingY="1" {...props} />
);
