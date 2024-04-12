import { Highlight, Title, useDisclosure } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateTitleDrawer } from "../components/update-title-drawer";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateTitleDrawer,
    onClose: onCloseUpdateTitleDrawer,
    onOpen: onOpenUpdateTitleDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable
      {...props}
      isUpdating={isOpenUpdateTitleDrawer}
      onUpdate={onOpenUpdateTitleDrawer}
    >
      <UpdateTitleDrawer
        currentData={data}
        isOpen={isOpenUpdateTitleDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateTitleDrawer}
      />
      <Title {...dataProps}>
        {dataProps?.highlight ? (
          <Highlight query={dataProps?.highlight}>
            {dataProps?.children}
          </Highlight>
        ) : (
          <>{dataProps?.children}</>
        )}
      </Title>
    </BlockEditable>
  );
};
