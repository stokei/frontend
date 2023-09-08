import {
  enUSMessages as enUSMessagesStokeiGraphQL,
  ptBRMessages as ptBRMessagesStokeiGraphQL,
  StokeiGraphQLClientProvider,
} from "@stokei/graphql";
import { Messages, TranslationsProvider } from "@stokei/translations";
import {
  LoadingTransition,
  StokeiUIProvider,
  uiTranslationsMessages,
} from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";
import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAccountProvider, CurrentAppProvider } from "@/contexts";
import { enUSMessages, ptBRMessages } from "@/i18n";
import { createAPIClient } from "@/services/graphql/client";
import {
  CurrentAccountDocument,
  CurrentAccountQuery,
} from "@/services/graphql/queries/current-account/current-account.query.graphql.generated";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { formatAppColorsToThemeColors } from "@/utils";
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

function MyApp({
  Component,
  pageProps,
  appId,
  cookies,
  baseURL,
  currentApp,
  currentAccount,
  themeColors,
  router,
}: any) {
  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        appId,
        cookies,
      }),
    [appId, cookies]
  );
  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <CurrentAppProvider baseURL={baseURL} currentApp={currentApp}>
        <CurrentAccountProvider currentAccount={currentAccount}>
          <StokeiUIProvider
            config={{
              colors: themeColors,
            }}
            appId={appId}
            accountId={currentAccount?.id}
            accountAccessToken={stokeiGraphQLClient?.accessToken}
            accountRefreshToken={stokeiGraphQLClient?.refreshToken}
            cloudflareAPIToken={CLOUDFLARE_TOKEN}
          >
            <TranslationsProvider
              language={DEFAULT_LANGUAGE}
              messages={messages}
            >
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
        </CurrentAccountProvider>
      </CurrentAppProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = async ({ router, ctx }: any) => {
  const slug = router?.query?.slug;
  if (!slug) {
    return {};
  }
  const cookies: Record<string, string> = ctx?.req?.cookies;
  const stokeiGetAppGraphQLClient = createAPIClient({
    cookies,
  });
  const currentApp = await stokeiGetAppGraphQLClient.api
    .query<CurrentGlobalAppQuery>(
      CurrentGlobalAppDocument,
      {
        slug,
      },
      { requestPolicy: "cache-and-network" }
    )
    .toPromise();

  const currentAppData = currentApp?.data?.currentApp;
  const appId = currentAppData?.id;
  let currentAccount;
  if (currentAppData) {
    try {
      const stokeiGraphQLClient = createAPIClient({
        appId,
        cookies,
      });
      currentAccount = await stokeiGraphQLClient.api
        .query<CurrentAccountQuery>(
          CurrentAccountDocument,
          {},
          { requestPolicy: "cache-and-network" }
        )
        .toPromise();
    } catch (error) {}
  }

  const currentAccountData = currentAccount?.data?.me;
  let baseURL = cookies?.[BASE_URL_HEADER_NAME];
  return {
    appId,
    baseURL,
    cookies,
    currentApp: currentAppData,
    currentAccount: currentAccountData,
    themeColors: formatAppColorsToThemeColors(
      currentApp?.data?.currentApp?.colors?.items
    ),
  };
};

export default MyApp;
