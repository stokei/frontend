import { PropsWithChildren } from "react";

export interface BlockData {
  backgroundColor?: string;
}

export const useDataToProps = ({
  data,
  props,
}: {
  data: BlockData;
  props: PropsWithChildren<any>;
}) => {
  return {
    backgroundColor: data?.backgroundColor,
    children: props?.children,
  };
};
