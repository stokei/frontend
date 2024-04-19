import { PropsWithChildren } from "react";

interface NavbarData { }

export const useDataToProps = ({ data, props }: { data: NavbarData; props: PropsWithChildren }) => {
  return {
    children: props?.children,
  };
};
