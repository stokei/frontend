import { SortableItem } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Block } from "../components/block";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable = ({
  data,
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <SortableItem {...props}>
      <BlockEditable hasSortable {...props}>
        <Block {...dataProps}>{children}</Block>
      </BlockEditable>
    </SortableItem>
  );
};
