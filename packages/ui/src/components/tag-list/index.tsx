import { Wrap, WrapProps } from "../wrap";

export interface TagListProps extends WrapProps {}

export const TagList: React.FC<TagListProps> = ({ ...props }) => (
  <Wrap width="full" alignItems="center" paddingY="1" role="list" {...props} />
);
