import { Text } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";

interface EditableProps {}

export const Editable: FC<BaseComponentEditable<EditableProps>> = (props) => {
  return (
    <BlockEditable>
      <Text {...props} />
    </BlockEditable>
  );
};
