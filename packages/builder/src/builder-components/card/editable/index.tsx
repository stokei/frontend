import { Card, CardBody } from "@stokei/ui";

import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";

interface EditableProps {}

export const Editable = ({
  data,
  children,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  return (
    <BlockEditable id={props?.id}>
      <Card {...props}>
        <CardBody>{children}</CardBody>
      </Card>
    </BlockEditable>
  );
};
