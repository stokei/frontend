import { Children, Fragment, PropsWithChildren, useMemo } from "react";
import { Icon } from "../icon";
import { Stack } from "../stack";

export interface DatePickerGroupProps {}

export const DatePickerGroup = ({
  children,
}: PropsWithChildren<DatePickerGroupProps>) => {
  const cleanChildren = useMemo(
    () => Children?.toArray(children)?.filter((child) => !!child),
    [children]
  );
  return (
    <Stack width="fit-content" direction="row" spacing="2" align="center">
      {Children?.map(cleanChildren, (child, index) => (
        <>
          {index > 0 && <Icon name="arrowRight" />}
          {child}
        </>
      ))}
    </Stack>
  );
};
