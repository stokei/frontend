import { NextURL } from "next/dist/server/web/next-url";

export interface WithDomainProps {
  cookies?: Record<string, string>;
  nextUrl: NextURL;
  domain: string;
}
