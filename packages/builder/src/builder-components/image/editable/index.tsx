import { Image, useDisclosure } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateImageDrawer } from "../components/update-image-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateImageDrawer,
    onClose: onCloseUpdateImageDrawer,
    onOpen: onOpenUpdateImageDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}
      isUpdating={isOpenUpdateImageDrawer}
      onUpdate={onOpenUpdateImageDrawer}
    >
      <UpdateImageDrawer
        id={props?.id}
        currentData={{
          ...data,
          image: dataProps?.src
        }}
        isOpen={isOpenUpdateImageDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateImageDrawer}
      />
      <Image {...dataProps} alt={dataProps.alt} />
    </BlockEditable>
  );
};
