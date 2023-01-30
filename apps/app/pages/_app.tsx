import { useMemo } from "react";

import { StokeiGraphQLClientProvider } from "@stokei/graphql";
import { Messages, TranslationsProvider } from "@stokei/translations";
import {
  StokeiUIProvider,
  uiTranslationsMessages,
  LoadingTransition,
} from "@stokei/ui";
import { getAppIdFromNextRouter } from "@stokei/utils";

import { CLOUDFLARE_TOKEN } from "@/environments";

import { DEFAULT_LANGUAGE } from "@/constants/default-language";
import { CurrentAppProvider } from "@/contexts";
import { enUSMessages, ptBRMessages } from "@/i18n";
import { createAPIClient } from "@/services/graphql/client";
import "@stokei/ui/src/styles/css/global.css";
import { Router } from "next/router";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { formatAppColorsToThemeColors } from "@/utils";

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
  stokeiGraphQLClient,
  themeColors,
}: any) {
  return (
    <StokeiGraphQLClientProvider value={stokeiGraphQLClient?.api}>
      <CurrentAppProvider isLoading={false} currentApp={currentApp}>
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
    stokeiGraphQLClient,
    themeColors: formatAppColorsToThemeColors(
      currentApp?.data?.currentApp?.colors?.items
    ),
  };
};

export default MyApp;
