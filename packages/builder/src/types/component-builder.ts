import { FC } from "react";
import { BaseComponent } from "./base-component";
import { ComponentBuilderType } from "./component-builder-type";

export type ComponentBuilder = Record<ComponentBuilderType, FC<BaseComponent>>;