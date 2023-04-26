import { FC } from "react";
import { CustomersCoursePageVideoModuleFragment } from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";

interface ModulesListProps {
  readonly activeModuleIndex?: number;
  readonly modules?: CustomersCoursePageVideoModuleFragment[];
}

export const ModulesList: FC<ModulesListProps> = ({
  modules,
  activeModuleIndex,
}) => {
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
