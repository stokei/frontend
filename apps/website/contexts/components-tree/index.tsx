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

export type UpdateCallback = (
  component: ComponentsTreeComponent
) => ComponentsTreeComponent;

export type AddedCallback = (component: ComponentsTreeComponent) => void;
export type InvalidCallback = (component: ComponentsTreeComponent) => void;

export interface ComponentsTreeProviderValues {
  readonly components: ComponentsTreeComponent[];
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

  const updateComponentInTree = useCallback(
    (
      components: ComponentsTreeComponent[],
      componentId: string,
      updateCallback: UpdateCallback
    ): ComponentsTreeComponent[] => {
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
    ({ componentId }: { componentId: string }) =>
      setComponents((prevComponents) => {
        const updatedComponents = removeComponentInTree(
          componentId,
          prevComponents
        );
        setComponentMap(createComponentMap(updatedComponents));
        return updatedComponents;
      }),
    [removeComponentInTree]
  );

  const onDragEnd = useCallback(
    async (
      activeComponentId: string,
      overComponentId: string,
      overIndex: number
    ) => {
      const activeComponent = getComponentById(activeComponentId);
      const overComponent = getComponentById(overComponentId);
      if (activeComponent && overComponent) {
        onRemoveComponent({
          componentId: activeComponent.id,
        });
        let added = false;
        const existsAcceptTypes = !!overComponent.acceptTypes?.length;

        const addComponentAgain = () =>
          onAddComponent({
            overId: activeComponent.parent,
            newComponent: activeComponent,
            overIndex: activeComponent.order,
          });
        const addActiveComponentToParentBecauseTheOverComponentIsSimilarToActiveComponent =
          (): Promise<boolean> => {
            return new Promise((resolve) => {
              onAddComponent({
                overId: overComponent.parent,
                newComponent: activeComponent,
                overIndex,
                onAdded: (componentAdded) => resolve(!!componentAdded),
                onInvalid: () => resolve(false),
              });
            });
          };
        const addActiveComponent = (): Promise<boolean> => {
          return new Promise((resolve) => {
            onAddComponent({
              overId: overComponentId,
              newComponent: activeComponent,
              overIndex: overIndex,
              onAdded: (componentAdded) => resolve(!!componentAdded),
              onInvalid: () => resolve(false),
            });
          });
        };

        if (!existsAcceptTypes) {
          added =
            await addActiveComponentToParentBecauseTheOverComponentIsSimilarToActiveComponent();
        } else {
          added = await addActiveComponent();
        }
        if (!added) {
          addComponentAgain();
        }
      }
    },
    [getComponentById, onAddComponent, onRemoveComponent]
  );

  const values = useMemo(
    () => ({
      components,
      onUpdateComponent,
      onRemoveComponent,
    }),
    [components, onRemoveComponent, onUpdateComponent]
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
          if (!active?.id || !over?.id) {
            return;
          }
          onDragEnd(
            active?.id + "",
            over?.id + "",
            over?.data?.current?.sortable?.index || 0
          );
        }}
      >
        {children}
      </DragAndDropProvider>
    </ComponentsTreeContext.Provider>
  );
};
