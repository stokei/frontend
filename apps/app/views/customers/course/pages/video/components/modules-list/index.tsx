import { CustomersCoursePageVideoModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";

interface ModulesListProps {
  readonly activeModuleIndex?: number;
  readonly modules?: CustomersCoursePageVideoModuleFragment[];
}

export const ModulesList = ({
  modules,
  activeModuleIndex,
}: ModulesListProps) => {
  return (
    <>
      {modules?.map((module, position) => (
        <ModuleItem
          key={module?.id}
          module={module}
          isOpen={position === activeModuleIndex}
        />
      ))}
    </>
  );
};
