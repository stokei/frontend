import { Button, useDisclosure } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateButtonDrawer } from "../components/update-button-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateButtonDrawer,
    onClose: onCloseUpdateButtonDrawer,
    onOpen: onOpenUpdateButtonDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({
    data, props: {
      ...props,
      isBlockEditable: true,
    }
  });
  return (
    <BlockEditable {...props}
      isUpdating={isOpenUpdateButtonDrawer}
      onUpdate={onOpenUpdateButtonDrawer}
    >
      <UpdateButtonDrawer
        currentData={data}
        isOpen={isOpenUpdateButtonDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateButtonDrawer}
      />
      <Button {...dataProps} />
    </BlockEditable>
  );
};
