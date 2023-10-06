import { useMemo } from "react";

interface ResponsiveData {
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
}
interface Data {
  gap?: number;
  mobile?: ResponsiveData;
  desktop?: ResponsiveData;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const direction = useMemo(() => {
    const mobileDirection =
      data?.mobile?.direction || data?.desktop?.direction || "column";
    const desktopDirection =
      data?.desktop?.direction || data?.mobile?.direction || "column";
    if (!mobileDirection && !desktopDirection) {
      return;
    }
    return [
      mobileDirection,
      mobileDirection,
      desktopDirection,
      desktopDirection,
    ];
  }, [data?.desktop?.direction, data?.mobile?.direction]);

  return {
    direction,
    spacing: data?.gap || "5",
    children: props?.children,
  };
};
