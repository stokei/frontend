import { ComponentsTreeComponent } from "@/contexts";
import { useTranslations } from "@/hooks";
import { ComponentType } from "@/services/graphql/stokei";
import { TreeSortable } from "@stokei/builder";
import {
  Card,
  CardBody,
  Draggable,
  DraggableTrigger,
  SidebarGroup,
  SidebarGroupButton,
  SidebarGroupPanel,
  Stack,
  Text,
  SortableItem,
  SortableProvider,
  arrayMove,
  SortableItemTrigger,
} from "@stokei/ui";
import { useState } from "react";

interface Component extends ComponentsTreeComponent {
  avatar: string;
  name: string;
}

interface ComponentGroup {
  title: string;
  components: Component[];
}

export const ComponentsMenu = () => {
  const translate = useTranslations();
  const [componentsGroups, setComponentsGroups] = useState<ComponentGroup[]>([
    {
      title: translate.formatMessage({ id: "title" }),
      components: [
        {
          id: "ComponentType-1",
          avatar: "",
          parent: "",
          order: 1,
          type: ComponentType.Button,
          acceptTypes: [ComponentType.Button],
          name: translate.formatMessage({ id: "home" }),
        },
        {
          id: "ComponentType-2",
          avatar: "",
          parent: "",
          order: 2,
          type: ComponentType.Catalog,
          acceptTypes: [ComponentType.Catalog],
          name: translate.formatMessage({ id: "catalog" }),
        },
        {
          id: "ComponentType-3",
          avatar: "",
          parent: "",
          order: 2,
          type: ComponentType.Title,
          acceptTypes: [ComponentType.Title],
          name: translate.formatMessage({ id: "title" }),
        },
      ],
    },
    {
      title: translate.formatMessage({ id: "title" }),
      components: [
        {
          id: "ComponentType-4",
          avatar: "",
          parent: "",
          order: 1,
          type: ComponentType.Button,
          acceptTypes: [ComponentType.Button],
          name: translate.formatMessage({ id: "cancel" }),
        },
        {
          id: "ComponentType-5",
          avatar: "",
          parent: "",
          order: 2,
          type: ComponentType.Catalog,
          acceptTypes: [ComponentType.Catalog],
          name: translate.formatMessage({ id: "sale" }),
        },
        {
          id: "ComponentType-6",
          avatar: "",
          parent: "",
          order: 2,
          type: ComponentType.Title,
          acceptTypes: [ComponentType.Title],
          name: translate.formatMessage({ id: "close" }),
        },
      ],
    },
    {
      title: translate.formatMessage({ id: "title" }),
      components: [],
    },
    {
      title: translate.formatMessage({ id: "title" }),
      components: [],
    },
  ]);

  return (
    <>
      {componentsGroups?.map((componentsGroup, componentsGroupPosition) => (
        <SidebarGroup key={componentsGroupPosition}>
          <SidebarGroupButton>{componentsGroup.title}</SidebarGroupButton>
          <SidebarGroupPanel withDivider={false}>
            <Stack direction="column" spacing="5" paddingLeft="5">
              <TreeSortable items={componentsGroup.components}>
                {componentsGroup.components?.map((component) => (
                  <SortableItem
                    key={component.id}
                    id={component.id}
                    type={component.type}
                  >
                    <SortableItemTrigger>
                      <Card>
                        <CardBody>
                          <Stack direction="column" spacing="5">
                            <Text>{component.name}</Text>
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
