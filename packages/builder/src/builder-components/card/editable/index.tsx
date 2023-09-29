import { Card, CardBody } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";

interface EditableProps {}

export const Editable: FC<BaseComponentEditable<EditableProps>> = ({
  data,
  children,
  ...props
}) => {
  return (
    <BlockEditable>
      <Card {...props}>
        <CardBody>{children}</CardBody>
      </Card>
    </BlockEditable>
  );
};
