import { ComponentBuilder } from "../../types/component-builder";
import { ComponentBuilderType } from "../../types/component-builder-type";
import { Editable } from "./editable";
import { Readable } from "./readable";

export const Catalog: ComponentBuilder = {
  [ComponentBuilderType.BLOCK_EDITABLE]: Editable,
  [ComponentBuilderType.BLOCK_READABLE]: Readable,
};
export * from './components/catalog-item'
