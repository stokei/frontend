import { Highlight, Title } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentReadable } from "../../../types/base-component-readable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = ({
  data,
  ...props
}) => {
  const dataProps = useDataToProps({ data, props });
  return (
    <Title {...dataProps}>
      {dataProps?.highlight ? (
        <Highlight query={dataProps?.highlight}>
          {dataProps?.children}
        </Highlight>
      ) : (
        <>{dataProps?.children}</>
      )}
    </Title>
  );
};
