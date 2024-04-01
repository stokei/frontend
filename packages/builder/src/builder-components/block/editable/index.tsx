import { SortableItem } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Block } from "../components/block";

interface EditableProps {}

export const Editable = ({
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  return (
    <SortableItem {...props}>
      <BlockEditable hasSortable {...props}>
        <Block>{children}</Block>
      </BlockEditable>
    </SortableItem>
  );
};
