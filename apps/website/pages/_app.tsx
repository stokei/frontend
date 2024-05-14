import {
  builderTranslationsMessages
} from "@stokei/builder";
import {
  StokeiGraphQLClientProvider,
  stokeiAPITranslationsMessages,
} from "@stokei/graphql";
import { GoogleAnalytics } from "@stokei/plugins";
import { TranslationsProvider, mergeTranslations } from "@stokei/translations";
import {
  LoadingTransition,
  StokeiUIProvider,
  uiTranslationsMessages,
} from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAccountProvider, CurrentAppProvider } from "@/contexts";
import { GOOGLE_ANALYTICS_KEY } from "@/environments";
import { useCurrentApp } from "@/hooks";
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
import "@stokei/ui/src/styles/css/global.css";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect, useMemo, useState } from "react";

const messages = mergeTranslations([
  uiTranslationsMessages,
  builderTranslationsMessages,
  stokeiAPITranslationsMessages,
  translationsMessages,
]);

Router.events.on("routeChangeStart", () => LoadingTransition.start());
Router.events.on("routeChangeError", () => LoadingTransition.done());
Router.events.on("routeChangeComplete", () => LoadingTransition.done());

const Providers = ({
  appId,
  stokeiGraphQLClient,
  currentAccount,
  themeColors,
  children,
}: any) => {
  const { currentApp } = useCurrentApp();
  const [currentColors, setCurrentColors] = useState(() => themeColors);

  useEffect(() => {
    setCurrentColors(formatAppColorsToThemeColors(currentApp?.colors?.items))
  }, [currentApp]);

  return (
    <StokeiUIProvider
      config={{
        colors: currentColors,
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
        {children}
      </TranslationsProvider>
    </StokeiUIProvider>
  )
}

function MyApp({
  Component,
  pageProps,
  appId,
  cookies,
  currentApp,
  currentAccount,
  themeColors,
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
      <CurrentAppProvider currentApp={currentApp}>
        <CurrentAccountProvider currentAccount={currentAccount}>
          <Providers
            appId={appId}
            stokeiGraphQLClient={stokeiGraphQLClient}
            currentAccount={currentAccount}
            themeColors={themeColors}
          >
            <Head>
              <title>{currentApp?.name}</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <GoogleAnalytics googleKey={GOOGLE_ANALYTICS_KEY} />
            <Component {...pageProps} />
          </Providers>
        </CurrentAccountProvider>
      </CurrentAppProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = async ({ router, ctx }: any) => {
  const appId = getAppIdFromNextRouter(router);
  const cookies: Record<string, string> = ctx?.req?.cookies;
  const stokeiGraphQLClient = createAPIClient({
    appId,
    cookies,
  });
  const currentApp = await stokeiGraphQLClient.api
    .query<CurrentGlobalAppQuery>(
      CurrentGlobalAppDocument,
      {},
      { requestPolicy: "network-only" }
    )
    .toPromise();

  let currentAccount;
  try {
    currentAccount = await stokeiGraphQLClient.api
      .query<CurrentAccountQuery>(
        CurrentAccountDocument,
        {},
        { requestPolicy: "network-only" }
      )
      .toPromise();
  } catch (error) { }

  const currentAppData = currentApp?.data?.currentApp;
  const currentAccountData = currentAccount?.data?.me;
  return {
    appId,
    cookies,
    currentApp: currentAppData,
    currentAccount: currentAccountData,
    themeColors: formatAppColorsToThemeColors(
      currentApp?.data?.currentApp?.colors?.items
    ),
  };
};

export default MyApp;
