import { Navbar } from "@stokei/ui";
import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps { }

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}>
      <Navbar {...dataProps} />
    </BlockEditable>
  );
};
