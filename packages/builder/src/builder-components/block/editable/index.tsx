import { Draggable, Droppable, SortableItem, useDisclosure } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Block } from "../components/block";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateBlockDrawer } from "../components/update-block-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateBlockDrawer,
    onClose: onCloseUpdateBlockDrawer,
    onOpen: onOpenUpdateBlockDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable
      {...props}
      hasDnD
      isUpdating={isOpenUpdateBlockDrawer}
      onUpdate={onOpenUpdateBlockDrawer}
    >
      <UpdateBlockDrawer
        currentData={data}
        isOpen={isOpenUpdateBlockDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateBlockDrawer}
      />
      <Block {...dataProps}>{children}</Block>
    </BlockEditable>
  );
};
