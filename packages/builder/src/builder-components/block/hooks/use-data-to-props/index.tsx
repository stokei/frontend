import { PropsWithChildren } from "react";

interface Data {
  backgroundColor?: string;
}

export const useDataToProps = ({
  data,
  props,
}: {
  data: Data;
  props: PropsWithChildren<any>;
}) => {
  return {
    backgroundColor: data?.backgroundColor,
    children: props?.children,
  };
};
