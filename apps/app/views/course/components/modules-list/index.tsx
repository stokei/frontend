import { OrderBy } from "@/services/graphql/stokei";
import { Accordion, Box } from "@stokei/ui";
import { FC } from "react";
import { useGetModulesQuery } from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";
import { ModuleLoading } from "../module-loading";

interface ModulesListProps {
  readonly courseId?: string;
}

export const ModulesList: FC<ModulesListProps> = ({ courseId }) => {
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
    <Box width="full" flex="1" flexDirection="column">
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
