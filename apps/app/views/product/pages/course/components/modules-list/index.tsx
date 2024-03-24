import { OrderBy } from "@/services/graphql/stokei";
import { Accordion, Box } from "@stokei/ui";

import { useGetModulesQuery } from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";
import { ModuleLoading } from "../module-loading";

interface ModulesListProps {
  readonly courseId?: string;
}

export const ModulesList = ({ courseId }: ModulesListProps) => {
  const [{ fetching: isLoading, data: dataModules }] = useGetModulesQuery({
    variables: {
      where: {
        AND: {
          parent: {
            equals: courseId,
          },
        },
      },
      orderBy: {
        createdAt: OrderBy.Asc,
      },
    },
  });

  if (!dataModules?.modules?.totalCount) {
    return <></>;
  }

  return (
    <Box width="full" flexDirection="column">
      {isLoading ? (
        <ModuleLoading />
      ) : (
        <Accordion defaultIndex={[0]}>
          {dataModules?.modules?.items?.map((module) => (
            <ModuleItem key={module?.id} module={module} />
          ))}
        </Accordion>
      )}
    </Box>
  );
};
