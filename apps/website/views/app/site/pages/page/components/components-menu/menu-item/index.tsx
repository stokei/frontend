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
  Title,
} from "@stokei/ui";
import { ComponentGroup } from "../types";

interface MenuItemProps {
  group: ComponentGroup;
}
export const MenuItem = ({ group }: MenuItemProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupButton>{group.title}</SidebarGroupButton>
      <SidebarGroupPanel withDivider={false}>
        <Stack direction="column" spacing="5" paddingLeft="5">
          <TreeSortable items={group.components}>
            {group.components?.map((component) => (
              <SortableItem key={component.id} {...component}>
                <SortableItemTrigger>
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
                </SortableItemTrigger>
              </SortableItem>
            ))}
          </TreeSortable>
        </Stack>
      </SidebarGroupPanel>
    </SidebarGroup>
  );
};
