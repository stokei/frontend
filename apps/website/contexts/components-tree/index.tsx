import { useCreateComponentsTree } from "@/hooks/use-create-components-tree";
import {
  GetVersionComponent,
  GetVersionResponse,
} from "@/services/axios/models/version";
import { ComponentType } from "@/services/graphql/stokei";
import { DragAndDropProvider, arrayMove } from "@stokei/ui";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useUpdateComponentMutation } from "./graphql/update-component.mutation.graphql.generated";
import { useRunMultipleRequests } from "@/hooks/use-run-multiple-requests";
import { useUpdateComponentsOrderMutation } from "./graphql/update-components-order.mutation.graphql.generated";

export interface ComponentsTreeProviderProps {
  version: GetVersionResponse;
}

export interface ComponentsTreeComponent extends GetVersionComponent {}

export type UpdateCallback = (
  component: ComponentsTreeComponent
) => ComponentsTreeComponent;

export type AddedCallback = (component: ComponentsTreeComponent) => void;
export type InvalidCallback = (component: ComponentsTreeComponent) => void;

export interface ComponentsTreeProviderValues {
  readonly components: ComponentsTreeComponent[];
  readonly isSavingComponents: boolean;
  readonly onRemoveComponent: (data: { componentId: string }) => void;
  readonly onUpdateComponent: (data: {
    componentId: string;
    updateCallback: UpdateCallback;
  }) => void;
}

const createComponentMap = (
  components: ComponentsTreeComponent[]
): Map<string, ComponentsTreeComponent> => {
  const map = new Map<string, ComponentsTreeComponent>();
  components.forEach((component) => {
    map.set(component.id, component);
    if (!!component?.components?.length) {
      createComponentMap(component.components).forEach((subComponent, id) => {
        map.set(id, subComponent);
      });
    }
  });
  return map;
};

export const ComponentsTreeContext = createContext(
  {} as ComponentsTreeProviderValues
);

