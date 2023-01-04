import { getAppIdFromNextRouter } from "@/../../packages/utils";
import { CLOUDFLARE_TOKEN } from "@/environments";
import { StokeiProvider } from "@stokei/ui";

import "@stokei/ui/src/styles/css/global.css";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const appId = useMemo(() => getAppIdFromNextRouter(router), []);

  return (
    <StokeiProvider appId={appId} cloudflareAPIToken={CLOUDFLARE_TOKEN}>
      <Component {...pageProps} />
    </StokeiProvider>
  );
}
