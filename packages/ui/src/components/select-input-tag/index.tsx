import { PropsWithChildren } from "react";
import { Tag, TagProps } from "../";

export interface SelectInputTagProps extends TagProps {}

export const SelectInputTag: React.FC<
  PropsWithChildren<SelectInputTagProps>
> = ({ ...props }) => <Tag {...props} />;
