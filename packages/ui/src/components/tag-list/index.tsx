import { Wrap, WrapProps } from "../wrap";

export interface TagListProps extends WrapProps {}

export const TagList = ({ ...props }: TagListProps) => (
  <Wrap width="full" alignItems="center" paddingY="1" role="list" {...props} />
);
