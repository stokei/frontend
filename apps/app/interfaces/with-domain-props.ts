import { NextURL } from "next/dist/server/web/next-url";

export interface WithDomainProps {
  nextUrl: NextURL;
  domain: string;
}
