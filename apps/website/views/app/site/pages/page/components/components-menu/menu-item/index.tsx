import {
  Card,
  CardBody,
  Draggable,
  DraggableTrigger,
  Image,
  SidebarGroup,
  SidebarGroupButton,
  SidebarGroupPanel,
  Stack,
  Title,
} from "@stokei/ui";
import { ComponentGroup } from "../types";

interface MenuItemProps {
  group: ComponentGroup;
  startActive?: boolean;
}
export const MenuItem = ({ group, startActive }: MenuItemProps) => {
  return (
    <SidebarGroup startActive={startActive}>
      <SidebarGroupButton>{group.title}</SidebarGroupButton>
      <SidebarGroupPanel withDivider={false}>
        <Stack direction="column" spacing="5" paddingLeft="5">
          {group.components?.map((component) => (
            <Draggable key={component.id} {...component}>
              <DraggableTrigger>
                <Card>
                  <CardBody>
                    <Stack direction="column" spacing="5">
                      {component.avatar && (
                        <Image src={component.avatar} alt={group.title} />
                      )}
                      {component.title && (
                        <Title fontSize="small">{component.title}</Title>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              </DraggableTrigger>
            </Draggable>
          ))}
        </Stack>
      </SidebarGroupPanel>
    </SidebarGroup>
  );
};
