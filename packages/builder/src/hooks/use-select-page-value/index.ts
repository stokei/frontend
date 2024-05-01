import { useEffect, useState } from "react";
import { SitePageFragment } from "../../components/select-page/graphql/pages.query.graphql.generated";

export interface UseSelectPageValueData {
  defaultValue?: SitePageFragment;
}
export const useSelectPageValue = (
  data?: UseSelectPageValueData
): [
  SitePageFragment | undefined,
  (value: SitePageFragment | undefined) => void,
] => {
  const [value, setValue] = useState<SitePageFragment | undefined>(
    () => data?.defaultValue
  );

  useEffect(() => {
    if (data?.defaultValue) {
      setValue((oldValue) =>
        oldValue?.id !== data?.defaultValue?.id ? data?.defaultValue : oldValue
      );
    }
  }, [data?.defaultValue]);

  return [value, setValue];
};
