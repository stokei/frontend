import { I18nKey as StokeiGraphQLI18nKey } from "@stokei/graphql";
import { I18nKey as UII18nKey } from "@stokei/ui";
import { I18nKey as BuilderI18nKey } from "@stokei/builder";
import { ptBRMessages } from "@/i18n/languages/pt-br";

export type I18nKey =
  | keyof typeof ptBRMessages
  | UII18nKey
  | StokeiGraphQLI18nKey
  | BuilderI18nKey;
export type I18nKeyWithoutOtherTranslations = keyof typeof ptBRMessages;
