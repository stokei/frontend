import { BaseComponent } from "./base-component";

export type BaseComponentEditable<Props = {}> = BaseComponent<Props> & {
  onRemove?: () => void;
  onUpdate?: (data: any) => void;
};
