import { PropsWithChildren } from "react";

export type BaseComponent<Props = {}> = PropsWithChildren<Props> & {
  id: string;
  data?: any;
  onRedirect: (route: string) => void;
};
