import { PropsWithChildren } from "react";
import { ComponentType } from "../services/graphql/stokei";

export type BaseComponent<Props = {}> = PropsWithChildren<Props> & {
  id: string;
  order: number;
  type: ComponentType;
  acceptTypes?: ComponentType[];
  components?: BaseComponent<Props>[];
  data?: any;
  onRedirect: (route: string) => void;
};
