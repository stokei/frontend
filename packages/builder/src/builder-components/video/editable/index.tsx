import { VideoPlayer, useDisclosure } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateVideoDrawer } from "../components/update-video-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateVideoDrawer,
    onClose: onCloseUpdateVideoDrawer,
    onOpen: onOpenUpdateVideoDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}
      isUpdating={isOpenUpdateVideoDrawer}
      onUpdate={onOpenUpdateVideoDrawer}
    >
      <UpdateVideoDrawer
        id={props?.id}
        currentData={{
          ...data,
          filename: dataProps?.filename,
          video: dataProps?.src
        }}
        isOpen={isOpenUpdateVideoDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateVideoDrawer}
      />
      <VideoPlayer {...dataProps} />
    </BlockEditable>
  );
};
