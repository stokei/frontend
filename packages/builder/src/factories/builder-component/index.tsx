import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import {
  Card,
  Button,
  Video,
  Image,
  Stack,
  Space,
  Text,
  Title,
  Catalog,
  Grid,
  GridItem,
} from "../../builder-components";
import { ComponentType } from "../../services/graphql/stokei";
import { ComponentBuilderType } from "../../types/component-builder-type";

interface BuilderComponentProps {
  componentType: ComponentType;
  builderType: ComponentBuilderType;
}

const getComponent = ({
  componentType,
  builderType,
}: {
  componentType: ComponentType;
  builderType: ComponentBuilderType;
}) => {
  const components: Record<ComponentType, FC<any>> = {
    [ComponentType.Header]: Fragment,
    [ComponentType.Footer]: Fragment,
    [ComponentType.Navlink]: Fragment,
    [ComponentType.Menu]: Fragment,
    [ComponentType.MenuItem]: Fragment,
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
  return components[componentType] || Fragment;
};

export const BuilderComponent: FC<PropsWithChildren<BuilderComponentProps>> = ({
  builderType,
  componentType,
  ...props
}) => {
  const Component = getComponent({
    componentType,
    builderType,
  });
  if (!Component) {
    return <></>;
  }
  return <Component {...props} />;
};
