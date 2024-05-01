import { CustomersCoursePageModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";

interface ModulesListProps {
  readonly modules?: CustomersCoursePageModuleFragment[];
}

export const ModulesList = ({ modules }: ModulesListProps) => {
  return (
    <>
      {modules?.map((module, position) => (
        <ModuleItem
          key={module?.id}
          module={module}
          isFirstModule={position === 0}
        />
      ))}
    </>
  );
};
