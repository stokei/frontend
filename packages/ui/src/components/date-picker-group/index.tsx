import { Children, Fragment, PropsWithChildren, useMemo } from "react";
import { Icon } from "../icon";
import { Stack } from "../stack";

export interface DatePickerGroupProps {}

export const DatePickerGroup: React.FC<
  PropsWithChildren<DatePickerGroupProps>
> = ({ children }) => {
  const cleanChildren = useMemo(
    () => Children?.toArray(children)?.filter((child) => !!child),
    [children]
  );
  return (
    <Stack direction="row" spacing="2" align="center">
      {Children?.map(cleanChildren, (child, index) => (
        <>
          {index > 0 && <Icon name="arrowRight" />}
          {child}
        </>
      ))}
    </Stack>
  );
};
