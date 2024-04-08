import { BaseComponentReadable } from "../../../types/base-component-readable";
import { Catalog } from "../components/catalog";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable = ({
  data,
  onRedirect,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <Catalog catalogId={dataProps?.catalog || ""} onRedirect={onRedirect} />
  );
};
