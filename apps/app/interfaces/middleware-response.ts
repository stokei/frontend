import { NextURL } from "next/dist/server/web/next-url";

export interface MiddlewareResponse {
  url: NextURL;
  appId?: string;
  isRedirect: boolean;
}
