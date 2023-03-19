import { I18nKey as StokeiGraphQLI18nKey } from "@stokei/graphql";
import { I18nKey as UII18nKey } from "@stokei/ui";
import { ptBRMessages } from "@/i18n";

export type I18nKey =
  | keyof typeof ptBRMessages
  | UII18nKey
  | StokeiGraphQLI18nKey;
export type I18nKeyWithoutOtherTranslations = keyof typeof ptBRMessages;
