import { Draggable, Droppable, SortableItem } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Block } from "../components/block";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <Droppable {...props}>
      <Draggable {...props}>
        <BlockEditable hasSortable {...props}>
          <Block {...dataProps}>{children}</Block>
        </BlockEditable>
      </Draggable>
    </Droppable>
  );
};
