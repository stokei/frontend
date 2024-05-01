import { useState } from "react";
import { IColor } from "../../interfaces";

export interface UseColorValueData {
  defaultColor?: IColor | string;
}
export const useColorValue = (
  data?: UseColorValueData
): [
  IColor | string | undefined,
  (color: IColor | string | undefined) => void,
] => {
  const [color, setColor] = useState<IColor | string | undefined>(
    () => data?.defaultColor
  );

  return [color, setColor];
};
