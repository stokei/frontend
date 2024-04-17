import { Messages, mergeTranslations } from "@stokei/translations";
import { stokeiAPITranslationsMessages } from "@stokei/graphql";
import { enUSMessages } from "./en-us";
import { ptBRMessages } from "./pt-br";
import { uiTranslationsMessages } from "@stokei/ui";

export const builderTranslationsMessages: Messages = mergeTranslations([
  stokeiAPITranslationsMessages,
  uiTranslationsMessages,
  {
    "en-US": enUSMessages,
    "pt-BR": ptBRMessages,
  },
]);
