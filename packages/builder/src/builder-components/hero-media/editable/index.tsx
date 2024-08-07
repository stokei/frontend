import { HeroMedia } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
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
      <HeroMedia {...dataProps} />
    </BlockEditable>
  );
};
