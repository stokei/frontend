import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { NextURL } from "next/dist/server/web/next-url";

export type MiddlewareSiteResponse = CurrentGlobalAppQuery["site"];
export type MiddlewareAppResponse = MiddlewareSiteResponse["app"];
export interface MiddlewareResponse {
  url: NextURL;
  app?: MiddlewareAppResponse;
  site?: MiddlewareSiteResponse;
  slug: string;
  isRedirect: boolean;
}
