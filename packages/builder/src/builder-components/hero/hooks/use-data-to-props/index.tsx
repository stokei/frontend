import { StackProps } from "@stokei/ui";
import { useMemo } from "react";

interface Data {
  direction?: "left" | "right";
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const direction = useMemo<StackProps["direction"]>(() => {
    if (data?.direction === "right") {
      return ["column", "column", "row-reverse", "row-reverse"];
    }
    return ["column", "column", "row", "row"];
  }, [data?.direction]);

  return {
    direction,
    backgroundImage: undefined,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    children: props?.children,
  };
};
