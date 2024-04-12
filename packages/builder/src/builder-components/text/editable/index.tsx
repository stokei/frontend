import { Highlight, Text, useDisclosure } from "@stokei/ui";

import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateTextDrawer } from "../components/update-text-drawer";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateTextDrawer,
    onClose: onCloseUpdateTextDrawer,
    onOpen: onOpenUpdateTextDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable
      {...props}
      isUpdating={isOpenUpdateTextDrawer}
      onUpdate={onOpenUpdateTextDrawer}
    >
      <UpdateTextDrawer
        currentData={data}
        isOpen={isOpenUpdateTextDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateTextDrawer}
      />
      <Text {...dataProps}>
        {dataProps?.highlight ? (
          <Highlight query={dataProps?.highlight}>
            {dataProps?.children}
          </Highlight>
        ) : (
          <>{dataProps?.children}</>
        )}
      </Text>
    </BlockEditable>
  );
};
