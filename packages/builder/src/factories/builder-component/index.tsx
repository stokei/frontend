import { Fragment, PropsWithChildren, memo, useMemo } from "react";
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
  Hero,
  HeroMedia,
  HeroContent,
} from "../../builder-components";
import { ComponentType } from "../../services/graphql/stokei";
import { BaseComponent } from "../../types/base-component";
import { ComponentBuilderType } from "../../types/component-builder-type";

export interface BuilderComponentData {
  id: string;
  data?: any;
  type: ComponentType;
  components?: BuilderComponentData[];
}

interface BuilderComponentProps extends BuilderComponentData {
  builderType: ComponentBuilderType;
  onRedirect: (route: string) => void;
}

const getComponent = ({
  componentType,
  builderType,
}: {
  componentType: ComponentType;
  builderType: ComponentBuilderType;
}) => {
  const components: Record<ComponentType, FC<BaseComponent>> = {
    [ComponentType.Header]: () => <Fragment />,
    [ComponentType.Footer]: () => <Fragment />,
    [ComponentType.Navlink]: () => <Fragment />,
    [ComponentType.Menu]: () => <Fragment />,
    [ComponentType.MenuItem]: () => <Fragment />,
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
  return components[componentType] || Fragment;
};

export const BuilderComponent: FC<PropsWithChildren<BuilderComponentProps>> =
  memo(({ builderType, type, components, onRedirect, ...props }) => {
    const Component = useMemo(
      () =>
        getComponent({
          componentType: type,
          builderType,
        }),
      [builderType, type]
    );
    if (!Component) {
      return <></>;
    }
    return (
      <Component onRedirect={onRedirect} {...props}>
        {components?.map((component) => (
          <BuilderComponent
            key={component?.id}
            builderType={builderType}
            onRedirect={onRedirect}
            {...component}
          />
        ))}
      </Component>
    );
  });
BuilderComponent.displayName = "BuilderComponent";
