import noImage from "@/assets/no-image.png";
import {
  stokeiAPITranslationsMessages,
  StokeiGraphQLClientProvider,
} from "@stokei/graphql";
import { mergeTranslations, TranslationsProvider } from "@stokei/translations";
import {
  LoadingTransition,
  StokeiUIProvider,
  uiTranslationsMessages,
} from "@stokei/ui";

import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";
import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAccountProvider, CurrentAppProvider } from "@/contexts";
import { GOOGLE_ANALYTICS_KEY } from "@/environments";
import { translationsMessages } from "@/i18n";
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
import {
  builderTranslationsMessages,
  ShoppingCartProvider,
} from "@stokei/builder";
import { GoogleAnalytics } from "@stokei/plugins";
import "@stokei/ui/src/styles/css/global.css";
import Head from "next/head";
import { Router } from "next/router";
import { useMemo } from "react";

const messages = mergeTranslations([
  uiTranslationsMessages,
  builderTranslationsMessages,
  stokeiAPITranslationsMessages,
  translationsMessages,
]);

Router.events.on("routeChangeStart", () => LoadingTransition.start());
Router.events.on("routeChangeError", () => LoadingTransition.done());
Router.events.on("routeChangeComplete", () => LoadingTransition.done());

function MyApp({
  Component,
  pageProps,
  appId,
  cookies,
  currentApp,
  currentSite,
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
      <CurrentAppProvider currentApp={currentApp} currentSite={currentSite}>
        <CurrentAccountProvider currentAccount={currentAccount}>
          <StokeiUIProvider
            config={{
              colors: themeColors,
            }}
            appId={appId}
            accountId={currentAccount?.id}
            accountAccessToken={stokeiGraphQLClient?.accessToken}
            accountRefreshToken={stokeiGraphQLClient?.refreshToken}
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
                <link
                  rel="icon"
                  href={currentApp?.icon?.file?.url || noImage?.src}
                />
              </Head>
              <GoogleAnalytics googleKey={GOOGLE_ANALYTICS_KEY} />
              <ShoppingCartProvider>
                <Component {...pageProps} />
              </ShoppingCartProvider>
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
      { requestPolicy: "network-only" }
    )
    .toPromise();

  const currentSiteData = currentApp?.data?.site;
  const currentAppData = currentSiteData?.app;
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
          { requestPolicy: "network-only" }
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
    currentSite: currentSiteData,
    currentApp: currentAppData,
    currentAccount: currentAccountData,
    themeColors: formatAppColorsToThemeColors(currentAppData?.colors?.items),
  };
};

export default MyApp;
