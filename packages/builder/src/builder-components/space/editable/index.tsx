import { Spacer } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";

interface EditableProps {}

export const Editable = ({
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  return (
    <BlockEditable {...props}>
      <Spacer {...props} />
    </BlockEditable>
  );
};
