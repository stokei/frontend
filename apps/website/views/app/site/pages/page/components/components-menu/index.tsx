import { useTranslations } from "@/hooks";
import { TreeSortable } from "@stokei/builder";
import {
  Card,
  CardBody,
  Image,
  SidebarGroup,
  SidebarGroupButton,
  SidebarGroupPanel,
  SortableItem,
  SortableItemTrigger,
  Stack,
} from "@stokei/ui";
import { useState } from "react";
import { getDefaultComponentsGroups } from "../../mappers/get-default-components-groups";
import { ComponentGroup } from "./types";

export const ComponentsMenu = () => {
  const translate = useTranslations();
  const [componentsGroups, setComponentsGroups] = useState<ComponentGroup[]>(
    () => getDefaultComponentsGroups({ formatMessage: translate.formatMessage })
  );

  return (
    <>
      {componentsGroups?.map((componentsGroup, componentsGroupPosition) => (
        <SidebarGroup key={componentsGroupPosition}>
          <SidebarGroupButton>{componentsGroup.title}</SidebarGroupButton>
          <SidebarGroupPanel withDivider={false}>
            <Stack direction="column" spacing="5" paddingLeft="5">
              <TreeSortable items={componentsGroup.components}>
                {componentsGroup.components?.map((component) => (
                  <SortableItem key={component.id} {...component}>
                    <SortableItemTrigger>
                      <Card>
                        <CardBody>
                          <Stack direction="column" spacing="5">
                            <Image
                              src={component.avatar}
                              alt={componentsGroup.title}
                            />
                          </Stack>
                        </CardBody>
                      </Card>
                    </SortableItemTrigger>
                  </SortableItem>
                ))}
              </TreeSortable>
            </Stack>
          </SidebarGroupPanel>
        </SidebarGroup>
      ))}
    </>
  );
};
