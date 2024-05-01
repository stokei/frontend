import { ComponentBuilder } from "../../types/component-builder";
import { ComponentBuilderType } from "../../types/component-builder-type";
import { Editable } from "./editable";
import { Readable } from "./readable";

export const Stack: ComponentBuilder = {
  [ComponentBuilderType.BLOCK_EDITABLE]: Editable,
  [ComponentBuilderType.BLOCK_READABLE]: Readable,
};
