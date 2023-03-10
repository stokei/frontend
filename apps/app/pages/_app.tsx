import { StokeiGraphQLClientProvider } from "@stokei/graphql";
import { Messages, TranslationsProvider } from "@stokei/translations";
import {
  LoadingTransition,
  StokeiUIProvider,
  uiTranslationsMessages,
} from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

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
import { Router } from "next/router";
import { useMemo } from "react";

const messages: Messages = {
  "pt-BR": {
    ...uiTranslationsMessages["pt-BR"],
    ...ptBRMessages,
  },
  "en-US": {
    ...uiTranslationsMessages["en-US"],
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
  currentApp,
  currentAccount,
  themeColors,
  router,
}: any) {
  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        appId,
      }),
    [appId, router]
  );
  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <CurrentAppProvider currentApp={currentApp}>
        <CurrentAccountProvider currentAccount={currentAccount}>
          <StokeiUIProvider
            config={{
              colors: themeColors,
            }}
            appId={appId}
            cloudflareAPIToken={CLOUDFLARE_TOKEN}
          >
            <TranslationsProvider
              language={DEFAULT_LANGUAGE}
              messages={messages}
            >
              <Component {...pageProps} />
            </TranslationsProvider>
          </StokeiUIProvider>
        </CurrentAccountProvider>
      </CurrentAppProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = async ({ router, ctx }: any) => {
  const appId = getAppIdFromNextRouter(router);
  const stokeiGraphQLClient = createAPIClient({
    appId,
    cookies: ctx?.req?.cookies,
  });

  const currentApp = await stokeiGraphQLClient.api
    .query<CurrentGlobalAppQuery>(CurrentGlobalAppDocument, {})
    .toPromise();

  let currentAccount;

  try {
    currentAccount = await stokeiGraphQLClient.api
      .query<CurrentAccountQuery>(CurrentAccountDocument, {})
      .toPromise();
  } catch (error) {}

  return {
    appId,
    currentApp: currentApp?.data?.currentApp,
    currentAccount: currentAccount?.data?.me,
    themeColors: formatAppColorsToThemeColors(
      currentApp?.data?.currentApp?.colors?.items
    ),
  };
};

export default MyApp;
