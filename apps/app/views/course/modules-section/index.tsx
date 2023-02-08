import { OrderBy } from "@/services/graphql/stokei";
import { Accordion, Container } from "@stokei/ui";
import { FC } from "react";
import { Module } from "../module";
import { ModuleSkeleton } from "../module-skeleton";
import { useGetModulesQuery } from "./modules.query.graphql.generated";

interface ModulesSectionProps {
  readonly courseId?: string;
}

export const ModulesSection: FC<ModulesSectionProps> = ({ courseId }) => {
  const [{ fetching: isLoading, data: dataModules }, loadQuery] =
    useGetModulesQuery({
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

  return (
    <Container paddingY="5">
      {isLoading ? (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <ModuleSkeleton key={i} />
          ))}
        </>
      ) : (
        <Accordion defaultIndex={[0]}>
          {dataModules?.modules?.items?.map((module) => (
            <Module key={module?.id} module={module} />
          ))}
        </Accordion>
      )}
    </Container>
  );
};
