import { HeroContent } from "@stokei/ui";

import { Children } from "react";
import { BlockEditable } from "../../../components/block-editable";
import { DropComponentHere } from "../../../components/drop-component-here";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable = ({
  data,
  onUpdate,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable {...props}>
      <HeroContent {...dataProps}>
        {Children.count(dataProps?.children) > 0 ? (
          dataProps?.children
        ) : (
          <DropComponentHere />
        )}
      </HeroContent>
    </BlockEditable>
  );
};
