import { Children, PropsWithChildren } from "react";
import { Icon } from "../icon";
import { Stack } from "../stack";

export interface DatePickerGroupProps {}

export const DatePickerGroup: React.FC<
  PropsWithChildren<DatePickerGroupProps>
> = ({ children }) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      {Children?.map(children, (child, index) => (
        <>
          {index !== 0 && <Icon name="arrowRight" />}
          {child}
        </>
      ))}
    </Stack>
  );
};
