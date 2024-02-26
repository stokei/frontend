import { Highlight, Text } from "@stokei/ui";

import { BlockEditable } from "../../../components/block-editable";
import { BaseComponentEditable } from "../../../types/base-component-editable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface EditableProps {}

export const Editable = ({
  data,
  ...props
}: BaseComponentEditable<EditableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <BlockEditable>
      <Text {...dataProps}>
        {dataProps?.highlight ? (
          <Highlight query={dataProps?.highlight}>
            {dataProps?.children}
          </Highlight>
        ) : (
          <>{dataProps?.children}</>
        )}
      </Text>
    </BlockEditable>
  );
};
