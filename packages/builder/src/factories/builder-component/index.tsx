import { PropsWithChildren, ReactNode, useMemo } from "react";
import {
  Button,
  Card,
  Catalog,
  Grid,
  GridItem,
  Hero,
  HeroContent,
  HeroMedia,
  Image,
  Space,
  Stack,
  Text,
  Title,
  Video,
} from "../../builder-components";
import { ComponentType } from "../../services/graphql/stokei";
import { BaseComponent } from "../../types/base-component";
import { ComponentBuilderType } from "../../types/component-builder-type";

export interface BuilderComponentData {
  id: string;
  order: number;
  data?: any;
  type: ComponentType;
  acceptTypes?: ComponentType[];
  components?: BuilderComponentData[];
}

interface BuilderComponentProps extends BuilderComponentData {
  builderType: ComponentBuilderType;
  onRedirect: (route: string) => void;
  onRemove?: (
    componentId: string,
    componentOrder: number,
    componentType: ComponentType
  ) => void;
}

const getComponent = ({
  componentType,
  builderType,
}: {
  componentType: ComponentType;
  builderType: ComponentBuilderType;
}) => {
  const components: Record<ComponentType, BaseComponent | undefined> = {
    [ComponentType.Header]: undefined,
    [ComponentType.Footer]: undefined,
    [ComponentType.Navlink]: undefined,
    [ComponentType.Menu]: undefined,
    [ComponentType.MenuItem]: undefined,
    [ComponentType.Hero]: Hero[builderType],
    [ComponentType.HeroMedia]: HeroMedia[builderType],
    [ComponentType.HeroContent]: HeroContent[builderType],
    [ComponentType.Button]: Button[builderType],
    [ComponentType.Catalog]: Catalog[builderType],
    [ComponentType.Card]: Card[builderType],
    [ComponentType.Grid]: Grid[builderType],
    [ComponentType.GridItem]: GridItem[builderType],
    [ComponentType.Image]: Image[builderType],
    [ComponentType.Video]: Video[builderType],
    [ComponentType.Stack]: Stack[builderType],
    [ComponentType.Text]: Text[builderType],
    [ComponentType.Title]: Title[builderType],
    [ComponentType.Space]: Space[builderType],
  };
  return components[componentType] as ReactNode;
};

export const BuilderComponent = ({
  builderType,
  type,
  acceptTypes,
  components,
  onRedirect,
  onRemove,
  ...props
}: PropsWithChildren<BuilderComponentProps>) => {
  const Component = useMemo(
    () =>
      getComponent({
        componentType: type,
        builderType,
      }) as any,
    [builderType, type]
  );
  if (!Component) {
    return <></>;
  }
  return (
    <Component
      onRedirect={onRedirect}
      type={type}
      builderType={builderType}
      acceptTypes={acceptTypes}
      onRemove={
        onRemove ? () => onRemove(props?.id, props?.order, type) : undefined
      }
      {...props}
    >
      {components?.map((component) => (
        <BuilderComponent
          key={component?.id}
          builderType={builderType}
          onRedirect={onRedirect}
          onRemove={onRemove}
          {...component}
        />
      ))}
    </Component>
  );
};
