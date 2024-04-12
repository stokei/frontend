import { ComponentsTreeComponent } from "@/contexts";

export interface Component extends ComponentsTreeComponent {
  avatar?: string;
  title?: string;
}

export interface ComponentGroup {
  title: string;
  components: Component[];
}
