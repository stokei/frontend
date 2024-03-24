import { Accordion, Box } from "@stokei/ui";

import {
  AdminCoursePageModuleFragment,
  AdminCoursePageModuleVideoFragment,
} from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";

interface ModulesListProps {
  readonly modules?: AdminCoursePageModuleFragment[];
  readonly onOpenConfirmRemoveModuleModal: (
    module?: AdminCoursePageModuleFragment
  ) => void;
  readonly onOpenEditModule: (module?: AdminCoursePageModuleFragment) => void;
}

export const ModulesList = ({
  modules,
  onOpenEditModule,
  onOpenConfirmRemoveModuleModal,
}: ModulesListProps) => {
  return (
    <>
      {modules?.map((module, position) => (
        <ModuleItem
          key={module?.id}
          module={module}
          isFirstModule={position === 0}
          onOpenEditModule={onOpenEditModule}
          onOpenConfirmRemoveModuleModal={onOpenConfirmRemoveModuleModal}
        />
      ))}
    </>
  );
};
