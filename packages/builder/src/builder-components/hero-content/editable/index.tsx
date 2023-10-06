import { HeroContent } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { BlockEditable } from "../../../components/block-editable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable: FC<BaseComponentEditable<EditableProps>> = ({
  data,
  ...props
}) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable>
      <HeroContent {...dataProps} />
    </BlockEditable>
  );
};
