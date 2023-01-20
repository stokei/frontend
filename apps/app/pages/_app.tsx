import { useRouter } from "next/router";
import { useMemo } from "react";

import { StokeiGraphQLClientProvider } from "@stokei/graphql";
import { StokeiProvider } from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

import { createAPIClient } from "@/services/graphql/client";
import "@stokei/ui/src/styles/css/global.css";

function MyApp({ Component, pageProps, appId }: any) {
  const router = useRouter();

  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        getAppId: () => appId,
        onLogout() {
          router.reload();
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

MyApp.getInitialProps = (ctx: any) => {
  return {
    appId: getAppIdFromNextRouter(ctx?.router),
  };
};

export default MyApp;
