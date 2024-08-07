import { useMemo } from "react";

interface ResponsiveData {
  columns?: number;
  rows?: number;
}
interface Data {
  gap?: number;
  mobile?: ResponsiveData;
  desktop?: ResponsiveData;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const columns = useMemo(() => {
    const mobileColumns = data?.mobile?.columns || data?.desktop?.columns;
    const desktopColumns = data?.desktop?.columns || data?.mobile?.columns;
    if (!mobileColumns && !desktopColumns) {
      return;
    }
    return [mobileColumns, mobileColumns, desktopColumns, desktopColumns];
  }, [data?.desktop?.columns, data?.mobile?.columns]);

  const rows = useMemo(() => {
    const mobileColumns = data?.mobile?.rows || data?.desktop?.rows;
    const desktopColumns = data?.desktop?.rows || data?.mobile?.rows;
    if (!mobileColumns && !desktopColumns) {
      return;
    }
    return [mobileColumns, mobileColumns, desktopColumns, desktopColumns];
  }, [data?.desktop?.rows, data?.mobile?.rows]);

  return {
    gap: data?.gap || "5",
    templateColumns: columns,
    templateRows: rows,
    children: props?.children,
  };
};
