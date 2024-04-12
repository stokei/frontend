import { CardFooter } from "@stokei/ui";

import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  return (
    <BlockEditable {...props}>
      <CardFooter {...props}>{children}</CardFooter>
    </BlockEditable>
  );
};
