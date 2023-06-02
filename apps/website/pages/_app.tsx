import {
  StokeiGraphQLClientProvider,
  enUSMessages as enUSMessagesStokeiGraphQL,
  ptBRMessages as ptBRMessagesStokeiGraphQL,
} from "@stokei/graphql";
import { Messages, TranslationsProvider } from "@stokei/translations";
import {
  LoadingTransition,
  StokeiUIProvider,
  uiTranslationsMessages,
} from "@stokei/ui";

import { CLOUDFLARE_TOKEN } from "@/environments";

import { DEFAULT_APP_ID } from "@/constants/default-app-id";
import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAppProvider } from "@/contexts";
import { enUSMessages, ptBRMessages } from "@/i18n";
import { createAPIClient } from "@/services/graphql/client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import "@stokei/ui/src/styles/css/global.css";
import Head from "next/head";
import { Router } from "next/router";
import { useMemo } from "react";

const messages: Messages = {
  "pt-BR": {
    ...uiTranslationsMessages["pt-BR"],
    ...ptBRMessagesStokeiGraphQL,
    ...ptBRMessages,
  },
  "en-US": {
    ...uiTranslationsMessages["en-US"],
    ...enUSMessagesStokeiGraphQL,
    ...enUSMessages,
  },
};

Router.events.on("routeChangeStart", () => LoadingTransition.start());
Router.events.on("routeChangeError", () => LoadingTransition.done());
Router.events.on("routeChangeComplete", () => LoadingTransition.done());

function MyApp({ Component, pageProps, cookies, currentApp }: any) {
  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        cookies,
      }),
    [cookies]
  );
  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <CurrentAppProvider currentApp={currentApp}>
        <StokeiUIProvider
          appId={DEFAULT_APP_ID}
          cloudflareAPIToken={CLOUDFLARE_TOKEN}
        >
          <TranslationsProvider language={DEFAULT_LANGUAGE} messages={messages}>
            <Head>
              <title>{currentApp?.name}</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </TranslationsProvider>
        </StokeiUIProvider>
      </CurrentAppProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = async ({ router, ctx }: any) => {
  const cookies: Record<string, string> = ctx?.req?.cookies;
  const stokeiGraphQLClient = createAPIClient({
    cookies,
  });
  const currentApp = await stokeiGraphQLClient.api
    .query<CurrentGlobalAppQuery>(
      CurrentGlobalAppDocument,
      {},
      { requestPolicy: "network-only" }
    )
    .toPromise();

  const currentAppData = currentApp?.data?.currentApp;
  return {
    cookies,
    currentApp: currentAppData,
  };
};

export default MyApp;