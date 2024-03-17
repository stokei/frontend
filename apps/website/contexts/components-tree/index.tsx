import {
  GetVersionComponent,
  GetVersionResponse,
} from "@/services/axios/models/version";
import { DragAndDropProvider, arrayMove } from "@stokei/ui";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface ComponentsTreeProviderProps {
  version: GetVersionResponse;
}

export interface ComponentsTreeComponent extends GetVersionComponent {}

export interface ComponentsTreeProviderValues {
  readonly componentsTree: ComponentsTreeComponent[];
  readonly onRemoveComponent: (componentId: string) => void;
}

export const ComponentsTreeContext = createContext(
  {} as ComponentsTreeProviderValues
);

export const ComponentsTreeProvider = ({
  version,
  children,
}: PropsWithChildren<ComponentsTreeProviderProps>) => {
  const [componentsTree, setComponentsTree] = useState(version?.components);

  const componentsTreeMapped = useMemo(() => {
    const mapper = (
      component: ComponentsTreeComponent,
      index: number
    ): ComponentsTreeComponent => {
      return {
        ...component,
        order: index,
        components: component?.components?.map((currentComponent, position) =>
          mapper(currentComponent, position)
        ),
      };
    };

    return componentsTree?.map((component, index) => mapper(component, index));
  }, [componentsTree]);

  const getComponentByList = useCallback(
    (
      componentIdToGet: string,
      components: GetVersionComponent[]
    ): GetVersionComponent | undefined => {
      for (const component of components) {
        if (component?.id === componentIdToGet) {
          return component;
        }
        if (!component.components?.length) {
          continue;
        }
        return getComponentByList(componentIdToGet, component.components);
      }
    },
    []
  );

  const getComponent = useCallback(
    (componentId: string) => getComponentByList(componentId, componentsTree),
    [componentsTree, getComponentByList]
  );

  const addComponent = useCallback((newComponent: ComponentsTreeComponent) => {
    setComponentsTree((currentComponentsTree) => {
      const mapper = (
        newComponent: ComponentsTreeComponent,
        components: ComponentsTreeComponent[]
      ): ComponentsTreeComponent[] => {
        return components.map((component) => {
          const isParentComponent = component.parent === newComponent.parent;
          if (!isParentComponent) {
            return component;
          }
          const newComponents = component.components
            ? [...component.components]
            : [];
          newComponents?.splice(newComponent.order - 1, 0, newComponent);
          const updatedComponent: ComponentsTreeComponent = {
            ...component,
            components: newComponents?.map((comp, index) => ({
              ...comp,
              order: index + 1,
            })),
          };
          return updatedComponent;
        });
      };

      return mapper(newComponent, currentComponentsTree || []);
    });
  }, []);

  const removeComponent = useCallback(
    (componentId: string, components: ComponentsTreeComponent[]) => {
      return components.reduce<ComponentsTreeComponent[]>(
        (previousComponents, component) => {
          const isRemovedComponent = component.id === componentId;
          if (isRemovedComponent) {
            return previousComponents;
          }
          const updatedComponent: ComponentsTreeComponent = {
            ...component,
            components: component.components?.length
              ? removeComponent(componentId, component.components)
              : undefined,
          };
          return [...previousComponents, updatedComponent];
        },
        []
      );
    },
    []
  );

  const onRemoveComponent = useCallback(
    (componentId: string) =>
      setComponentsTree((currentTree) =>
        removeComponent(componentId, currentTree)
      ),
    [removeComponent]
  );

  const onDragEnd = useCallback(
    (activeComponentId: string, overComponentId: string) => {
      const activeComponent = getComponent(activeComponentId);
      const overComponent = getComponent(overComponentId);
      if (activeComponent && overComponent) {
        addComponent({
          ...activeComponent,
          parent: overComponent?.id,
          order: overComponent?.order,
        });
      }
    },
    [addComponent, getComponent]
  );

  const values = useMemo(
    () => ({
      componentsTree: componentsTreeMapped,
      onRemoveComponent,
    }),
    [componentsTreeMapped, onRemoveComponent]
  );

  return (
    <ComponentsTreeContext.Provider value={values}>
      <DragAndDropProvider
        onDragEnd={(event) => {
          const { active, over } = event;

          const isEqualOverAndActive =
            over && active && active?.id === over?.id;
          if (isEqualOverAndActive) {
            return;
          }
          const activeItem = getComponent(active?.id + "");
          const overItem = getComponent(over?.id + "");
          if (!activeItem || !overItem) {
            return;
          }
          console.log({
            activeItem,
            overItem,
          });
          setComponentsTree((tree) => {
            const mapper = (
              treeItems: ComponentsTreeComponent[]
            ): ComponentsTreeComponent[] => {
              return treeItems.map((treeItem) => {
                if (treeItem.id === overItem.id) {
                  return {
                    ...treeItem,
                    components: arrayMove(treeItem.components || [], 0, 0),
                  };
                }
                return {
                  ...treeItem,
                  components: mapper(treeItem.components || []),
                };
              });
            };
            return mapper(tree);
          });
          // setComponentsGroups((currentComponentsGroups) => {
          //   const newComponentsGroups = [...currentComponentsGroups];
          //   const newComponentGroup =
          //     newComponentsGroups[componentsGroupPosition];
          //   const oldComponentIndex = newComponentGroup.components.findIndex(
          //     (component) => component.id === active.id
          //   );
          //   const newComponentIndex = newComponentGroup.components.findIndex(
          //     (component) => component.id === over.id
          //   );

          //   newComponentsGroups[componentsGroupPosition] = {
          //     ...newComponentGroup,
          //     components: arrayMove(
          //       newComponentGroup.components,
          //       oldComponentIndex,
          //       newComponentIndex
          //     ),
          //   };
          //   return newComponentsGroups;
          // });
        }}
      >
        {children}
      </DragAndDropProvider>
    </ComponentsTreeContext.Provider>
  );
};
