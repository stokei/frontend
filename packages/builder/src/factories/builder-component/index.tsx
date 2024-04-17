import { PropsWithChildren, ReactNode, useMemo } from "react";
import {
  Block,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Catalog,
  Grid,
  GridItem,
  Hero,
  HeroContent,
  HeroMedia,
  Image,
  Navbar,
  Navlink,
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
  onRemove?: (componentId: string) => void;
  onUpdate?: (componentId: string, data: any) => void;
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
    [ComponentType.Block]: Block[builderType],
    [ComponentType.Navlink]: Navlink[builderType],
    [ComponentType.Navbar]: Navbar[builderType],
    [ComponentType.Menu]: undefined,
    [ComponentType.MenuItem]: undefined,
    [ComponentType.Hero]: Hero[builderType],
    [ComponentType.HeroMedia]: HeroMedia[builderType],
    [ComponentType.HeroContent]: HeroContent[builderType],
    [ComponentType.Button]: Button[builderType],
    [ComponentType.Catalog]: Catalog[builderType],
    [ComponentType.Card]: Card[builderType],
    [ComponentType.CardBody]: CardBody[builderType],
    [ComponentType.CardFooter]: CardFooter[builderType],
    [ComponentType.CardHeader]: CardHeader[builderType],
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
  id,
  builderType,
  type,
  acceptTypes,
  components,
  onRedirect,
  onRemove,
  onUpdate,
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
      id={id}
      onRedirect={onRedirect}
      type={type}
      builderType={builderType}
      acceptTypes={acceptTypes}
      onRemove={() => onRemove?.(id)}
      onUpdate={(updateData: any) => onUpdate?.(id, updateData)}
      {...props}
    >
      {components?.map((component, index) => (
        <BuilderComponent
          {...component}
          id={component?.id}
          key={component?.id}
          builderType={builderType}
          onRedirect={onRedirect}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </Component>
  );
};
