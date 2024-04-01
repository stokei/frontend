import { BaseComponentReadable } from "../../../types/base-component-readable";
import { Block } from "../components/block";

interface ReadableProps {}

export const Readable = ({
  children,
}: BaseComponentReadable<ReadableProps>) => {
  return <Block>{children}</Block>;
};
