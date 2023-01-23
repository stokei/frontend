import { useMemo } from "react";

import { StokeiGraphQLClientProvider } from "@stokei/graphql";
import { Messages, TranslationsProvider } from "@stokei/translations";
import { StokeiUIProvider } from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAppProvider } from "@/contexts";
import { enUSMessages, ptBRMessages } from "@/i18n";
import { createAPIClient } from "@/services/graphql/client";
import "@stokei/ui/src/styles/css/global.css";

const messages: Messages = {
  "pt-BR": ptBRMessages,
  "en-US": enUSMessages,
};

function MyApp({ Component, pageProps, appId, router }: any) {
  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        appId,
        onLogout() {
          router.reload();
        },
      }),
    [appId, router]
  );

  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <StokeiUIProvider appId={appId} cloudflareAPIToken={CLOUDFLARE_TOKEN}>
        <CurrentAppProvider>
          <TranslationsProvider language={DEFAULT_LANGUAGE} messages={messages}>
            <Component {...pageProps} />
          </TranslationsProvider>
        </CurrentAppProvider>
      </StokeiUIProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = (ctx: any) => {
  return {
    appId: getAppIdFromNextRouter(ctx?.router),
  };
};

export default MyApp;
