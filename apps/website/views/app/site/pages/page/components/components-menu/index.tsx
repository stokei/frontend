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

const defaultComponentsGroups = [
  {
    title: "heros",
    components: [
      {
        id: ComponentType.Hero + "-1",
        avatar: "",
        parent: "",
        order: 1,
        type: ComponentType.Hero,
        acceptTypes: [],
        name: "hero",
        data: {
          isNew: true,
          tree: [
            {
              parent: "",
              type: ComponentType.Block,
              components: [
                {
                  parent: "",
                  type: ComponentType.Hero,
                  components: [
                    {
                      parent: "",
                      type: ComponentType.HeroContent,
                      components: [
                        {
                          parent: "",
                          type: ComponentType.Title,
                          data: {
                            value: "New hero",
                          },
                          components: [],
                        },
                      ],
                    },
                    {
                      parent: "",
                      type: ComponentType.HeroMedia,
                      components: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

export const ComponentsMenu = () => {
  const translate = useTranslations();
  const [componentsGroups, setComponentsGroups] = useState<ComponentGroup[]>(
    () => defaultComponentsGroups
  );

  return (
    <>
      {componentsGroups?.map((componentsGroup, componentsGroupPosition) => (
        <SidebarGroup key={componentsGroupPosition}>
          <SidebarGroupButton>
            {translate.formatMessage({ id: componentsGroup.title as any })}
          </SidebarGroupButton>
          <SidebarGroupPanel withDivider={false}>
            <Stack direction="column" spacing="5" paddingLeft="5">
              <TreeSortable items={componentsGroup.components}>
                {componentsGroup.components?.map((component) => (
                  <SortableItem key={component.id} {...component}>
                    <SortableItemTrigger>
                      <Card>
                        <CardBody>
                          <Stack direction="column" spacing="5">
                            <Text>
                              {translate.formatMessage({
                                id: component.name as any,
                              })}
                            </Text>
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
