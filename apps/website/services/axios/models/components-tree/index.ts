import { ComponentType } from "@/services/graphql/stokei";
import { AxiosInstance } from "axios";
import { GetVersionComponent } from "../version";

export interface CreateComponentsTreeComponent {
  parent: string;
  order?: number;
  data?: any;
  type: ComponentType;
  components?: CreateComponentsTreeComponent[];
}
export interface CreateComponentsTreeData {
  tree: CreateComponentsTreeComponent[];
}
export type CreateComponentsTreeResponse = GetVersionComponent[];

export class ComponentsTree {
  constructor(private readonly client: AxiosInstance) {}

  async create(data: CreateComponentsTreeData) {
    return (
      await this.client?.post<CreateComponentsTreeResponse>(
        `/components/tree`,
        data
      )
    )?.data;
  }
}
