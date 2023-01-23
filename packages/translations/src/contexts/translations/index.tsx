import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { LANGUAGE } from "../../constants";
import { Messages } from "../../interfaces";

export { IntlProvider } from "react-intl";

export interface TranslationsProviderProps {
  readonly language: LANGUAGE;
  readonly messages: Messages;
}

export const TranslationsProvider = ({
  language,
  messages,
  children,
}: PropsWithChildren<TranslationsProviderProps>) => {
  return (
    <IntlProvider locale={language} messages={messages[language || "pt-BR"]}>
      <>{children}</>
    </IntlProvider>
  );
};
