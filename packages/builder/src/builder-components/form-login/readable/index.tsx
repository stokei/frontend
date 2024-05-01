import { BaseComponentReadable } from "../../../types/base-component-readable";
import { Login } from "../components/login";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps { }

export const Readable = ({
  data,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return <Login {...dataProps} />;
};
