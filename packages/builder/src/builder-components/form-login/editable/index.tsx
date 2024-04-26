import { useDisclosure } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Login } from "../components/login";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateFormLoginDrawer } from "../components/update-form-login-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateFormLoginDrawer,
    onClose: onCloseUpdateFormLoginDrawer,
    onOpen: onOpenUpdateFormLoginDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}
      isUpdating={isOpenUpdateFormLoginDrawer}
      onUpdate={onOpenUpdateFormLoginDrawer}
    >
      <UpdateFormLoginDrawer
        id={props?.id}
        currentData={{
          ...data,
          title: dataProps?.title
        }}
        isOpen={isOpenUpdateFormLoginDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateFormLoginDrawer}
      />
      <Login isBlockEditable {...dataProps} />
    </BlockEditable>
  );
};
