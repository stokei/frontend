import { useTranslations } from "@/hooks";
import { ComponentType } from "@/services/graphql/stokei";
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
} from "@stokei/ui";

export const ComponentsMenu = () => {
  const translate = useTranslations();
  const componentsGroups = [
    {
      title: translate.formatMessage({ id: "buttons" }),
      components: [
        {
          id: "1",
          avatar: "",
          type: ComponentType.Button,
          acceptTypes: [ComponentType.Button],
          name: translate.formatMessage({ id: "home" }),
        },
        {
          id: "2",
          avatar: "",
          type: ComponentType.Button,
          acceptTypes: [ComponentType.Button],
          name: translate.formatMessage({ id: "catalog" }),
        },
      ],
    },
    {
      title: translate.formatMessage({ id: "heros" }),
    },
    {
      title: translate.formatMessage({ id: "catalogs" }),
    },
    {
      title: translate.formatMessage({ id: "typograph" }),
    },
  ];
  return (
    <>
      {componentsGroups?.map((componentsGroup) => (
        <SidebarGroup key={componentsGroup.title}>
          <SidebarGroupButton>{componentsGroup.title}</SidebarGroupButton>
          <SidebarGroupPanel withDivider={false}>
            <Stack direction="column" spacing="5" paddingLeft="5">
              {componentsGroup.components?.map((component) => (
                <Draggable
                  key={component.id}
                  id={component.id}
                  type={component.type}
                >
                  <DraggableTrigger>
                    <Card>
                      <CardBody>
                        <Stack direction="column" spacing="5">
                          <Text>{component.name}</Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </DraggableTrigger>
                </Draggable>
              ))}
            </Stack>
          </SidebarGroupPanel>
        </SidebarGroup>
      ))}
    </>
  );
};
