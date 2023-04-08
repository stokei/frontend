import { Accordion, Box } from "@stokei/ui";
import { FC } from "react";
import {
  AdminCoursePageModuleFragment,
  AdminCoursePageModuleVideoFragment,
} from "../../graphql/modules.query.graphql.generated";
import { ModuleItem } from "../module-item";

interface ModulesListProps {
  readonly modules?: AdminCoursePageModuleFragment[];
  readonly onOpenConfirmVideoPreviewModal: (
    video?: AdminCoursePageModuleVideoFragment
  ) => void;
  readonly onOpenConfirmRemoveModuleModal: (
    module?: AdminCoursePageModuleFragment
  ) => void;
}

export const ModulesList: FC<ModulesListProps> = ({
  modules,
  onOpenConfirmVideoPreviewModal,
  onOpenConfirmRemoveModuleModal,
}) => {
  return (
    <>
      {modules?.map((module, position) => (
        <ModuleItem
          key={module?.id}
          module={module}
          isFirstModule={position === 0}
          onOpenConfirmVideoPreviewModal={onOpenConfirmVideoPreviewModal}
          onOpenConfirmRemoveModuleModal={onOpenConfirmRemoveModuleModal}
        />
      ))}
    </>
  );
};
