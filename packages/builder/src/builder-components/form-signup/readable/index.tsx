import { BaseComponentReadable } from "../../../types/base-component-readable";
import { useDataToProps } from "../hooks/use-data-to-props";
import { SignUp } from "../components/signup";

interface ReadableProps { }

export const Readable = ({
  data,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return <SignUp {...dataProps} />;
};
