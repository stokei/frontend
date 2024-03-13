import { PropsWithChildren } from "react";
import { ComponentType } from "../services/graphql/stokei";

export type BaseComponent<Props = {}> = PropsWithChildren<Props> & {
  id: string;
  type: ComponentType;
  acceptTypes?: ComponentType[];
  data?: any;
  onRedirect: (route: string) => void;
};
