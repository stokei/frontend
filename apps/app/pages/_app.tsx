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
import { CurrentAppProvider } from "@/contexts";
import { enUSMessages, ptBRMessages } from "@/i18n";
import { createAPIClient } from "@/services/graphql/client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { formatAppColorsToThemeColors } from "@/utils";
import "@stokei/ui/src/styles/css/global.css";
import { Router } from "next/router";
import { useMemo } from "react";
import { getRoutes } from "@/routes";

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
  themeColors,
  router,
}: any) {
  const stokeiGraphQLClient = useMemo(
    () =>
      createAPIClient({
        appId,
        onLogout() {
          router?.push(getRoutes().home);
        },
      }),
    [appId, router]
  );
  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <CurrentAppProvider currentApp={currentApp}>
        <StokeiUIProvider
          config={{
            colors: themeColors,
          }}
          appId={appId}
          cloudflareAPIToken={CLOUDFLARE_TOKEN}
        >
          <TranslationsProvider language={DEFAULT_LANGUAGE} messages={messages}>
            <Component {...pageProps} />
          </TranslationsProvider>
        </StokeiUIProvider>
      </CurrentAppProvider>
    </StokeiGraphQLClientProvider>
  );
}

MyApp.getInitialProps = async (ctx: any) => {
  const router = ctx?.router;
  const appId = getAppIdFromNextRouter(router);
  const stokeiGraphQLClient = createAPIClient({
    appId,
  });
  const currentApp = await stokeiGraphQLClient.api
    .query<CurrentGlobalAppQuery>(CurrentGlobalAppDocument, {})
    .toPromise();

  return {
    appId,
    currentApp: currentApp?.data?.currentApp,
    themeColors: formatAppColorsToThemeColors(
      currentApp?.data?.currentApp?.colors?.items
    ),
  };
};

export default MyApp;
