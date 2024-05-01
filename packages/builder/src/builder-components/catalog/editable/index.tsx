import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { Catalog } from "../components/catalog";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  onRedirect,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}>
      <Catalog catalogId={dataProps?.catalog || ""} onRedirect={onRedirect} />
    </BlockEditable>
  );
};
