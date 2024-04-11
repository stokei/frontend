import { BaseComponentReadable } from "../../../types/base-component-readable";
import { Block } from "../components/block";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable = ({
  data,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return <Block {...dataProps} />;
};