export const ComponentsTreeProvider = ({
  version,
  children,
}: PropsWithChildren<ComponentsTreeProviderProps>) => {
  const [components, setComponents] = useState<ComponentsTreeComponent[]>(
    version?.components
  );
  const [componentMap, setComponentMap] = useState<
    Map<string, ComponentsTreeComponent>
  >(createComponentMap(version?.components));

  const [isSavingComponents, setIsSavingComponents] = useState<boolean>(false);
  const [isActiveUpdateComponentOrders, setIsActiveUpdateComponentOrders] =
    useState<boolean>(false);

  const { onCreateComponentsTree } = useCreateComponentsTree();

  const [{}, onExecuteUpdateComponentsOrder] =
    useUpdateComponentsOrderMutation();

  const onUpdateComponetOrders = useCallback(
    async (currentComponents: ComponentsTreeComponent[]) => {
      setIsSavingComponents(true);
      try {
        const response = await onExecuteUpdateComponentsOrder({
          input: {
            components: currentComponents?.map(({ id }) => id),
          },
        });
        if (response?.data?.updateComponentsOrder?.length) {
          setIsActiveUpdateComponentOrders(false);
        }
      } catch (error) {}
      setIsSavingComponents(false);
    },
    [onExecuteUpdateComponentsOrder]
  );

  useEffect(() => {
    if (isActiveUpdateComponentOrders) {
      onUpdateComponetOrders(components);
    }
  }, [components, isActiveUpdateComponentOrders, onUpdateComponetOrders]);

  const updateComponentInTree = useCallback(
    (
      components: ComponentsTreeComponent[],
      componentId: string,
      updateCallback: UpdateCallback
    ): ComponentsTreeComponent[] => {
      if (!componentId) {
        return components;
      }
      return components.map((component) => {
        if (component.id === componentId) {
          return updateCallback(component);
        }
        return {
          ...component,
          components: updateComponentInTree(
            component.components || [],
            componentId,
            updateCallback
          ),
        };
      });
    },
    []
  );

  const removeComponentInTree = useCallback(
    (componentId: string, components: ComponentsTreeComponent[]) => {
      if (!componentId) {
        return components;
      }
      return components.reduce<ComponentsTreeComponent[]>(
        (previousComponents, component) => {
          const isRemovedComponent = component.id === componentId;
          if (isRemovedComponent) {
            return previousComponents;
          }
          const updatedComponent: ComponentsTreeComponent = {
            ...component,
            components: component.components?.length
              ? removeComponentInTree(componentId, component.components)
              : undefined,
          };
          return [...previousComponents, updatedComponent];
        },
        []
      );
    },
    []
  );

  const getComponentById = useCallback(
    (componentId: string): ComponentsTreeComponent | undefined => {
      return componentMap.get(componentId);
    },
    [componentMap]
  );

  const onAddComponent = useCallback(
    ({
      overId,
      newComponent,
      overIndex,
      onAdded,
      onInvalid,
    }: {
      overId: string;
      newComponent: ComponentsTreeComponent;
      overIndex: number;
      onAdded?: AddedCallback;
      onInvalid?: InvalidCallback;
    }) => {
      setComponents((prevComponents) => {
        const updatedComponents = updateComponentInTree(
          prevComponents,
          overId,
          (over) => {
            const isValidType = over?.acceptTypes?.includes(newComponent.type);
            if (!isValidType) {
              onInvalid?.(newComponent);
              return over;
            }
            newComponent.parent = over.id;
            newComponent.order = overIndex;
            const newComponents = [...(over.components || [])];
            newComponents.splice(overIndex, 0, newComponent);
            const componentUpdated = {
              ...over,
              components: newComponents,
            };
            onAdded?.(componentUpdated);
            return componentUpdated;
          }
        );
        setComponentMap(createComponentMap(updatedComponents));
        return updatedComponents;
      });
    },
    [updateComponentInTree]
  );

  const onUpdateComponent = useCallback(
    ({
      componentId,
      updateCallback,
    }: {
      componentId: string;
      updateCallback: UpdateCallback;
    }) => {
      setComponents((prevComponents) => {
        const updatedComponents = updateComponentInTree(
          prevComponents,
          componentId,
          updateCallback
        );
        setComponentMap(createComponentMap(updatedComponents));
        return updatedComponents;
      });
    },
    [updateComponentInTree]
  );

  const onRemoveComponent = useCallback(
    ({ componentId }: { componentId: string }) => {
      let currentComponent = getComponentById(componentId);
      if (!currentComponent) {
        return;
      }
      const isBlockComponent = (type: ComponentType) =>
        type === ComponentType.Block;
      if (!isBlockComponent(currentComponent.type)) {
        const parentComponent = getComponentById(currentComponent.parent);
        if (parentComponent) {
          const parentIsBlockComponent = isBlockComponent(parentComponent.type);
          const isLastParentComponent =
            parentComponent.components?.length === 1;
          if (parentIsBlockComponent && isLastParentComponent) {
            currentComponent = parentComponent;
          }
        }
      }

      setComponents((prevComponents) => {
        const updatedComponents = removeComponentInTree(
          currentComponent?.id || "",
          prevComponents
        );
        setComponentMap(createComponentMap(updatedComponents));
        return updatedComponents;
      });
    },
    [getComponentById, removeComponentInTree]
  );

  const values = useMemo(
    () => ({
      components,
      isSavingComponents,
      onUpdateComponent,
      onRemoveComponent,
    }),
    [components, isSavingComponents, onRemoveComponent, onUpdateComponent]
  );

  return (
    <ComponentsTreeContext.Provider value={values}>
      <DragAndDropProvider
        onDragEnd={async (event) => {
          const { active, over } = event;
          const isEqualOverAndActive =
            over && active && active?.id === over?.id;
          if (isEqualOverAndActive) {
            return;
          }
          if (!active?.id || !over?.id) {
            return;
          }
          const isNewItem = !!active?.data?.current?.isNew;
          if (isNewItem) {
            const overItem = getComponentById(over?.id + "");
            if (!overItem) {
              return;
            }
            const activeTreeWithNewParent = active?.data?.current?.tree?.map(
              (treeItem: any) => ({
                ...treeItem,
                parent: overItem?.parent + "",
              })
            );
            const newComponentTree = await onCreateComponentsTree({
              tree: activeTreeWithNewParent,
            });
            if (!newComponentTree?.length) {
              return;
            }
            setComponents((prevComponents) => {
              const currentComponents = [...prevComponents];
              currentComponents.splice(
                over?.data?.current?.sortable?.index,
                0,
                ...newComponentTree
              );
              const componentsWithNewOrder = currentComponents?.map(
                (oldComponent, index) => ({ ...oldComponent, order: index })
              );
              return componentsWithNewOrder;
            });
            setIsActiveUpdateComponentOrders(true);
            return;
          }

          setComponents((prevComponents) => {
            const currentComponents = arrayMove(
              prevComponents,
              active?.data?.current?.sortable?.index,
              over?.data?.current?.sortable?.index
            );
            const componentsWithNewOrder = currentComponents?.map(
              (oldComponent, index) => ({ ...oldComponent, order: index })
            );
            return componentsWithNewOrder;
          });
          setIsActiveUpdateComponentOrders(true);
        }}
      >
        {children}
      </DragAndDropProvider>
    </ComponentsTreeContext.Provider>
  );
};
