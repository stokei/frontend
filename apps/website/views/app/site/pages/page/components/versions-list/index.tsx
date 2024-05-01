import { usePage } from "@/hooks";
import { useMemo } from "react";
import { useGetVersionsQuery } from "../../graphql/versions.query.graphql.generated";
import { VersionItem } from "../version-item";

export const VersionsList = () => {
  const { pageId } = usePage();
  const [{ data: dataGetVersions }] = useGetVersionsQuery({
    pause: !pageId,
    variables: {
      where: {
        AND: {
          parent: {
            equals: pageId,
          },
        },
      },
    },
  });
  const versions = useMemo(
    () => dataGetVersions?.versions?.items || [],
    [dataGetVersions?.versions?.items]
  );
  return (
    <>
      {versions?.map((version) => (
        <VersionItem key={version?.id} version={version} />
      ))}
    </>
  );
};
