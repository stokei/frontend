import { useMemo } from "react";
import { useRouter } from "next/router";

import { StokeiGraphQLClientProvider } from "@stokei/graphql";
import { StokeiProvider } from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

import "@stokei/ui/src/styles/css/global.css";
import { createAPIClient } from "@/services/graphql/client";

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const appId = useMemo(() => getAppIdFromNextRouter(router), [router]);

  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        getAppId: () => appId,
        onLogout() {
          router;
        },
      }),
    [appId]
  );

  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <StokeiProvider appId={appId} cloudflareAPIToken={CLOUDFLARE_TOKEN}>
        <Component {...pageProps} />
      </StokeiProvider>
    </StokeiGraphQLClientProvider>
  );
}
