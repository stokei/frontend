import {
  GetVersionComponent,
  GetVersionResponse,
} from "@/services/axios/models/version";
import { DragAndDropProvider } from "@stokei/ui";
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
      // FAZER ISSO FUNCIONAR
      const mapper = (
        component: ComponentsTreeComponent,
        index: number
      ): ComponentsTreeComponent => {
        if (component.parent === newComponent.parent) {
          const newComponents = component.components?.splice(
            index + 1,
            0,
            newComponent
          );
          return {
            ...component,
            order: index,
            components: newComponents,
          };
        }
        return {
          ...component,
          order: index,
          components: component?.components?.map((currentComponent, position) =>
            mapper(currentComponent, position)
          ),
        };
      };

      return currentComponentsTree?.map((component, index) =>
        mapper(component, index)
      );
    });
  }, []);

  const onDragEnd = useCallback(
    (activeComponentId: string, overComponentId: string) => {
      const activeComponent = getComponent(activeComponentId);
      const overComponent = getComponent(overComponentId);
      if (activeComponent && overComponent) {
        addComponent({
          ...activeComponent,
          parent: overComponent?.id,
        });
      }
    },
    [addComponent, getComponent]
  );

  const values = useMemo(
    () => ({
      componentsTree: componentsTreeMapped,
    }),
    [componentsTreeMapped]
  );

  return (
    <ComponentsTreeContext.Provider value={values}>
      <DragAndDropProvider
        onDragEnd={({ active, over }) => {
          console.log({ active, over });
          onDragEnd(
            active?.data?.current?.id + "",
            over?.data?.current?.id + ""
          );
        }}
      >
        {children}
      </DragAndDropProvider>
    </ComponentsTreeContext.Provider>
  );
};
