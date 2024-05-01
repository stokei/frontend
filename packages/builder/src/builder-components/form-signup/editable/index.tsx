import { useDisclosure } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { SignUp } from "../components/signup";
import { useDataToProps } from "../hooks/use-data-to-props";
import { UpdateFormSignUpDrawer } from "../components/update-form-signup-drawer";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const {
    isOpen: isOpenUpdateFormSignUpDrawer,
    onClose: onCloseUpdateFormSignUpDrawer,
    onOpen: onOpenUpdateFormSignUpDrawer,
  } = useDisclosure();

  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}
      isUpdating={isOpenUpdateFormSignUpDrawer}
      onUpdate={onOpenUpdateFormSignUpDrawer}
    >
      <UpdateFormSignUpDrawer
        id={props?.id}
        currentData={{
          ...data,
          title: dataProps?.title
        }}
        isOpen={isOpenUpdateFormSignUpDrawer}
        onUpdate={onUpdate}
        onClose={onCloseUpdateFormSignUpDrawer}
      />
      <SignUp isBlockEditable {...dataProps} />
    </BlockEditable>
  );
};
