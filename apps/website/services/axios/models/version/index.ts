import { ComponentType } from "@/services/graphql/stokei";
import { AxiosInstance } from "axios";

export interface GetVersionComponent {
  id: string;
  data?: any;
  type: ComponentType;
  components?: GetVersionComponent[];
}
export interface GetVersionResponse {
  id: string;
  parent: string;
  name: string;
  app: string;
  components: GetVersionComponent[];
}

export class Version {
  constructor(private readonly client: AxiosInstance) {}

  getVersion = async (id: string) => {
    return (await this.client?.get<GetVersionResponse>(`/versions/${id}`))
      ?.data;
  };
}
