import { useCreateComponentsTree } from "@/hooks/use-create-components-tree";
import {
  GetVersionComponent,
  GetVersionResponse,
} from "@/services/axios/models/version";
import { ComponentType } from "@/services/graphql/stokei";
import {
  DragAndDropDragEndEvent,
  DragAndDropProvider,
  arrayMove,
} from "@stokei/ui";
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
import { useRemoveComponentMutation } from "./graphql/remove-component.mutation.graphql.generated";

export interface ComponentsTreeProviderProps {
  version: GetVersionResponse;
}

export interface ComponentsTreeComponent extends GetVersionComponent { }

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
    updateData: any;
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

  const [{ }, onExecuteUpdateComponentsOrder] =
    useUpdateComponentsOrderMutation();
  const [{ }, onExecuteUpdateComponent] = useUpdateComponentMutation();
  const [{ }, onExecuteRemoveComponent] = useRemoveComponentMutation();

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
      } catch (error) { }
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

  const onUpdateComponent = useCallback(
    async ({
      componentId,
      updateData,
    }: {
      componentId: string;
      updateData: any;
    }) => {
      setComponents((prevComponents) => {
        const updatedComponents = updateComponentInTree(
          prevComponents,
          componentId,
          (oldComponent) => ({
            ...oldComponent,
            data: { ...oldComponent?.data, ...updateData },
          })
        );
        setComponentMap(createComponentMap(updatedComponents));
        return updatedComponents;
      });
      try {
        const currentComponent = getComponentById(componentId);
        if (!currentComponent) {
          return;
        }
        await onExecuteUpdateComponent({
          input: {
            data: {
              data: updateData,
            },
            where: {
              component: currentComponent?.id || "",
            },
          },
        });
      } catch (error) { }
    },
    [getComponentById, onExecuteUpdateComponent, updateComponentInTree]
  );

  const onRemoveComponent = useCallback(
    async ({ componentId }: { componentId: string }) => {
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
      try {
        await onExecuteRemoveComponent({
          input: {
            where: {
              component: currentComponent?.id || "",
            },
          },
        });
      } catch (error) { }
      setIsActiveUpdateComponentOrders(true);
    },
    [getComponentById, onExecuteRemoveComponent, removeComponentInTree]
  );

  const onAddNewActiveItem = useCallback(
    async (
      { over, active }: DragAndDropDragEndEvent,
      isEmptyOverItem: boolean
    ) => {
      const overItemParent = isEmptyOverItem
        ? version?.id
        : getComponentById(over?.id + "")?.parent;
      if (!overItemParent) {
        return;
      }

      const activeTreeWithNewParent = active?.data?.current?.tree?.map(
        (treeItem: ComponentsTreeComponent) => ({
          ...treeItem,
          parent: overItemParent,
        })
      );
      const newComponentTree = await onCreateComponentsTree({
        tree: activeTreeWithNewParent,
      });
      if (!newComponentTree?.length) {
        return;
      }
      if (isEmptyOverItem) {
        const updatedComponents = [...newComponentTree];
        setComponents(updatedComponents);
        setComponentMap(createComponentMap(updatedComponents));
        return;
      }
      const overItem = getComponentById(over?.id + "");
      if (!overItem) {
        return;
      }

      setComponents((prevComponents) => {
        const currentComponents = [...prevComponents];
        currentComponents.splice(overItem.order, 0, ...newComponentTree);
        const componentsWithNewOrder = currentComponents?.map(
          (oldComponent, index) => ({ ...oldComponent, order: index })
        );
        setComponentMap(createComponentMap(componentsWithNewOrder));
        return componentsWithNewOrder;
      });
      setIsActiveUpdateComponentOrders(true);
    },
    [getComponentById, onCreateComponentsTree, version?.id]
  );

  const onAddExistingActiveItem = useCallback(
    async ({ over, active }: DragAndDropDragEndEvent) => {
      const activeItem = getComponentById(active?.id + "");
      const overItem = getComponentById(over?.id + "");
      if (!overItem || !activeItem) {
        return;
      }

      setComponents((prevComponents) => {
        const currentComponents = arrayMove(
          prevComponents,
          activeItem?.order,
          overItem?.order
        );
        const componentsWithNewOrder = currentComponents?.map(
          (oldComponent, index) => ({ ...oldComponent, order: index })
        );
        setComponentMap(createComponentMap(componentsWithNewOrder));
        return componentsWithNewOrder;
      });
      setIsActiveUpdateComponentOrders(true);
    },
    [getComponentById]
  );

  const onDragEnd = useCallback(
    async (event: DragAndDropDragEndEvent) => {
      const { active, over } = event;
      console.log({ active, over })
      if (!active?.id || !over?.id) {
        return;
      }
      const isSameItem = active.id === over.id;
      if (isSameItem) {
        return;
      }
      const isNewActiveItem = !!active?.data?.current?.isNew;
      const isEmptyOverItem = !!over?.data?.current?.isEmpty;
      if (isNewActiveItem) {
        return onAddNewActiveItem(event, isEmptyOverItem);
      }
      return onAddExistingActiveItem(event);
    },
    [onAddExistingActiveItem, onAddNewActiveItem]
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
      <DragAndDropProvider onDragEnd={onDragEnd}>
        {children}
      </DragAndDropProvider>
    </ComponentsTreeContext.Provider>
  );
};
